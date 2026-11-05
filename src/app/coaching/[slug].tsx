import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { authors, image, lesson, next, type Habit, type Lesson } from '@/coaching';
import { markRead, startHabit, useProgress } from '@/coaching/progress';
import { result } from '@/coaching/quiz';
import { PrimaryButton } from '@/ui/button';
import { PhotoCard } from '@/ui/cards';
import { PeriodIcon } from '@/ui/habits';
import { ParallaxScreen } from '@/ui/parallax';
import { Prose } from '@/ui/prose';
import { color, periodColor } from '@/ui/theme';
import { Waffle } from '@/ui/waffle';

export default function LessonScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const l = lesson(slug);
  if (!l) return <View className="flex-1 bg-night" />;
  const following = next(l);

  return (
    <ParallaxScreen
      key={l.slug}
      cover={l.cover}
      title={l.title}
      onEnd={() => markRead(l.slug)}
      hero={
        <Text className="font-display text-[34px] leading-[40px] text-ink" accessibilityRole="header">
          {l.title}
        </Text>
      }>
      <View className="gap-10 px-5 pt-7">
        <Prose blocks={l.blocks} />
        {l.habit ? <LessonHabit habit={l.habit} /> : null}
        {l.quiz ? <QuizCard lesson={l} /> : null}
        <AuthorCard slug={l.author} />
        {l.references?.length ? <References lesson={l} /> : null}
        {following ? (
          <View className="-mx-1">
            <PhotoCard href={`/coaching/${following.slug}`} cover={following.cover} title={following.title} />
          </View>
        ) : null}
      </View>
    </ParallaxScreen>
  );
}

/** The lesson's habit: start it here, or see how it's going. */
function LessonHabit({ habit }: { habit: Habit }) {
  const { habits } = useProgress();
  const record = habits[habit.slug];
  return (
    <View className="gap-4 rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
      <View className="flex-row items-center gap-3">
        <PeriodIcon period={habit.period} size={22} />
        <Text className="flex-1 font-title text-[18px] leading-[23px] text-ink">{habit.title}</Text>
      </View>
      <Prose blocks={habit.blocks} size="small" />
      {record ? (
        <Link href={`/coaching/habit/${habit.slug}`} asChild>
          <Pressable className="flex-row items-center justify-between active:opacity-70">
            <Waffle done={record.done} since={record.since} weeks={2} tint={periodColor[habit.period]} cell={14} />
            <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right' }} size={14} weight="semibold" tintColor={color.ink3} />
          </Pressable>
        </Link>
      ) : (
        <PrimaryButton label="Start habit" onPress={() => startHabit(habit.slug)} />
      )}
    </View>
  );
}

function QuizCard({ lesson: l }: { lesson: Lesson }) {
  const { quiz } = useProgress();
  const score = quiz[l.slug];
  return (
    <Link href={`/coaching/quiz/${l.slug}`} asChild>
      <Pressable className="flex-row items-center gap-4 rounded-[28px] bg-brand p-5 active:opacity-80" style={{ borderCurve: 'continuous' }}>
        <SymbolView name={{ ios: 'checklist', android: 'quiz' }} size={24} tintColor={color.ink} />
        <Text className="flex-1 font-title text-[18px] text-ink">
          {score === undefined ? 'Quiz' : (result(l.quiz!, score)?.title ?? 'Quiz')}
        </Text>
        <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right' }} size={14} weight="semibold" tintColor={color.ink2} />
      </Pressable>
    </Link>
  );
}

function AuthorCard({ slug }: { slug?: string }) {
  const a = slug ? authors[slug] : undefined;
  if (!a) return null;
  return (
    <View className="flex-row items-center gap-4">
      <Image source={image(a.avatar)} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: color.raised }} />
      <View className="flex-1 gap-0.5">
        <Text className="font-ui-strong text-[16px] text-ink">{a.name}</Text>
        {a.credentials ? <Text className="font-ui text-[14px] leading-[19px] text-ink-2">{a.credentials}</Text> : null}
      </View>
    </View>
  );
}

function References({ lesson: l }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);
  return (
    <View className="gap-4 border-t border-line pt-5">
      <Pressable className="flex-row items-center justify-between active:opacity-60" onPress={() => setOpen(!open)}>
        <Text className="font-ui-strong text-[15px] text-ink-2">References</Text>
        <SymbolView
          name={open ? { ios: 'chevron.up', android: 'expand_less' } : { ios: 'chevron.down', android: 'expand_more' }}
          size={13}
          weight="semibold"
          tintColor={color.ink3}
        />
      </Pressable>
      {open ? <Prose blocks={l.references!} size="small" /> : null}
    </View>
  );
}
