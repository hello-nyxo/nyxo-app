import {
  aggregateGroupByPeriod,
  aggregateRecord,
  deleteRecordsByTimeRange,
  getGrantedPermissions,
  getSdkStatus,
  initialize,
  insertRecords,
  readRecords,
  requestPermission,
  SdkAvailabilityStatus,
  SleepStageType,
  type Permission,
  type RecordType,
} from 'react-native-health-connect';

import Storage from 'expo-sqlite/kv-store';

import { dayKey, startOf } from '@/lib/days';

import type { Stage } from './night';
import type { Sample } from './sample-data';
import type { Access, Day, HealthSource } from './types';

const RECORDS: RecordType[] = ['SleepSession', 'HeartRate', 'RestingHeartRate', 'HeartRateVariabilityRmssd', 'Steps', 'ActiveCaloriesBurned'];
// Write access exists only so development builds can add sample data.
const permissions: Permission[] = RECORDS.flatMap((recordType) => [
  { accessType: 'read', recordType } as Permission,
  ...(__DEV__ ? [{ accessType: 'write', recordType } as Permission] : []),
]);

const stages: Record<number, Stage> = {
  [SleepStageType.UNKNOWN]: 'asleep',
  [SleepStageType.SLEEPING]: 'asleep',
  [SleepStageType.AWAKE]: 'awake',
  [SleepStageType.OUT_OF_BED]: 'awake',
  [SleepStageType.LIGHT]: 'core',
  [SleepStageType.DEEP]: 'deep',
  [SleepStageType.REM]: 'rem',
};
const values: Record<Stage, number> = {
  asleep: SleepStageType.SLEEPING,
  inBed: SleepStageType.SLEEPING,
  awake: SleepStageType.AWAKE,
  core: SleepStageType.LIGHT,
  deep: SleepStageType.DEEP,
  rem: SleepStageType.REM,
};

const iso = (ms: number) => new Date(ms).toISOString();
const ms = (iso: string) => new Date(iso).getTime();
const between = (from: number, to: number) => ({ operator: 'between' as const, startTime: iso(from), endTime: iso(to) });
const after = (since: Date) => ({ operator: 'after' as const, startTime: since.toISOString() });
/** Missing permissions or data shouldn't break the rest of the screen. */
const quietly = <T,>(p: Promise<T>, fallback: T) => p.catch(() => fallback);

// Health Connect can't tell "denied" from "never asked", so remember what was asked.
// A newer app version that reads more types asks once more, like HealthKit's `shouldRequest`.
const ASKED = 'health.asked';
const asked = () => new Set<string>(JSON.parse(Storage.getItemSync(ASKED) ?? '[]'));

async function access(): Promise<Access> {
  if ((await getSdkStatus()) !== SdkAvailabilityStatus.SDK_AVAILABLE) return 'unavailable';
  await initialize();
  const granted = await getGrantedPermissions();
  // Sleep is the one permission the app needs; the rest add detail.
  const sleep = granted.some((g) => g.accessType === 'read' && 'recordType' in g && g.recordType === 'SleepSession');
  const unasked = RECORDS.some((r) => !asked().has(r));
  return sleep && !unasked ? 'granted' : 'needed';
}

