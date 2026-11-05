import { useEffect, useSyncExternalStore } from 'react';

import { bedDay, toNights, wakeDay, type Night } from './night';
import type { Sample } from './sample-data';
import health from './source';
import type { Access, Day } from './types';

type State = { access: Access | 'loading'; nights: Night[]; days: Day[] };

const DAYS = 90;
/** Nights that get heart numbers (one query each). */
const DETAILED = 30;
let state: State = { access: 'loading', nights: [], days: [] };
let started = false;
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

export async function refresh() {
  const access = await health.access();
  if (access !== 'granted') return set({ access, nights: [], days: [] });
  const since = new Date(Date.now() - DAYS * 24 * 3600 * 1000);
  const [segments, days] = await Promise.all([health.sleep(since), health.days(since).catch(() => [])]);
  const byDay = new Map(days.map((d) => [d.day, d]));
  const nights = toNights(segments);
  const hearts = await Promise.all(nights.slice(0, DETAILED).map((n) => health.heart(n.start, n.end).catch(() => undefined)));
  set({
    access,
    days,
    nights: nights.map((n, i) => ({
      ...n,
      hr: hearts[i],
      steps: byDay.get(bedDay(n))?.steps,
      hrv: byDay.get(wakeDay(n))?.hrv,
      resting: byDay.get(wakeDay(n))?.resting,
    })),
  });
}

export async function connect() {
  await health.connect();
  await refresh();
}

/** Development builds only. */
export async function writeSample(sample: Sample) {
  await health.write(sample);
  await refresh();
}

export const heartSamples = health.heartSamples;

/** Sleep, heart and activity from the platform health store, loaded once and shared by every screen. */
export function useHealth() {
  const current = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
  );
  useEffect(() => {
    if (started) return;
    started = true;
    refresh().catch(() => set({ access: 'unavailable', nights: [], days: [] }));
  }, []);
  return current;
}

export const healthName = health.name;
