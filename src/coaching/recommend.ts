import type { Night } from '@/health/night';

import type { Lesson, Metric } from '.';

const H = 3600 * 1000;

const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
// Hours past 18:00 keep bedtimes on one continuous scale across midnight.
const clock = (ms: number) => {
  const d = new Date(ms);
  return ((d.getHours() * 60 + d.getMinutes() - 18 * 60 + 24 * 60) % (24 * 60)) / 60;
};
const weekend = (n: Night) => [0, 6].includes(new Date(n.end).getDay());

/** The four sleep metrics the coaching program targets, over the last two weeks. */
export function metrics(nights: Night[]) {
  const recent = nights.slice(0, 14);
  if (!recent.length) return undefined;
  const bedtimes = recent.map((n) => clock(n.start));
  const mean = avg(bedtimes);
  const midpoint = (n: Night) => clock((n.start + n.end) / 2);
  const off = recent.filter(weekend);
  const on = recent.filter((n) => !weekend(n));
  return {
    /** Average time asleep, ms. */
    duration: avg(recent.map((n) => n.asleep)),
    /** Share of the night spent asleep, 0–1. */
    efficiency: avg(recent.map((n) => n.asleep / Math.max(n.end - n.start, 1))),
    /** Bedtime spread (standard deviation), hours. */
    consistency: Math.sqrt(avg(bedtimes.map((b) => (b - mean) ** 2))),
    /** Weekend vs. weekday sleep midpoint shift, hours. */
    jetlag: off.length && on.length ? Math.abs(avg(off.map(midpoint)) - avg(on.map(midpoint))) : 0,
  } satisfies Record<Metric, number>;
}

/** How far each metric is from healthy, 0 (fine) to 1 (worst). */
export function problems(nights: Night[]): Record<Metric, number> {
  const m = metrics(nights);
  if (!m) return { duration: 0, efficiency: 0, consistency: 0, jetlag: 0 };
  const clamp = (x: number) => Math.min(1, Math.max(0, x));
  return {
    duration: clamp((7.5 * H - m.duration) / (2.5 * H)), // 5h asleep is worst
    efficiency: clamp((0.92 - m.efficiency) / 0.17), // 75% is worst
    consistency: clamp((m.consistency - 0.25) / 1.25), // ±1.5h is worst
    jetlag: clamp((m.jetlag - 0.25) / 1.75), // 2h shift is worst
  };
}

/** The unread lesson that best targets the user's weakest metric. */
export function recommend(nights: Night[], lessons: Lesson[], read: Readonly<Record<string, string>>): Lesson | undefined {
  const p = problems(nights);
  const score = (l: Lesson) => (Object.keys(p) as Metric[]).reduce((s, m) => s + p[m] * (l.weights?.[m] ?? 0), 0);
  return lessons.filter((l) => !read[l.slug] && l.weights).sort((a, b) => score(b) - score(a))[0];
}
