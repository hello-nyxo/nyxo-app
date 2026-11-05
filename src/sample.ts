// Development builds only: one button fills the app with a month of believable history,
// so every chart and comparison has something to show on a simulator.
import { habits, lessons } from '@/coaching';
import { addSampleProgress } from '@/coaching/progress';
import { addDays, today } from '@/lib/days';
import { sampleData } from '@/health/sample-data';
import { writeSample } from '@/health/use-health';

export async function addSampleData() {
  // An evening habit drives the effect; a morning one adds noise.
  const evening = habits.find((h) => h.period === 'evening')!;
  const morning = habits.find((h) => h.period === 'morning')!;
  const sample = sampleData([evening.slug, morning.slug]);
  await writeSample(sample);

  const start = addDays(today(), -30);
  const read = Object.fromEntries(lessons.slice(0, 9).map((l, i) => [l.slug, addDays(today(), i - 8)]));
  addSampleProgress({
    read,
    quiz: { [lessons[1].slug]: 0, [lessons[2].slug]: 33 },
    habits: Object.fromEntries(Object.entries(sample.habits).map(([slug, done]) => [slug, { since: start, done }])),
  });
}
