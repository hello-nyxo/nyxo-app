import { compare, compareActivity, compareHabit } from './insights';
import { bedDay, toNights, type Night } from './night';
import { sampleData } from './sample-data';

const now = new Date(2026, 10, 5, 12);
const sample = sampleData(['evening-habit', 'morning-habit'], now);
const byDay = new Map(sample.days.map((d) => [d.day, d]));
const nights: Night[] = toNights(sample.segments).map((n) => ({
  ...n,
  steps: byDay.get(bedDay(n))?.steps,
  hr: { avg: 55, min: 50 },
}));

describe('compare', () => {
  it('needs a few nights on each side', () => {
    expect(compare(nights.slice(0, 4), () => true)).toBeUndefined();
  });
});

describe('compareHabit', () => {
  it('finds the longer nights the sample builds in for the evening habit', () => {
    const c = compareHabit(nights, { since: '2026-01-01', done: sample.habits['evening-habit'] })!;
    expect(c.with.nights + c.without.nights).toBe(30);
    expect(c.with.asleep - c.without.asleep).toBeGreaterThan(15 * 60 * 1000);
  });

  it('ignores nights before the habit started', () => {
    const c = compareHabit(nights, { since: bedDay(nights[9]), done: sample.habits['evening-habit'] });
    expect((c?.with.nights ?? 0) + (c?.without.nights ?? 0)).toBeLessThanOrEqual(10);
  });
});

describe('compareActivity', () => {
  it('splits at the median and shows more sleep after active days', () => {
    const c = compareActivity(nights)!;
    expect(c.median).toBeGreaterThan(3000);
    expect(c.with.asleep).toBeGreaterThan(c.without.asleep);
  });
});
