// Pure progress math over the stored Progress.
import { addDays, today } from '@/lib/days';

import type { Progress } from './progress';

/**
 * Consecutive days with activity, counting back from today.
 * Today not done yet doesn't break the streak; yesterday missing does.
 */
export function streak(days: Iterable<string>, now = new Date()) {
  const set = new Set(days);
  let day = today(now);
  if (!set.has(day)) day = addDays(day, -1);
  let n = 0;
  while (set.has(day)) {
    n++;
    day = addDays(day, -1);
  }
  return n;
}

/** The longest run of consecutive days. */
export function longest(days: readonly string[]) {
  const sorted = [...new Set(days)].sort();
  let best = 0;
  let run = 0;
  sorted.forEach((d, i) => {
    run = i > 0 && addDays(sorted[i - 1], 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
  });
  return best;
}

/** Days with any coaching activity: a lesson read or a habit done. */
export function activeDays(p: Progress) {
  return new Set([...Object.values(p.read), ...Object.values(p.habits).flatMap((h) => h.done)]);
}
