import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { habit as findHabit } from '@/coaching';
import { useProgress } from '@/coaching/progress';
import { metrics, problems } from '@/coaching/recommend';
import { compareActivity, compareHabit } from '@/health/insights';
import { duration } from '@/health/night';
import { useHealth } from '@/health/use-health';
import { Group, Heading } from '@/ui/cards';
import { LineChart, ScheduleChart, SleepBars } from '@/ui/charts';
import { ComparisonView } from '@/ui/comparison';
import { PeriodIcon } from '@/ui/habits';
import { color, periodColor } from '@/ui/theme';

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

export default function TrendsScreen() {
  const { nights } = useHealth();
  const progress = useProgress();
  const { width } = useWindowDimensions();
  const inner = width - 32 - 40;

  if (!nights.length) return <ScrollView className="flex-1 bg-night" contentInsetAdjustmentBehavior="automatic" />;

  const week = avg(nights.slice(0, 7).map((n) => n.asleep));
  const before = nights.slice(7, 14);
  const change = before.length ? week - avg(before.map((n) => n.asleep)) : undefined;
  const activity = compareActivity(nights.slice(0, 30));
  const tracked = Object.entries(progress.habits).flatMap(([slug, record]) => {
    const h = findHabit(slug);
    const c = h && compareHabit(nights, record);
    return h && c ? [{ habit: h, comparison: c }] : [];
  });
  const recent = nights.slice(0, 30).reverse();

  return (
    <ScrollView className="flex-1 bg-night" contentInsetAdjustmentBehavior="automatic" contentContainerClassName="gap-8 px-4 pb-16 pt-2">
      <Card>
        <View className="flex-row items-end justify-between">
          <Text className="font-display text-[44px] leading-[50px] text-ink tabular-nums">{duration(week)}</Text>
          {change !== undefined ? (
            <Text className={`pb-2 font-title text-[17px] tabular-nums ${change >= 0 ? 'text-mint' : 'text-wake'}`}>
              {change >= 0 ? '+' : '−'}
              {duration(Math.abs(change))}
            </Text>
          ) : null}
        </View>
        <SleepBars nights={nights} width={inner} />
      </Card>

      <View className="gap-3">
        <Heading>Schedule</Heading>
        <Card>
          <ScheduleChart nights={nights} width={inner} />
        </Card>
      </View>

      <View className="gap-3">
        <Heading>Heart</Heading>
        <View className="flex-row gap-3">
          <Tile value={recent.at(-1)?.hr?.avg} unit="bpm">
            <LineChart values={recent.map((n) => n.hr?.avg)} width={(width - 32 - 12) / 2 - 40} tint={color.wake} />
          </Tile>
          <Tile value={recent.at(-1)?.hrv} unit="ms HRV">
            <LineChart values={recent.map((n) => n.hrv)} width={(width - 32 - 12) / 2 - 40} tint={color.mint} />
          </Tile>
        </View>
      </View>

      {activity ? (
        <View className="gap-3">
          <Heading>Activity</Heading>
          <Card>
            <ComparisonView
              comparison={activity}
              tint={color.brandLight}
              on={`${(activity.median / 1000).toFixed(1)}k+ steps`}
              off={`Under ${(activity.median / 1000).toFixed(1)}k`}
            />
          </Card>
        </View>
      ) : null}

      {tracked.length ? (
        <View className="gap-3">
          <Heading>Habits</Heading>
          {tracked.map(({ habit, comparison }) => (
            <Link key={habit.slug} href={`/coaching/habit/${habit.slug}`} asChild>
              <Pressable className="active:opacity-80">
                <Card>
                  <View className="flex-row items-center gap-3">
                    <PeriodIcon period={habit.period} />
                    <Text className="flex-1 font-title text-[17px] leading-[22px] text-ink" numberOfLines={2}>
                      {habit.title}
                    </Text>
                  </View>
                  <ComparisonView comparison={comparison} tint={periodColor[habit.period]} />
                </Card>
              </Pressable>
            </Link>
          ))}
        </View>
      ) : null}

      <Metrics nights={nights} />
    </ScrollView>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="gap-5 rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
      {children}
    </View>
  );
}

function Tile({ value, unit, children }: { value?: number; unit: string; children: React.ReactNode }) {
  return (
    <View className="flex-1 gap-3 rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
      <View className="flex-row items-baseline gap-1">
        <Text className="font-display text-[28px] text-ink tabular-nums" style={{ color: value === undefined ? color.ink3 : color.ink }}>
          {value ?? '–'}
        </Text>
        <Text className="font-ui text-[13px] text-ink-3">{unit}</Text>
      </View>
      {children}
    </View>
  );
}

/** The four things the program coaches, each with a traffic-light dot from how far it is from healthy. */
function Metrics({ nights }: { nights: Parameters<typeof metrics>[0] }) {
  const m = metrics(nights);
  if (!m) return null;
  const p = problems(nights);
  const dot = (x: number) => (x < 0.34 ? color.mint : x < 0.67 ? periodColor.morning : color.wake);
  const rows = [
    { title: 'Duration', value: duration(m.duration), problem: p.duration },
    { title: 'Efficiency', value: `${Math.round(m.efficiency * 100)}%`, problem: p.efficiency },
    { title: 'Consistency', value: `±${duration(m.consistency * 3600 * 1000)}`, problem: p.consistency },
    { title: 'Social jet lag', value: duration(m.jetlag * 3600 * 1000), problem: p.jetlag },
  ];
  return (
    <View className="gap-3">
      <Heading>Coaching focus</Heading>
      <Group>
        {rows.map((r) => (
          <View key={r.title} className="flex-row items-center gap-3 px-4 py-3.5">
            <View className="size-2.5 rounded-full" style={{ backgroundColor: dot(r.problem) }} />
            <Text className="flex-1 font-ui-strong text-[16px] text-ink">{r.title}</Text>
            <Text className="font-ui-strong text-[16px] text-ink-2 tabular-nums">{r.value}</Text>
          </View>
        ))}
      </Group>
    </View>
  );
}

