import { Stack } from 'expo-router';

import { photoOptions, stackOptions } from '@/ui/stack';

export default function CoachingLayout() {
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="index" options={{ title: 'Coaching' }} />
      <Stack.Screen name="week/[slug]" options={photoOptions} />
      <Stack.Screen name="[slug]" options={photoOptions} />
      <Stack.Screen name="habit/[slug]" options={photoOptions} />
      <Stack.Screen name="quiz/[slug]" options={{ presentation: 'modal', headerLargeTitle: false, title: '' }} />
    </Stack>
  );
}
