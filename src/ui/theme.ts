// Values for props that take a color or font rather than a className
// (SVG, gradients, native controls, navigation). Mirrors src/global.css.
import type { Stage } from '@/health/night';

export const color = {
  night: '#0B0820',
  surface: '#161230',
  raised: '#221B45',
  line: 'rgba(255,255,255,0.08)',
  ink: '#F3F1FF',
  ink2: 'rgba(243,241,255,0.64)',
  ink3: 'rgba(243,241,255,0.4)',
  brand: '#4A5AEF',
  brandLight: '#8C97FF',
  mint: '#4AEFD5',
  wake: '#DD956E',
} as const;

export const stageColor: Record<Stage, string> = {
  awake: '#DD956E',
  rem: '#5FC8F5',
  core: '#6F7DFF',
  deep: '#3B35C9',
  asleep: '#6F7DFF',
  inBed: '#463F78',
};

export const periodColor = { morning: '#F5A623', afternoon: '#4A9AEF', evening: '#7C5CFC' } as const;

export const font = {
  ui: 'PlusJakartaSans-Medium',
  strong: 'PlusJakartaSans-SemiBold',
  title: 'PlusJakartaSans-Bold',
  display: 'PlusJakartaSans-ExtraBold',
} as const;
