import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { lesson, type Answer } from '@/coaching';
import { saveQuiz } from '@/coaching/progress';
import { best, result, score } from '@/coaching/quiz';
import { PrimaryButton } from '@/ui/button';
import { Prose } from '@/ui/prose';

const ios = process.env.EXPO_OS === 'ios';

export default function QuizScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const quiz = lesson(slug)?.quiz;
  const [chosen, setChosen] = useState<Answer[]>([]);
  const [index, setIndex] = useState(0);
  if (!quiz) return <View className="flex-1 bg-night" />;

  const done = index >= quiz.questions.length;
  const question = quiz.questions[index];
  const picked = chosen[index];

  if (done) {
    const r = result(quiz, score(chosen));
    return (
      <ScrollView className="flex-1 bg-night" contentContainerClassName="flex-grow justify-center gap-6 p-6 pb-16">
        <Animated.View entering={FadeInDown} style={{ gap: 20 }}>
          <Text className="font-display text-[40px] leading-[46px] text-ink">{r?.title}</Text>
          {r ? <Prose blocks={r.blocks} /> : null}
        </Animated.View>
        <PrimaryButton label="Done" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  const pick = (a: Answer) => {
    if (picked) return;
    if (ios) Haptics.notificationAsync(a === best(question.answers) ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning);
    setChosen([...chosen, a]);
  };
  const advance = () => {
    const last = index === quiz.questions.length - 1;
    if (last) saveQuiz(slug, score(chosen));
    setIndex(index + 1);
  };

  return (
    <ScrollView className="flex-1 bg-night" contentContainerClassName="gap-8 p-6 pb-16">
      <View className="flex-row gap-2">
        {quiz.questions.map((_, i) => (
          <View key={i} className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-brand-light' : 'bg-raised'}`} />
        ))}
      </View>
      <Animated.View key={index} entering={FadeIn} style={{ gap: 24 }}>
        <Text className="font-title text-[26px] leading-[33px] text-ink">{question.text}</Text>
        <View className="gap-3">
          {question.answers.map((a, i) => {
            const isBest = a === best(question.answers);
            const state = !picked ? 'idle' : isBest ? 'best' : a === picked ? 'wrong' : 'other';
            return (
              <Pressable
                key={i}
                onPress={() => pick(a)}
                className={`rounded-3xl border-2 p-4 ${
                  state === 'best' ? 'border-mint bg-surface' : state === 'wrong' ? 'border-wake bg-surface' : 'border-transparent bg-surface'
                } ${state === 'other' ? 'opacity-50' : ''} active:opacity-70`}
                style={{ borderCurve: 'continuous' }}>
                <Text className="font-ui-strong text-[16px] leading-[22px] text-ink">{a.text}</Text>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
      {picked ? (
        <Animated.View entering={FadeInDown}>
          <PrimaryButton label={index === quiz.questions.length - 1 ? 'See result' : 'Next'} onPress={advance} />
        </Animated.View>
      ) : null}
    </ScrollView>
  );
}
