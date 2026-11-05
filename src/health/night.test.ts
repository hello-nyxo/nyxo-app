import { bedDay, duration, toNights, totals, type Segment } from './night';
import { sampleData } from './sample-data';

const H = 3600 * 1000;
const at = (h: number) => Date.UTC(2026, 10, 4) + h * H;
const seg = (stage: Segment['stage'], from: number, to: number, source = 'watch'): Segment => ({
  stage,
  start: at(from),
  end: at(to),
  source,
});

describe('toNights', () => {
  it('groups segments into nights, newest first', () => {
    const nights = toNights([seg('core', 0, 7), seg('core', 24, 31)]);
    expect(nights.map((n) => n.start)).toEqual([at(24), at(0)]);
  });

  it('keeps segments within three hours in the same night', () => {
    const [night] = toNights([seg('core', 0, 3), seg('awake', 3, 4), seg('deep', 5.5, 7)]);
    expect(night.end).toBe(at(7));
    expect(night.asleep).toBe(4.5 * H);
  });

  it('prefers the source with stage data over time in bed', () => {
    const [night] = toNights([seg('inBed', -1, 8, 'phone'), seg('core', 0, 4), seg('rem', 4, 7)]);
    expect(night.segments.every((s) => s.source === 'watch')).toBe(true);
    expect(night.asleep).toBe(7 * H);
  });

  it('falls back to time in bed when there is nothing else', () => {
    const [night] = toNights([seg('inBed', 0, 8, 'phone')]);
    expect(night.asleep).toBe(8 * H);
  });
});

describe('bedDay', () => {
  it('counts a bedtime after midnight as the evening before', () => {
    const [late] = toNights([{ stage: 'core', start: new Date(2026, 10, 5, 1).getTime(), end: new Date(2026, 10, 5, 8).getTime(), source: 'w' }]);
    expect(bedDay(late)).toBe('2026-11-04');
  });
});

describe('sampleData', () => {
  const now = new Date(2026, 10, 5, 12);
  const sample = sampleData(['evening-habit', 'morning-habit'], now);

  it('makes thirty staged nights with heart rate', () => {
    const nights = toNights(sample.segments);
    expect(nights).toHaveLength(30);
    expect(totals(nights[0]).deep).toBeGreaterThan(0);
    expect(sample.heart.length).toBeGreaterThan(30 * 30);
  });

  it('has activity and heart numbers for each day', () => {
    expect(sample.days.filter((d) => d.steps).length).toBe(30);
    expect(sample.days.filter((d) => d.hrv && d.resting).length).toBe(30);
  });

  it('is the same every run', () => {
    expect(sampleData(['evening-habit', 'morning-habit'], now)).toEqual(sample);
  });
});

describe('duration', () => {
  it('formats hours and minutes', () => {
    expect(duration(7.5 * H)).toBe('7h 30m');
    expect(duration(42 * 60 * 1000)).toBe('42m');
  });
});
