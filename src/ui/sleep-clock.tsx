import { Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';

import { duration, time, type Night } from '@/health/night';

import { color, font, stageColor } from './theme';


/** Angle in degrees for a time of day, midnight at the top. */
function angle(ms: number) {
  const d = new Date(ms);
  return ((d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60) / (24 * 60)) * 360;
}

function point(c: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: c + r * Math.cos(rad), y: c + r * Math.sin(rad) };
}

function arc(c: number, r: number, from: number, to: number) {
  const sweep = (to - from + 360) % 360 || 0.01;
  const a = point(c, r, from);
  const b = point(c, r, from + sweep);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
}

/**
 * The night on a 24-hour dial: stage-colored arc, bedtime in mint, wake-up in warm.
 * `bare` drops the ticks and the numbers in the middle, for small sizes.
 */
export function SleepClock({ night, size, bare }: { night: Night; size: number; bare?: boolean }) {
  const RING = bare ? Math.max(8, size * 0.11) : 22;
  const c = size / 2;
  const r = c - RING / 2 - 2;
  const start = point(c, r, angle(night.start));
  const end = point(c, r, angle(night.end));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={c} cy={c} r={r} stroke={color.surface} strokeWidth={RING} fill="none" />
        {bare ? null : Array.from({ length: 24 }, (_, h) => {
          const a = point(c, r - RING / 2 - 8, h * 15);
          const b = point(c, r - RING / 2 - (h % 6 ? 12 : 16), h * 15);
          return <Line key={h} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={h % 6 ? color.ink3 : color.ink2} strokeWidth={h % 6 ? 1 : 2} strokeLinecap="round" />;
        })}
        {bare ? null : [0, 6, 12, 18].map((h) => {
          const p = point(c, r - RING / 2 - 30, h * 15);
          return (
            <SvgText key={h} x={p.x} y={p.y + 4} fill={color.ink3} fontSize={12} fontFamily={font.strong} textAnchor="middle">
              {String(h).padStart(2, '0')}
            </SvgText>
          );
        })}
        <G>
          {night.segments.map((s, i) => (
            <Path key={i} d={arc(c, r, angle(s.start), angle(s.end))} stroke={stageColor[s.stage]} strokeWidth={RING} fill="none" />
          ))}
        </G>
        <Circle cx={start.x} cy={start.y} r={RING * 0.36} fill={color.mint} stroke={color.night} strokeWidth={RING * 0.14} />
        <Circle cx={end.x} cy={end.y} r={RING * 0.36} fill={color.wake} stroke={color.night} strokeWidth={RING * 0.14} />
      </Svg>
      {bare ? null : <View className="absolute inset-0 items-center justify-center gap-1">
        <Text className="font-display text-[52px] leading-[60px] text-ink tabular-nums" selectable>
          {duration(night.asleep)}
        </Text>
        <Text className="font-ui text-[15px] text-ink-2 tabular-nums" selectable>
          {time(night.start)} – {time(night.end)}
        </Text>
      </View>}
    </View>
  );
}
