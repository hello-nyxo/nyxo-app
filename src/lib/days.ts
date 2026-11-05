// Local calendar days as `YYYY-MM-DD` keys, which sort as strings.

export function dayKey(date: Date | number) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const today = (now = new Date()) => dayKey(now);

export function addDays(key: string, n: number) {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

/** Midnight at the start of a day key. */
export function startOf(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** The last `count` days ending today, oldest first. */
export function lastDays(count: number, now = new Date()) {
  const end = today(now);
  return Array.from({ length: count }, (_, i) => addDays(end, i - count + 1));
}
