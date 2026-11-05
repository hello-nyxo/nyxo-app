import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';

import type { Habit, Period } from '@/coaching';
import { toggleHabit, type Progress } from '@/coaching/progress';
import { streak } from '@/coaching/stats';
import type { Comparison } from '@/health/insights';
import { today } from '@/lib/days';

import { Delta } from './comparison';
import { color, periodColor } from './theme';
import { Waffle } from './waffle';

export const PERIOD_ICON = {
  morning: { ios: 'sunrise.fill', android: 'wb_twilight' },
  afternoon: { ios: 'sun.max.fill', android: 'light_mode' },
  evening: { ios: 'sunset.fill', android: 'nights_stay' },
} as const;

const ORDER: Period[] = ['morning', 'afternoon', 'evening'];
export const byPeriod = <T extends { period: Period }>(xs: T[]) => [...xs].sort((a, b) => ORDER.indexOf(a.period) - ORDER.indexOf(b.period));

export function PeriodIcon({ period, size = 20 }: { period: Period; size?: number }) {
  return <SymbolView name={PERIOD_ICON[period]} size={size} tintColor={periodColor[period]} />;
}

/** A habit to check off today. The row opens the habit; the circle checks it. */
export function HabitCheck({ habit, done }: { habit: Habit; done: boolean }) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <PeriodIcon period={habit.period} />
      <Link href={`/coaching/habit/${habit.slug}`} asChild>
        <Pressable className="flex-1 active:opacity-60">
          <Text className={`font-ui-strong text-[16px] leading-[21px] ${done ? 'text-ink-3' : 'text-ink'}`} numberOfLines={2}>
            {habit.title}
          </Text>
        </Pressable>
      </Link>
      <Pressable
        hitSlop={10}
        onPress={() => {
          if (process.env.EXPO_OS === 'ios') Haptics.impactAsync(done ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Medium);
          toggleHabit(habit.slug);
        }}
        className="active:opacity-60">
        <SymbolView
          name={done ? { ios: 'checkmark.circle.fill', android: 'check_circle' } : { ios: 'circle', android: 'radio_button_unchecked' }}
          size={28}
          tintColor={done ? periodColor[habit.period] : color.ink3}
        />
      </Pressable>
    </View>
  );
}

/** A tracked habit: streak, the last four weeks, and how sleep differs on habit days. */
export function HabitCard({ habit, record, comparison }: { habit: Habit; record: Progress['habits'][string]; comparison?: Comparison }) {
  const days = streak(record.done);
  return (
    <Link href={`/coaching/habit/${habit.slug}`} asChild>
      <Pressable className="gap-4 rounded-[28px] bg-surface p-5 active:opacity-80" style={{ borderCurve: 'continuous' }}>
        <View className="flex-row items-center gap-3">
          <PeriodIcon period={habit.period} />
          <Text className="flex-1 font-title text-[17px] leading-[22px] text-ink" numberOfLines={2}>
            {habit.title}
          </Text>
        </View>
        <View className="flex-row items-end justify-between">
          <Waffle done={record.done} since={record.since} weeks={4} tint={periodColor[habit.period]} cell={13} />
          <View className="items-end gap-2">
            <View className="flex-row items-center gap-1">
              <SymbolView name={{ ios: 'flame.fill', android: 'local_fire_department' }} size={15} tintColor={color.wake} />
              <Text className="font-display text-[20px] text-ink tabular-nums">{days}</Text>
            </View>
            {comparison ? <Delta comparison={comparison} /> : null}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export const isDoneToday = (record?: Progress['habits'][string]) => !!record?.done.includes(today());
