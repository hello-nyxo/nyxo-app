import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import { day } from '@/health/night';
import type { Point } from '@/health/types';
import { heartSamples, useHealth } from '@/health/use-health';
import { Heading } from '@/ui/cards';
import { HeartCurve } from '@/ui/charts';
import { SleepClock } from '@/ui/sleep-clock';
import { Hypnogram } from '@/ui/stages';
import { Stat, thousands } from '@/ui/stat';
import { color } from '@/ui/theme';

export default function NightScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const night = useHealth().nights.find((n) => n.id === id);
  const { width } = useWindowDimensions();
  const [heart, setHeart] = useState<Point[]>([]);

  useEffect(() => {
    if (night) heartSamples(night.start, night.end).then(setHeart, () => setHeart([]));
  }, [night]);

  if (!night) return <View className="flex-1 bg-night" />;

  return (
    <ScrollView className="flex-1 bg-night" contentInsetAdjustmentBehavior="automatic" contentContainerClassName="gap-8 px-4 pb-16 pt-2">
      <Stack.Screen options={{ title: day(night.end) }} />
      <View className="items-center">
        <SleepClock night={night} size={Math.min(width - 48, 320)} />
      </View>
      <View className="flex-row flex-wrap justify-center gap-x-6 gap-y-2">
        <Stat icon="heart" value={night.hr ? `${night.hr.avg}` : undefined} unit="bpm" tint={color.wake} />
        <Stat icon="hrv" value={night.hrv} unit="ms" tint={color.mint} />
        <Stat icon="resting" value={night.resting} unit="bpm" tint={color.brandLight} />
        <Stat icon="steps" value={thousands(night.steps)} tint={color.brandLight} />
      </View>
      <Hypnogram night={night} />
      {heart.length > 1 ? (
        <View className="gap-3">
          <Heading>Heart rate</Heading>
          <View className="rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
            <HeartCurve points={heart} night={night} width={width - 32 - 40} />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}
