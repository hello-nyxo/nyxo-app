import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';

import { habit as findHabit, habits, lessons, week } from '@/coaching';
import { startHabit, useProgress } from '@/coaching/progress';
import { recommend } from '@/coaching/recommend';
import { activeDays, streak } from '@/coaching/stats';
import { duration, time, type Night } from '@/health/night';
import { connect, healthName, refresh, useHealth } from '@/health/use-health';
import { addSampleData } from '@/sample';
import { PrimaryButton } from '@/ui/button';
import { Group, Heading, PhotoCard } from '@/ui/cards';
import { Cover } from '@/ui/cover';
import { byPeriod, HabitCheck, isDoneToday, PeriodIcon } from '@/ui/habits';
import { SleepClock } from '@/ui/sleep-clock';
import { Stat, thousands } from '@/ui/stat';
import { color } from '@/ui/theme';

export default function TodayScreen() {
  const { access, nights } = useHealth();
  const progress = useProgress();
  const [refreshing, setRefreshing] = useState(false);

  const active = byPeriod(Object.keys(progress.habits).flatMap((slug) => findHabit(slug) ?? []));
  const pick = nights.length ? recommend(nights, lessons, progress.read) : lessons.find((l) => !progress.read[l.slug]);
  const days = streak(activeDays(progress));

  return (
    <ScrollView
      className="flex-1 bg-night"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-4 pb-16 pt-2"
      refreshControl={
        <RefreshControl
          tintColor={color.ink3}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await refresh();
            setRefreshing(false);
          }}
        />
      }>
      {access === 'loading' ? null : nights[0] ? <LastNight night={nights[0]} /> : <NoNight access={access} />}

      <View className="gap-3">
        <View className="flex-row items-center justify-between pr-1">
          <Heading>Habits</Heading>
          {days ? <Stat icon="streak" value={days} tint={color.wake} /> : null}
        </View>
        {active.length ? (
          <Group>
            {active.map((h) => (
              <HabitCheck key={h.slug} habit={h} done={isDoneToday(progress.habits[h.slug])} />
            ))}
          </Group>
        ) : (
          <Suggestions read={progress.read} />
        )}
      </View>

      {pick ? (
        <View className="gap-3">
          <Heading>For you</Heading>
          <PhotoCard href={`/coaching/${pick.slug}`} cover={pick.cover} title={pick.title} />
        </View>
      ) : null}

      {__DEV__ && access === 'granted' && nights.length ? <PrimaryButton label="Add sample data" quiet onPress={addSampleData} /> : null}
    </ScrollView>
  );
}

function LastNight({ night }: { night: Night }) {
  return (
    <Link href={`/trends/${night.id}`} asChild>
      <Pressable className="gap-5 rounded-[28px] bg-surface p-5 active:opacity-80" style={{ borderCurve: 'continuous' }}>
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text className="font-display text-[44px] leading-[50px] text-ink tabular-nums">{duration(night.asleep)}</Text>
            <Text className="font-ui text-[15px] text-ink-2 tabular-nums">
              {time(night.start)} – {time(night.end)}
            </Text>
          </View>
          <SleepClock night={night} size={96} bare />
        </View>
        <View className="flex-row flex-wrap gap-x-5 gap-y-2">
          <Stat icon="heart" value={night.hr?.avg} unit="bpm" tint={color.wake} />
          <Stat icon="hrv" value={night.hrv} unit="ms" tint={color.mint} />
          <Stat icon="steps" value={thousands(night.steps)} tint={color.brandLight} />
        </View>
      </Pressable>
    </Link>
  );
}

function NoNight({ access }: { access: string }) {
  return (
    <Cover cover={week('falling-asleep')?.cover} style={{ aspectRatio: 16 / 10, borderRadius: 28, borderCurve: 'continuous' }}>
      <View className="flex-1 justify-end gap-2 p-5">
        {access === 'needed' ? <PrimaryButton label={`Connect to ${healthName}`} onPress={connect} /> : null}
        {access === 'unavailable' ? <Text className="font-ui-strong text-[17px] text-ink">{healthName} is unavailable</Text> : null}
        {access === 'granted' ? <Text className="font-ui-strong text-[17px] text-ink">No sleep yet</Text> : null}
        {__DEV__ && access === 'granted' ? <PrimaryButton label="Add sample data" quiet onPress={addSampleData} /> : null}
      </View>
    </Cover>
  );
}

/** Before any habit: offer the habits from lessons already read, or the first ones in the program. */
function Suggestions({ read }: { read: Readonly<Record<string, string>> }) {
  const fromRead = habits.filter((h) => read[h.lesson]);
  const offer = (fromRead.length ? fromRead : habits).slice(0, 3);
  return (
    <Group>
      {offer.map((h) => (
        <View key={h.slug} className="flex-row items-center gap-3 px-4 py-3.5">
          <PeriodIcon period={h.period} />
          <Link href={`/coaching/habit/${h.slug}`} asChild>
            <Pressable className="flex-1 active:opacity-60">
              <Text className="font-ui-strong text-[16px] leading-[21px] text-ink" numberOfLines={2}>
                {h.title}
              </Text>
            </Pressable>
          </Link>
          <Pressable onPress={() => startHabit(h.slug)} hitSlop={10} className="rounded-full bg-brand px-3.5 py-1.5 active:opacity-70">
            <Text className="font-title text-[14px] text-ink">Start</Text>
          </Pressable>
        </View>
      ))}
    </Group>
  );
}
