import { SymbolView } from 'expo-symbols';
import { Text, View } from 'react-native';

import { color } from './theme';

export const ICON = {
  heart: { ios: 'heart.fill', android: 'favorite' },
  hrv: { ios: 'waveform.path.ecg', android: 'monitor_heart' },
  steps: { ios: 'figure.walk', android: 'directions_walk' },
  resting: { ios: 'bed.double.fill', android: 'hotel' },
  streak: { ios: 'flame.fill', android: 'local_fire_department' },
  lessons: { ios: 'book.pages.fill', android: 'menu_book' },
  quiz: { ios: 'checkmark.seal.fill', android: 'verified' },
} as const;

/** Icon, number and unit. The icon says what it is; no label needed. */
export function Stat({ icon, value, unit, tint = color.ink2 }: { icon: keyof typeof ICON; value?: string | number; unit?: string; tint?: string }) {
  if (value === undefined) return null;
  return (
    <View className="flex-row items-center gap-1.5">
      <SymbolView name={ICON[icon]} size={15} tintColor={tint} />
      <Text className="font-title text-[16px] text-ink tabular-nums">{value}</Text>
      {unit ? <Text className="font-ui text-[13px] text-ink-3">{unit}</Text> : null}
    </View>
  );
}

export const thousands = (n?: number) => (n === undefined ? undefined : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