export default {
  name: 'Health Connect',
  access,
  async connect() {
    if ((await access()) === 'unavailable') return 'unavailable';
    await requestPermission(permissions);
    Storage.setItemSync(ASKED, JSON.stringify(RECORDS));
    return access();
  },
  async sleep(since) {
    const { records } = await readRecords('SleepSession', { timeRangeFilter: after(since) });
    return records.flatMap((r) => {
      const source = r.metadata?.dataOrigin ?? 'unknown';
      if (!r.stages?.length) return [{ stage: 'asleep' as const, start: ms(r.startTime), end: ms(r.endTime), source }];
      return r.stages.map((s) => ({ stage: stages[s.stage] ?? 'asleep', start: ms(s.startTime), end: ms(s.endTime), source }));
    });
  },
  async days(since) {
    const range = after(startOf(dayKey(since)));
    const slicer = { period: 'DAYS' as const, length: 1 };
    const [steps, energy, resting, hrv] = await Promise.all([
      quietly(aggregateGroupByPeriod({ recordType: 'Steps', timeRangeFilter: range, timeRangeSlicer: slicer }), []),
      quietly(aggregateGroupByPeriod({ recordType: 'ActiveCaloriesBurned', timeRangeFilter: range, timeRangeSlicer: slicer }), []),
      quietly(aggregateGroupByPeriod({ recordType: 'RestingHeartRate', timeRangeFilter: range, timeRangeSlicer: slicer }), []),
      quietly(readRecords('HeartRateVariabilityRmssd', { timeRangeFilter: range }), { records: [] }),
    ]);
    const out = new Map<string, Day>();
    const put = (day: string, d: Partial<Day>) => out.set(day, { ...out.get(day), ...d, day });
    for (const g of steps) if (g.result.COUNT_TOTAL) put(dayKey(ms(g.startTime)), { steps: Math.round(g.result.COUNT_TOTAL) });
    for (const g of energy) {
      const kcal = g.result.ACTIVE_CALORIES_TOTAL?.inKilocalories;
      if (kcal) put(dayKey(ms(g.startTime)), { energy: Math.round(kcal) });
    }
    for (const g of resting) if (g.result.BPM_AVG) put(dayKey(ms(g.startTime)), { resting: Math.round(g.result.BPM_AVG) });
    const byDay = new Map<string, number[]>();
    for (const r of hrv.records) {
      const day = dayKey(ms(r.time));
      byDay.set(day, [...(byDay.get(day) ?? []), r.heartRateVariabilityMillis]);
    }
    for (const [day, xs] of byDay) put(day, { hrv: Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) });
    return [...out.values()].sort((a, b) => a.day.localeCompare(b.day));
  },
  async heart(from, to) {
    const r = await quietly(aggregateRecord({ recordType: 'HeartRate', timeRangeFilter: between(from, to) }), undefined);
    return r?.BPM_AVG ? { avg: Math.round(r.BPM_AVG), min: Math.round(r.BPM_MIN) } : undefined;
  },
  async heartSamples(from, to) {
    const { records } = await quietly(readRecords('HeartRate', { timeRangeFilter: between(from, to) }), { records: [] });
    return records.flatMap((r) => r.samples.map((s) => ({ time: ms(s.time), value: s.beatsPerMinute })));
  },
  async write(sample: Sample) {
    // Replaces earlier sample data. Health Connect only lets an app delete what it wrote itself.
    const since = new Date(Date.now() - 120 * 24 * 3600 * 1000);
    await Promise.all(RECORDS.map((type) => quietly(deleteRecordsByTimeRange(type, after(since)), undefined)));
    // Sleep: one session per night.
    const nights: Sample['segments'][] = [];
    for (const s of sample.segments) {
      const last = nights.at(-1);
      if (last && s.start - last[last.length - 1].end < 3 * 3600 * 1000) last.push(s);
      else nights.push([s]);
    }
    await insertRecords(
      nights.map((night) => ({
        recordType: 'SleepSession',
        startTime: iso(night[0].start),
        endTime: iso(night[night.length - 1].end),
        stages: night.map((s) => ({ startTime: iso(s.start), endTime: iso(s.end), stage: values[s.stage] })),
      })),
    );
    // Heart rate: one record per night holding its samples.
    const hearts = nights.map((night) => sample.heart.filter((p) => p.time >= night[0].start && p.time < night[night.length - 1].end));
    await insertRecords(
      hearts
        .filter((h) => h.length)
        .map((h) => ({
          recordType: 'HeartRate',
          startTime: iso(h[0].time),
          endTime: iso(h[h.length - 1].time + 1000),
          samples: h.map((p) => ({ time: iso(p.time), beatsPerMinute: p.value })),
        })),
    );
    // insertRecords takes one record type per call.
    const at = (day: string, hours: number) => iso(startOf(day).getTime() + hours * 3600 * 1000);
    const days = sample.days;
    await insertRecords(
      days.flatMap((d) => (d.steps ? [{ recordType: 'Steps' as const, startTime: at(d.day, 9), endTime: at(d.day, 19), count: d.steps }] : [])),
    );
    await insertRecords(
      days.flatMap((d) =>
        d.energy
          ? [{ recordType: 'ActiveCaloriesBurned' as const, startTime: at(d.day, 9), endTime: at(d.day, 19), energy: { value: d.energy, unit: 'kilocalories' as const } }]
          : [],
      ),
    );
    await insertRecords(days.flatMap((d) => (d.resting ? [{ recordType: 'RestingHeartRate' as const, time: at(d.day, 7), beatsPerMinute: d.resting }] : [])));
    await insertRecords(
      days.flatMap((d) => (d.hrv ? [{ recordType: 'HeartRateVariabilityRmssd' as const, time: at(d.day, 4), heartRateVariabilityMillis: d.hrv }] : [])),
    );
  },
} satisfies HealthSource;
