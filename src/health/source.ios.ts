import {
  AuthorizationRequestStatus,
  CategoryValueSleepAnalysis,
  getRequestStatusForAuthorization,
  deleteObjects,
  isHealthDataAvailableAsync,
  queryCategorySamples,
  queryQuantitySamples,
  queryStatisticsCollectionForQuantity,
  queryStatisticsForQuantity,
  requestAuthorization,
  saveCategorySample,
  saveQuantitySample,
} from '@kingstinct/react-native-healthkit';

import { dayKey, startOf } from '@/lib/days';

import type { Stage } from './night';
import type { Sample } from './sample-data';
import type { Access, Day, HealthSource } from './types';

const SLEEP = 'HKCategoryTypeIdentifierSleepAnalysis' as const;
const HR = 'HKQuantityTypeIdentifierHeartRate' as const;
const RESTING = 'HKQuantityTypeIdentifierRestingHeartRate' as const;
const HRV = 'HKQuantityTypeIdentifierHeartRateVariabilitySDNN' as const;
const STEPS = 'HKQuantityTypeIdentifierStepCount' as const;
const ENERGY = 'HKQuantityTypeIdentifierActiveEnergyBurned' as const;

const read = [SLEEP, HR, RESTING, HRV, STEPS, ENERGY];
// Write access exists only so development builds can add sample data.
const share: typeof read = __DEV__ ? read : [];
const types = { toRead: read, toShare: share };

const stages: Record<CategoryValueSleepAnalysis, Stage> = {
  [CategoryValueSleepAnalysis.inBed]: 'inBed',
  [CategoryValueSleepAnalysis.asleep]: 'asleep',
  [CategoryValueSleepAnalysis.awake]: 'awake',
  [CategoryValueSleepAnalysis.asleepCore]: 'core',
  [CategoryValueSleepAnalysis.asleepDeep]: 'deep',
  [CategoryValueSleepAnalysis.asleepREM]: 'rem',
};
const values = Object.fromEntries(Object.entries(stages).map(([value, stage]) => [stage, Number(value)])) as Record<
  Stage,
  CategoryValueSleepAnalysis
>;

async function access(): Promise<Access> {
  if (!(await isHealthDataAvailableAsync())) return 'unavailable';
  const status = await getRequestStatusForAuthorization(types);
  return status === AuthorizationRequestStatus.unnecessary ? 'granted' : 'needed';
}

/** One value per day from a statistics collection. */
async function daily(
  identifier: typeof RESTING | typeof HRV | typeof STEPS | typeof ENERGY,
  statistic: 'cumulativeSum' | 'discreteAverage',
  unit: string,
  since: Date,
) {
  const anchor = startOf(dayKey(since));
  const rows = await queryStatisticsCollectionForQuantity(identifier, [statistic], anchor, { day: 1 }, {
    filter: { date: { startDate: anchor } },
    unit,
  });
  return new Map(
    rows.flatMap((r) => {
      const q = statistic === 'cumulativeSum' ? r.sumQuantity : r.averageQuantity;
      return r.startDate && q ? [[dayKey(r.startDate), Math.round(q.quantity)] as const] : [];
    }),
  );
}

/** Runs writes a batch at a time; HealthKit has no bulk save. */
async function inBatches<T>(items: T[], write: (item: T) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += 50) await Promise.all(items.slice(i, i + 50).map(write));
}

export default {
  name: 'Apple Health',
  access,
  async connect() {
    await requestAuthorization(types);
    return access();
  },
  async sleep(since) {
    const samples = await queryCategorySamples(SLEEP, { limit: 0, ascending: true, filter: { date: { startDate: since } } });
    return samples.map((s) => ({
      stage: stages[s.value] ?? 'asleep',
      start: s.startDate.getTime(),
      end: s.endDate.getTime(),
      source: s.sourceRevision?.source.bundleIdentifier ?? 'unknown',
    }));
  },
  async days(since) {
    const [steps, energy, resting, hrv] = await Promise.all([
      daily(STEPS, 'cumulativeSum', 'count', since),
      daily(ENERGY, 'cumulativeSum', 'kcal', since),
      daily(RESTING, 'discreteAverage', 'count/min', since),
      daily(HRV, 'discreteAverage', 'ms', since),
    ]);
    const keys = [...new Set([...steps.keys(), ...energy.keys(), ...resting.keys(), ...hrv.keys()])].sort();
    return keys.map((day): Day => ({ day, steps: steps.get(day), energy: energy.get(day), resting: resting.get(day), hrv: hrv.get(day) }));
  },
  async heart(from, to) {
    const r = await queryStatisticsForQuantity(HR, ['discreteAverage', 'discreteMin'], {
      filter: { date: { startDate: new Date(from), endDate: new Date(to) } },
      unit: 'count/min',
    });
    return r.averageQuantity && r.minimumQuantity
      ? { avg: Math.round(r.averageQuantity.quantity), min: Math.round(r.minimumQuantity.quantity) }
      : undefined;
  },
  async heartSamples(from, to) {
    const samples = await queryQuantitySamples(HR, {
      limit: 0,
      ascending: true,
      unit: 'count/min',
      filter: { date: { startDate: new Date(from), endDate: new Date(to) } },
    });
    return samples.map((s) => ({ time: s.startDate.getTime(), value: s.quantity }));
  },
  async write(sample: Sample) {
    // Replaces earlier sample data. HealthKit only lets an app delete what it wrote itself.
    const since = new Date(Date.now() - 120 * 24 * 3600 * 1000);
    await Promise.all(read.map((type) => deleteObjects(type, { date: { startDate: since } })));
    await inBatches(sample.segments, (s) => saveCategorySample(SLEEP, values[s.stage], new Date(s.start), new Date(s.end)));
    await inBatches(sample.heart, (p) => saveQuantitySample(HR, 'count/min', p.value, new Date(p.time), new Date(p.time)));
    await inBatches(sample.days, async (d) => {
      const day = startOf(d.day).getTime();
      const at = (hours: number) => new Date(day + hours * 3600 * 1000);
      if (d.steps) await saveQuantitySample(STEPS, 'count', d.steps, at(9), at(19));
      if (d.energy) await saveQuantitySample(ENERGY, 'kcal', d.energy, at(9), at(19));
      if (d.resting) await saveQuantitySample(RESTING, 'count/min', d.resting, at(7), at(7));
      if (d.hrv) await saveQuantitySample(HRV, 'ms', d.hrv, at(4), at(4));
    });
  },
} satisfies HealthSource;
