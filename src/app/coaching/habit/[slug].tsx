import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import { Text, useWindowDimensions, View } from 'react-native';

import { habit as findHabit, lesson } from '@/coaching';
import { startHabit, stopHabit, toggleHabit, useProgress } from '@/coaching/progress';
import { longest, streak } from '@/coaching/stats';
import { compareHabit } from '@/health/insights';
import { useHealth } from '@/health/use-health';
import { PrimaryButton } from '@/ui/button';
import { Heading, PhotoCard } from '@/ui/cards';
import { ComparisonView } from '@/ui/comparison';
import { isDoneToday, PeriodIcon } from '@/ui/habits';
import { ParallaxScreen } from '@/ui/parallax';
import { Prose } from '@/ui/prose';
import { Stat } from '@/ui/stat';
import { color, periodColor } from '@/ui/theme';
import { Waffle } from '@/ui/waffle';

/** History shown on the habit screen: one column per week. */
const WEEKS = 12;

export default function HabitScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const progress = useProgress();
  const { nights } = useHealth();
  const { width } = useWindowDimensions();
  const h = findHabit(slug);
  if (!h) return <View className="flex-1 bg-night" />;

  const record = progress.habits[h.slug];
  const source = lesson(h.lesson);
  const tint = periodColor[h.period];
  const comparison = record && compareHabit(nights, record);
  const done = isDoneToday(record);

  return (
    <ParallaxScreen
      cover={source?.cover}
      title={h.title}
      hero={
        <View className="gap-3">
          <PeriodIcon period={h.period} size={26} />
          <Text className="font-display text-[34px] leading-[40px] text-ink" accessibilityRole="header">
            {h.title}
          </Text>
        </View>
      }>
      <View className="gap-10 px-4 pt-7">
        {record ? (
          <>
            <PrimaryButton
              label={done ? 'Done today' : 'Mark done today'}
              quiet={done}
              onPress={() => {
                if (process.env.EXPO_OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                toggleHabit(h.slug);
              }}
            />
            <View className="gap-5 rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
              <View className="flex-row gap-6">
                <Stat icon="streak" value={streak(record.done)} unit="now" tint={color.wake} />
                <Stat icon="streak" value={longest(record.done)} unit="best" tint={color.ink3} />
                <Stat icon="quiz" value={record.done.length} unit="days" tint={tint} />
              </View>
              <Waffle done={record.done} since={record.since} weeks={WEEKS} tint={tint} axis="columns" cell={Math.floor((width - 32 - 40) / (WEEKS * 1.25))} />
            </View>
            {comparison ? (
              <View className="gap-3">
                <Heading>Sleep</Heading>
                <View className="rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
                  <ComparisonView comparison={comparison} tint={tint} />
                </View>
              </View>
            ) : null}
          </>
        ) : (
          <PrimaryButton label="Start habit" onPress={() => startHabit(h.slug)} />
        )}

        <View className="px-1">
          <Prose blocks={h.blocks} />
        </View>

        {source ? <PhotoCard href={`/coaching/${source.slug}`} cover={source.cover} title={source.title} /> : null}
        {record ? <PrimaryButton label="Stop tracking" quiet onPress={() => stopHabit(h.slug)} /> : null}
      </View>
    </ParallaxScreen>
  );
}
