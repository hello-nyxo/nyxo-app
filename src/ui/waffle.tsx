import { View } from 'react-native';

import { addDays, startOf, today } from '@/lib/days';

import { color } from './theme';

/**
 * Habit days as a calendar grid, Monday first, newest week last.
 * `rows`: one row per week (compact cards). `columns`: one column per week (wide history).
 * Filled = done, dim = missed, faint = before the habit started, outlined = today, empty = future.
 */
export function Waffle({
  done,
  since,
  weeks,
  tint,
  cell = 12,
  axis = 'rows',
}: {
  done: readonly string[];
  since: string;
  weeks: number;
  tint: string;
  cell?: number;
  axis?: 'rows' | 'columns';
}) {
  const set = new Set(done);
  const now = today();
  const monday = addDays(now, -((startOf(now).getDay() + 6) % 7));
  const first = addDays(monday, -7 * (weeks - 1));
  const gap = Math.max(2, Math.round(cell / 4));

  const square = (w: number, d: number) => {
    const day = addDays(first, w * 7 + d);
    const before = day < since;
    return (
      <View
        key={d}
        style={{
          width: cell,
          height: cell,
          borderRadius: cell / 4,
          borderCurve: 'continuous',
          backgroundColor: day > now ? 'transparent' : set.has(day) ? tint : before ? color.night : color.raised,
          borderWidth: day === now && !set.has(day) ? 1.5 : 0,
          borderColor: tint,
        }}
      />
    );
  };

  return (
    <View style={{ flexDirection: axis === 'rows' ? 'column' : 'row', gap }}>
      {Array.from({ length: weeks }, (_, w) => (
        <View key={w} style={{ flexDirection: axis === 'rows' ? 'row' : 'column', gap }}>
          {Array.from({ length: 7 }, (_, d) => square(w, d))}
        </View>
      ))}
    </View>
  );
}
