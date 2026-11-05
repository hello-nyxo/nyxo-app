// Generated health and habit history for development builds and simulators.
// Deterministic, and built so the effects are visible: more steps and habit days mean
// longer nights, a lower sleeping heart rate and higher HRV.
import { addDays, dayKey, startOf } from '@/lib/days';

import type { Segment, Stage } from './night';
import type { Day, Point } from './types';

const MIN = 60 * 1000;
const H = 60 * MIN;

export type Sample = {
  segments: Segment[];
  /** Heart rate while asleep, every 10 minutes. */
  heart: Point[];
  days: Day[];
  /** Habit slug -> days it was done. */
  habits: Record<string, string[]>;
};

/** Small seeded PRNG so the sample is the same every run. */
function random(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

/**
 * `nights` nights ending this morning. `habitSlugs` get a done-history on ~60% of days;
 * the first one (meant to be an evening habit) improves that night's sleep.
 */
export function sampleData(habitSlugs: string[], now = new Date(), nights = 30): Sample {
  const rand = random(42);
  const segments: Segment[] = [];
  const heart: Point[] = [];
  const days: Day[] = [];
  const habits: Record<string, string[]> = Object.fromEntries(habitSlugs.map((s) => [s, []]));
  const last = addDays(dayKey(now), -1);

  for (let i = nights - 1; i >= 0; i--) {
    const day = addDays(last, -i);
    const steps = Math.round(3500 + rand() * 11000);
    const active = (steps - 8000) / 1000; // -4.5 … +6.5
    habitSlugs.forEach((slug, j) => {
      if (rand() < (j === 0 ? 0.6 : 0.55)) habits[slug].push(day);
    });
    const habit = habitSlugs.length > 0 && habits[habitSlugs[0]].includes(day) ? 1 : 0;

    // Bedtime 22:15–23:45, a little earlier on habit days.
    const bed = startOf(day).getTime() + (22.25 + rand() * 1.5 - habit * 0.3) * H;
    const target = (6.4 + 0.06 * active + 0.45 * habit + (rand() - 0.5) * 0.7) * H;
    const deepBias = 0.12 + 0.01 * active + 0.03 * habit;

    let t = bed;
    const add = (stage: Stage, ms: number) => {
      segments.push({ stage, start: t, end: t + ms, source: 'sample' });
      t += ms;
    };
    add('awake', (8 + rand() * 14) * MIN);
    const end = bed + target;
    for (let c = 0; t < end - 20 * MIN; c++) {
      const deep = Math.max(4, (deepBias * 90 - c * 5) * (0.8 + rand() * 0.4)) * MIN;
      add('core', (28 + rand() * 12) * MIN);
      add('deep', deep);
      add('core', 14 * MIN);
      add('rem', (10 + c * 6 + rand() * 6) * MIN);
      if (rand() < 0.3 - habit * 0.15) add('awake', (2 + rand() * 6) * MIN);
    }

    // Heart rate drifts down through the night and rises before waking.
    const base = 58 - 0.35 * active - 3 * habit + (rand() - 0.5) * 3;
    for (let at = bed + 15 * MIN; at < t; at += 10 * MIN) {
      const p = (at - bed) / (t - bed);
      heart.push({ time: at, value: Math.round(base + 6 * (p - 0.45) ** 2 * 4 - 2 + (rand() - 0.5) * 3) });
    }

    days.push({ day, steps, energy: Math.round(steps * 0.045 + 180 + rand() * 120) });
    const morning = dayKey(t);
    days.push({ day: morning, resting: Math.round(base + 1), hrv: Math.round(44 + 1.4 * active + 7 * habit + (rand() - 0.5) * 10) });
  }

  // One row per day: merge activity and the next morning's heart numbers.
  const merged = new Map<string, Day>();
  for (const d of days) merged.set(d.day, { ...merged.get(d.day), ...d });
  return { segments, heart, days: [...merged.values()].sort((a, b) => a.day.localeCompare(b.day)), habits };
}
