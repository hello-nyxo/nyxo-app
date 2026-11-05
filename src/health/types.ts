import type { Segment } from './night';
import type { Sample } from './sample-data';

export type Access = 'unavailable' | 'needed' | 'granted';

/** Daily totals and averages. Any field can be missing when there is no data or no permission. */
export type Day = {
  /** Local `YYYY-MM-DD`. */
  day: string;
  steps?: number;
  /** Active energy, kcal. */
  energy?: number;
  /** Resting heart rate, bpm. */
  resting?: number;
  /** Heart rate variability, ms (SDNN on iOS, RMSSD on Android). */
  hrv?: number;
};

export type Point = { time: number; value: number };

/** What each platform (Apple Health, Health Connect) implements in `source.<platform>.ts`. */
export type HealthSource = {
  name: string;
  access(): Promise<Access>;
  connect(): Promise<Access>;
  sleep(since: Date): Promise<Segment[]>;
  days(since: Date): Promise<Day[]>;
  /** Average and lowest heart rate in a window, or undefined without data. */
  heart(from: number, to: number): Promise<{ avg: number; min: number } | undefined>;
  /** Heart rate samples in a window, for drawing a night's curve. */
  heartSamples(from: number, to: number): Promise<Point[]>;
  /** Development builds only: writes the generated sample data. */
  write(sample: Sample): Promise<void>;
};
