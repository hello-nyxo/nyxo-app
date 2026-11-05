import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { lesson, week } from '@/coaching';
import { useProgress } from '@/coaching/progress';
import { Group, LessonRow } from '@/ui/cards';
import { ParallaxScreen } from '@/ui/parallax';

export default function WeekScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { read } = useProgress();
  const w = week(slug);
  if (!w) return <View className="flex-1 bg-night" />;

  return (
    <ParallaxScreen
      cover={w.cover}
      title={w.title}
      hero={
        <View className="gap-2">
          <Text className="font-display text-[34px] leading-[40px] text-ink" accessibilityRole="header">
            {w.title}
          </Text>
          <Text className="font-read text-[17px] leading-[25px] text-ink-2">{w.intro}</Text>
        </View>
      }>
      <View className="px-4 pt-6">
        <Group>
          {w.lessons.map((s) => {
            const l = lesson(s)!;
            return <LessonRow key={s} href={`/coaching/${s}`} cover={l.cover} title={l.title} done={!!read[s]} />;
          })}
        </Group>
      </View>
    </ParallaxScreen>
  );
}
