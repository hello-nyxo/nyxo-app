// Fallback for platforms without a health store (web, tests). See source.ios.ts and source.android.ts.
import type { HealthSource } from './types';

const source: HealthSource = {
  name: 'Health',
  access: async () => 'unavailable',
  connect: async () => 'unavailable',
  sleep: async () => [],
  days: async () => [],
  heart: async () => undefined,
  heartSamples: async () => [],
  write: async () => {},
};

export default source;
