import { Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Rect } from 'react-native-svg';

import { time, type Night } from '@/health/night';
import type { Point } from '@/health/types';

import { color, font } from './theme';

const H = 3600 * 1000;

/**
 * Hours asleep per night on a 5–9 h scale, oldest left.
 * A dashed line marks 8 hours; nights of 7 h or more are bright.
 */
export function SleepBars({ nights, width, height = 140 }: { nights: Night[]; width: number; height?: number }) {
  const shown = nights.slice(0, 30).reverse();
  const min = 5 * H;
  const max = 9 * H;
  const y = (ms: number) => ((Math.min(Math.max(ms, min), max) - min) / (max - min)) * height;
  const gap = 3;
  const bar = Math.max(3, (width - gap * (shown.length - 1)) / Math.max(shown.length, 1));
  const y8 = height - y(8 * H);
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} style={{ position: 'absolute' }}>
        <Line x1={0} x2={width} y1={y8} y2={y8} stroke={color.ink3} strokeDasharray="3 4" />
      </Svg>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap, height }}>
        {shown.map((n, i) => (
          <View
            key={n.id}
            style={{
              width: bar,
              height: Math.max(bar, y(n.asleep)),
              borderRadius: bar / 2,
              backgroundColor: i === shown.length - 1 ? color.brandLight : n.asleep >= 7 * H ? color.brand : 'rgba(74,90,239,0.4)',
            }}
          />
        ))}
      </View>
    </View>
  );
}

/** Bedtime to wake-up per night on a 20:00–12:00 axis: the shape of a sleep schedule. */
export function ScheduleChart({ nights, width, height = 180 }: { nights: Night[]; width: number; height?: number }) {
  const shown = nights.slice(0, 14).reverse();
  const from = 20; // 20:00
  const span = 16; // to 12:00
  const pos = (ms: number) => {
    const d = new Date(ms);
    const hours = (d.getHours() + d.getMinutes() / 60 - from + 24) % 24;
    return (Math.min(hours, span) / span) * height;
  };
  const inner = width - 32;
  const step = inner / Math.max(shown.length, 1);
  const cx = (i: number) => i * step + step / 2;
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ height, justifyContent: 'space-between' }}>
        {['20', '00', '04', '08', '12'].map((h) => (
          <Text key={h} style={{ fontFamily: font.strong, fontSize: 11, color: color.ink3 }}>
            {h}
          </Text>
        ))}
      </View>
      <Svg width={inner} height={height}>
        {shown.map((n, i) => (
          <Rect key={n.id} x={cx(i) - 4} y={pos(n.start)} width={8} height={Math.max(4, pos(n.end) - pos(n.start))} rx={4} fill={color.raised} />
        ))}
        {shown.map((n, i) => [
          <Circle key={`${n.id}s`} cx={cx(i)} cy={pos(n.start)} r={4} fill={color.mint} />,
          <Circle key={`${n.id}e`} cx={cx(i)} cy={pos(n.end)} r={4} fill={color.wake} />,
        ])}
      </Svg>
    </View>
  );
}

/** A simple line through values, with dots; for nightly heart rate and HRV. */
export function LineChart({ values, width, height = 64, tint }: { values: (number | undefined)[]; width: number; height?: number; tint: string }) {
  const known = values.filter((v): v is number => v !== undefined);
  if (known.length < 2) return <View style={{ height }} />;
  const min = Math.min(...known) - 2;
  const max = Math.max(...known) + 2;
  const x = (i: number) => (i / (values.length - 1)) * (width - 8) + 4;
  const y = (v: number) => height - 4 - ((v - min) / (max - min)) * (height - 8);
  const points = values.flatMap((v, i) => (v === undefined ? [] : [`${x(i)},${y(v)}`])).join(' ');
  const lastIndex = values.findLastIndex((v) => v !== undefined);
  return (
    <Svg width={width} height={height}>
      <Polyline points={points} fill="none" stroke={tint} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <Circle cx={x(lastIndex)} cy={y(values[lastIndex]!)} r={4.5} fill={tint} stroke={color.surface} strokeWidth={2} />
    </Svg>
  );
}

/** Heart rate through one night. */
export function HeartCurve({ points, night, width, height = 120 }: { points: Point[]; night: Night; width: number; height?: number }) {
  if (points.length < 2) return null;
  const vs = points.map((p) => p.value);
  const min = Math.min(...vs) - 3;
  const max = Math.max(...vs) + 3;
  const x = (t: number) => ((t - night.start) / (night.end - night.start)) * width;
  const y = (v: number) => height - ((v - min) / (max - min)) * height;
  return (
    <View style={{ gap: 6 }}>
      <Svg width={width} height={height}>
        <Polyline points={points.map((p) => `${x(p.time)},${y(p.value)}`).join(' ')} fill="none" stroke={color.wake} strokeWidth={2} strokeLinejoin="round" />
      </Svg>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: font.strong, fontSize: 12, color: color.ink3 }}>{time(night.start)}</Text>
        <Text style={{ fontFamily: font.strong, fontSize: 12, color: color.ink3 }}>{time(night.end)}</Text>
      </View>
    </View>
  );
}

