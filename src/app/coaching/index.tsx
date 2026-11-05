import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { habit as findHabit, habits, image, lessons, weeks } from '@/coaching';
import { startHabit, useProgress } from '@/coaching/progress';
import { activeDays, streak } from '@/coaching/stats';
import { compareHabit } from '@/health/insights';
import { useHealth } from '@/health/use-health';
import { Group, Heading, PhotoCard } from '@/ui/cards';
import { byPeriod, HabitCard, PeriodIcon } from '@/ui/habits';
import { Ring } from '@/ui/ring';
import { Stat } from '@/ui/stat';
import { color } from '@/ui/theme';

export default function CoachingScreen() {
  const progress = useProgress();
  const { nights } = useHealth();
  const { read } = progress;

  // Continue after the furthest lesson read; fall back to anything unread.
  const furthest = lessons.findLastIndex((l) => read[l.slug]);
  const unread = (l: (typeof lessons)[number]) => !read[l.slug];
  const next = lessons.slice(furthest + 1).find(unread) ?? lessons.find(unread);
  const readCount = lessons.filter((l) => read[l.slug]).length;
  const passed = lessons.filter((l) => l.quiz && progress.quiz[l.slug] !== undefined && progress.quiz[l.slug] <= 33).length;
  const tracked = byPeriod(Object.keys(progress.habits).flatMap((slug) => findHabit(slug) ?? []));
  // Before any habit: offer the habits from lessons already read, then the first ones in the program.
  const offer = [...new Set([...habits.filter((h) => read[h.lesson]), ...habits])].slice(0, 3);

  return (
    <ScrollView className="flex-1 bg-night" contentInsetAdjustmentBehavior="automatic" contentContainerClassName="gap-8 px-4 pb-16 pt-2">
      <View className="flex-row items-center gap-6 rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
        <Ring value={readCount / lessons.length} size={108} stroke={11}>
          <Text className="font-display text-[26px] text-ink tabular-nums">{Math.round((readCount / lessons.length) * 100)}%</Text>
        </Ring>
        <View className="flex-1 gap-3">
          <Stat icon="streak" value={streak(activeDays(progress))} unit="days" tint={color.wake} />
          <Stat icon="lessons" value={`${readCount}/${lessons.length}`} unit="lessons" tint={color.brandLight} />
          <Stat icon="quiz" value={passed} unit="quizzes" tint={color.mint} />
        </View>
      </View>

      {next && readCount > 0 ? (
        <View className="gap-3">
          <Heading>Up next</Heading>
          <PhotoCard href={`/coaching/${next.slug}`} cover={next.cover} title={next.title} ratio={16 / 11} large />
        </View>
      ) : null}

      <View className="gap-3">
        <Heading>Habits</Heading>
        {tracked.length ? (
          tracked.map((h) => (
            <HabitCard key={h.slug} habit={h} record={progress.habits[h.slug]} comparison={compareHabit(nights, progress.habits[h.slug])} />
          ))
        ) : (
          <Group>
            {offer.map((h) => (
              <View key={h.slug} className="flex-row items-center gap-3 px-4 py-3.5">
                <PeriodIcon period={h.period} />
                <Link href={`/coaching/habit/${h.slug}`} asChild>
                  <Pressable className="flex-1 active:opacity-60">
                    <Text className="font-ui-strong text-[16px] leading-[21px] text-ink">{h.title}</Text>
                  </Pressable>
                </Link>
                <Pressable onPress={() => startHabit(h.slug)} hitSlop={10} className="rounded-full bg-brand px-3.5 py-1.5 active:opacity-70">
                  <Text className="font-title text-[14px] text-ink">Start</Text>
                </Pressable>
              </View>
            ))}
          </Group>
        )}
      </View>

      <View className="gap-3">
        <Heading>Badges</Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4" contentContainerClassName="gap-4 px-4">
          {weeks.map((w) => {
            const share = w.lessons.filter((s) => read[s]).length / w.lessons.length;
            const done = share === 1;
            return (
              <Link key={w.slug} href={`/coaching/week/${w.slug}`} asChild>
                <Pressable className="w-[92px] items-center gap-2 active:opacity-70">
                  <Ring value={share} size={84} stroke={5} tint={done ? color.mint : color.brandLight}>
                    <Image source={image(w.cover)} style={{ width: 66, height: 66, borderRadius: 33, opacity: done ? 1 : 0.35 }} contentFit="cover" />
                  </Ring>
                  {done ? (
                    <View className="absolute right-1 top-0 rounded-full bg-night">
                      <SymbolView name={{ ios: 'checkmark.seal.fill', android: 'verified' }} size={24} tintColor={color.mint} />
                    </View>
                  ) : null}
                  <Text className={`text-center font-ui-strong text-[12px] leading-[15px] ${done ? 'text-ink' : 'text-ink-3'}`} numberOfLines={2}>
                    {w.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>
      </View>

      <View className="gap-4">
        <Heading>Program</Heading>
        {weeks.map((w) => (
          <PhotoCard
            key={w.slug}
            href={`/coaching/week/${w.slug}`}
            cover={w.cover}
            title={w.title}
            progress={w.lessons.filter((s) => read[s]).length / w.lessons.length}
          />
        ))}
      </View>
    </ScrollView>
  );
}
