import Storage from 'expo-sqlite/kv-store';
import { useSyncExternalStore } from 'react';

import { today } from '@/lib/days';

/**
 * Everything the user has done in coaching, kept on device. Days are local `YYYY-MM-DD` keys.
 * - read: lesson slug -> day it was read to the end
 * - quiz: lesson slug -> last score (0 best, 100 worst)
 * - habits: habit slug -> day it was started and the days it was done
 */
export type Progress = {
  read: Readonly<Record<string, string>>;
  quiz: Readonly<Record<string, number>>;
  habits: Readonly<Record<string, { since: string; done: readonly string[] }>>;
};

const KEY = 'coaching.v2';
let progress: Progress = { read: {}, quiz: {}, habits: {}, ...JSON.parse(Storage.getItemSync(KEY) ?? '{}') };
const listeners = new Set<() => void>();

function save(next: Progress) {
  progress = next;
  Storage.setItemSync(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function markRead(slug: string) {
  if (!progress.read[slug]) save({ ...progress, read: { ...progress.read, [slug]: today() } });
}

export function saveQuiz(slug: string, score: number) {
  save({ ...progress, quiz: { ...progress.quiz, [slug]: score } });
}

export function startHabit(slug: string) {
  if (!progress.habits[slug]) save({ ...progress, habits: { ...progress.habits, [slug]: { since: today(), done: [] } } });
}

export function stopHabit(slug: string) {
  const { [slug]: _stopped, ...rest } = progress.habits;
  save({ ...progress, habits: rest });
}

/** Checks a habit off for a day, or unchecks it. */
export function toggleHabit(slug: string, day = today()) {
  const h = progress.habits[slug];
  if (!h) return;
  const done = h.done.includes(day) ? h.done.filter((d) => d !== day) : [...h.done, day].sort();
  save({ ...progress, habits: { ...progress.habits, [slug]: { ...h, done } } });
}

/** Development builds only: merges sample history into the stored progress. */
export function addSampleProgress(sample: Partial<Progress>) {
  save({
    read: { ...progress.read, ...sample.read },
    quiz: { ...progress.quiz, ...sample.quiz },
    habits: { ...progress.habits, ...sample.habits },
  });
}

export function useProgress() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => progress,
  );
}
