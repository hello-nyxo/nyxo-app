// How days that differ (a habit done, more steps) line up with the nights after them.
// These are plain comparisons of averages, not causal claims.
import { bedDay, type Night } from './night';

export type Summary = { nights: number; asleep: number; hr?: number; hrv?: number };
export type Comparison = { with: Summary; without: Summary };

/** Fewer nights than this on either side and a comparison says nothing. */
export const MIN_NIGHTS = 3;

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : undefined);

function summarize(nights: Night[]): Summary {
  return {
    nights: nights.length,
    asleep: avg(nights.map((n) => n.asleep)) ?? 0,
    hr: avg(nights.flatMap((n) => (n.hr ? [n.hr.avg] : []))),
    hrv: avg(nights.flatMap((n) => (n.hrv ? [n.hrv] : []))),
  };
}

/** Splits nights by whether the day they started on passes `on`. Undefined when either side is too small. */
export function compare(nights: Night[], on: (day: string) => boolean): Comparison | undefined {
  const yes = nights.filter((n) => on(bedDay(n)));
  const no = nights.filter((n) => !on(bedDay(n)));
  if (yes.length < MIN_NIGHTS || no.length < MIN_NIGHTS) return undefined;
  return { with: summarize(yes), without: summarize(no) };
}

/** Nights after a habit was done vs. nights after it wasn't, counted from the day it started. */
export function compareHabit(nights: Night[], habit: { since: string; done: readonly string[] }) {
  const done = new Set(habit.done);
  return compare(
    nights.filter((n) => bedDay(n) >= habit.since),
    (day) => done.has(day),
  );
}

/** Nights after more active days (at or above the median step count) vs. less active days. */
export function compareActivity(nights: Night[]) {
  const counted = nights.filter((n) => n.steps !== undefined);
  const steps = counted.map((n) => n.steps!).sort((a, b) => a - b);
  if (!steps.length) return undefined;
  const median = steps[Math.floor(steps.length / 2)];
  const active = new Set(counted.filter((n) => n.steps! >= median).map(bedDay));
  const comparison = compare(counted, (day) => active.has(day));
  return comparison && { ...comparison, median };
}
