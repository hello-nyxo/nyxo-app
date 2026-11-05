import { dayKey } from '@/lib/days';

export type Stage = 'awake' | 'rem' | 'core' | 'deep' | 'asleep' | 'inBed';

/** One stretch of a single stage, as reported by one source (app or device). Times are epoch ms. */
export type Segment = { stage: Stage; start: number; end: number; source: string };

export type Night = {
  /** Start time in epoch ms; stable and unique per night. */
  id: string;
  start: number;
  end: number;
  /** Time asleep in ms (time in bed when the source only records that). */
  asleep: number;
  segments: Segment[];
  /** Heart rate while asleep, bpm. */
  hr?: { avg: number; min: number };
  /** Heart rate variability measured that night, ms. */
  hrv?: number;
  /** Resting heart rate the morning after, bpm. */
  resting?: number;
  /** Steps on the day before the night. */
  steps?: number;
};

/** The calendar day a night belongs to: the evening it started (a 1 AM bedtime counts as the day before). */
export const bedDay = (n: Night) => dayKey(n.start - 6 * 3600 * 1000);
/** The morning the night ended. */
export const wakeDay = (n: Night) => dayKey(n.end);

const SLEEP: Stage[] = ['asleep', 'core', 'deep', 'rem'];
const GAP = 3 * 60 * 60 * 1000;
const length = (s: Segment) => s.end - s.start;

/**
 * Groups raw segments into nights, newest first.
 * Segments closer than three hours belong to the same night. When several sources
 * (say iPhone and Apple Watch) record the same night, the one with the most detail wins.
 */
export function toNights(segments: Segment[]): Night[] {
  const sorted = [...segments].sort((a, b) => a.start - b.start);
  const clusters: Segment[][] = [];
  let end = -Infinity;
  for (const segment of sorted) {
    if (segment.start - end > GAP) clusters.push([]);
    clusters[clusters.length - 1].push(segment);
    end = Math.max(end, segment.end);
  }
  return clusters.map(toNight).reverse();
}

function toNight(cluster: Segment[]): Night {
  const score = new Map<string, number>();
  for (const s of cluster) {
    // Stage data outranks plain time in bed.
    const weight = s.stage === 'inBed' ? 1 : 1000;
    score.set(s.source, (score.get(s.source) ?? 0) + length(s) * weight);
  }
  const source = [...score].sort((a, b) => b[1] - a[1])[0][0];
  const own = cluster.filter((s) => s.source === source);
  const staged = own.filter((s) => s.stage !== 'inBed');
  const segments = staged.length ? staged : own;
  const counted = staged.length ? segments.filter((s) => SLEEP.includes(s.stage)) : segments;

  const start = Math.min(...segments.map((s) => s.start));
  return {
    id: String(start),
    start,
    end: Math.max(...segments.map((s) => s.end)),
    asleep: counted.reduce((sum, s) => sum + length(s), 0),
    segments,
  };
}

/** Total time per stage in ms. */
export function totals(night: Night): Partial<Record<Stage, number>> {
  const result: Partial<Record<Stage, number>> = {};
  for (const s of night.segments) result[s.stage] = (result[s.stage] ?? 0) + length(s);
  return result;
}

export function duration(ms: number): string {
  const minutes = Math.round(ms / 60000);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export function day(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
}

export function time(ms: number): string {
  return new Date(ms).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}
