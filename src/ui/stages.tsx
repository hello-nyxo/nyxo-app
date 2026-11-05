import { Text, View } from 'react-native';

import { duration, totals, type Night, type Stage } from '@/health/night';

// Top to bottom, lightest sleep first.
const ORDER: Stage[] = ['awake', 'rem', 'core', 'deep', 'asleep', 'inBed'];

const LABEL: Record<Stage, string> = {
  awake: 'Awake',
  rem: 'REM',
  core: process.env.EXPO_OS === 'android' ? 'Light' : 'Core',
  deep: 'Deep',
  asleep: 'Asleep',
  inBed: 'In bed',
};

const COLOR: Record<Stage, string> = {
  awake: 'bg-awake',
  rem: 'bg-rem',
  core: 'bg-core',
  deep: 'bg-deep',
  asleep: 'bg-asleep',
  inBed: 'bg-in-bed',
};

const stagesIn = (night: Night) => ORDER.filter((stage) => night.segments.some((s) => s.stage === stage));

function place(night: Night, start: number, end: number) {
  const span = night.end - night.start || 1;
  return { left: `${((start - night.start) / span) * 100}%`, width: `${((end - start) / span) * 100}%` } as const;
}

/** One lane per stage across the night, with each stage's total. */
export function Hypnogram({ night }: { night: Night }) {
  const sum = totals(night);
  return (
    <View className="gap-3 rounded-[28px] bg-surface p-5" style={{ borderCurve: 'continuous' }}>
      {stagesIn(night).map((stage) => (
        <View key={stage} className="gap-1.5">
          <View className="flex-row items-baseline justify-between">
            <Text className="font-ui-strong text-[14px] text-ink-2">{LABEL[stage]}</Text>
            <Text className="font-ui-strong text-[14px] text-ink tabular-nums">{duration(sum[stage] ?? 0)}</Text>
          </View>
          <View className="h-3">
            {night.segments
              .filter((s) => s.stage === stage)
              .map((s, i) => (
                <View
                  key={i}
                  className={`absolute inset-y-0 rounded-full ${COLOR[stage]}`}
                  style={[place(night, s.start, s.end), { minWidth: 3 }]}
                />
              ))}
          </View>
        </View>
      ))}
    </View>
  );
}
