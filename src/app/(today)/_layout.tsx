import { Stack } from 'expo-router';

import { stackOptions } from '@/ui/stack';

export default function TodayLayout() {
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="index" options={{ title: 'Today' }} />
    </Stack>
  );
}
