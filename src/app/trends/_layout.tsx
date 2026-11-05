import { Stack } from 'expo-router';

import { stackOptions } from '@/ui/stack';

export default function TrendsLayout() {
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="index" options={{ title: 'Trends' }} />
      <Stack.Screen name="[id]" options={{ headerLargeTitle: false }} />
    </Stack>
  );
}
