import { SymbolView } from 'expo-symbols';
import { Text, View } from 'react-native';

import { duration } from '@/health/night';
import type { Comparison } from '@/health/insights';

import { color } from './theme';

const signed = (ms: number) => `${ms >= 0 ? '+' : '−'}${duration(Math.abs(ms))}`;
const signedNumber = (n: number, unit: string) => `${n >= 0 ? '+' : '−'}${Math.abs(n)} ${unit}`;

/** Differences smaller than this are noise at these sample sizes: shown, but not colored. */
const NOISE = 10 * 60 * 1000;
const tone = (ms: number) => (Math.abs(ms) < NOISE ? 'text-ink-2' : ms > 0 ? 'text-mint' : 'text-wake');
const round = (n?: number) => (n === undefined ? undefined : Math.round(n));

/** Sleep after days with something vs. without it: the difference first, then the two averages. */
export function ComparisonView({ comparison: c, tint, on = 'With', off = 'Without' }: { comparison: Comparison; tint: string; on?: string; off?: string }) {
  const diff = c.with.asleep - c.without.asleep;
  const max = Math.max(c.with.asleep, c.without.asleep, 1);
  // Whole units, and a zero difference isn't worth a chip.
  const hr = round(c.with.hr !== undefined && c.without.hr !== undefined ? c.with.hr - c.without.hr : undefined) || undefined;
  const hrv = round(c.with.hrv !== undefined && c.without.hrv !== undefined ? c.with.hrv - c.without.hrv : undefined) || undefined;

  return (
    <View className="gap-4">
      <Text className={`font-display text-[34px] leading-[38px] tabular-nums ${tone(diff)}`}>
        {signed(diff)}
      </Text>
      {[
        { label: on, value: c.with, fill: tint },
        { label: off, value: c.without, fill: color.raised },
      ].map((row) => (
        <View key={row.label} className="gap-1.5">
          <View className="flex-row justify-between">
            <Text className="font-ui-strong text-[14px] text-ink-2">{row.label}</Text>
            <Text className="font-ui-strong text-[14px] text-ink tabular-nums">{duration(row.value.asleep)}</Text>
          </View>
          <View className="h-2.5 overflow-hidden rounded-full bg-night">
            <View className="h-full rounded-full" style={{ width: `${(row.value.asleep / max) * 100}%`, backgroundColor: row.fill }} />
          </View>
        </View>
      ))}
      {hr !== undefined || hrv !== undefined ? (
        <View className="flex-row gap-2">
          {hr !== undefined ? <Chip icon={{ ios: 'heart.fill', android: 'favorite' }} text={signedNumber(hr, 'bpm')} good={hr <= 0} /> : null}
          {hrv !== undefined ? <Chip icon={{ ios: 'waveform.path.ecg', android: 'monitor_heart' }} text={signedNumber(hrv, 'ms HRV')} good={hrv >= 0} /> : null}
        </View>
      ) : null}
    </View>
  );
}

function Chip({ icon, text, good }: { icon: { ios: 'heart.fill' | 'waveform.path.ecg'; android: 'favorite' | 'monitor_heart' }; text: string; good: boolean }) {
  return (
    <View className="flex-row items-center gap-1.5 rounded-full bg-night px-3 py-1.5">
      <SymbolView name={icon} size={13} tintColor={good ? color.mint : color.wake} />
      <Text className="font-ui-strong text-[13px] text-ink tabular-nums">{text}</Text>
    </View>
  );
}

/** The sleep difference alone, for rows and cards. */
export function Delta({ comparison: c }: { comparison: Comparison }) {
  const diff = c.with.asleep - c.without.asleep;
  return (
    <View className="flex-row items-center gap-1 rounded-full bg-night px-2.5 py-1">
      <SymbolView name={{ ios: 'moon.fill', android: 'bedtime' }} size={11} tintColor={Math.abs(diff) < NOISE ? color.ink2 : diff > 0 ? color.mint : color.wake} />
      <Text className={`font-ui-strong text-[13px] tabular-nums ${tone(diff)}`}>{signed(diff)}</Text>
    </View>
  );
}
