import { lesson, lessons, weeks } from '.';
import { best, result, score } from './quiz';
import { metrics, problems, recommend } from './recommend';
import { longest, streak } from './stats';
import type { Night } from '@/health/night';

const H = 3600 * 1000;
const night = (day: number, bedHour: number, hours: number): Night => {
  const start = new Date(2026, 10, day, bedHour, 0).getTime();
  return { id: String(start), start, end: start + hours * H, asleep: hours * H * 0.95, segments: [] };
};

describe('content', () => {
  it('has the program in order', () => {
    expect(weeks.map((w) => w.title)).toEqual([
      'Introduction',
      'Understanding Your Sleep',
      'Falling Asleep',
      'Waking Up',
      'Sleep & Healthy Lifestyle',
    ]);
  });

  it('gives every lesson a unique slug, a cover and some text', () => {
    expect(new Set(lessons.map((l) => l.slug)).size).toBe(lessons.length);
    for (const l of lessons) {
      expect(l.blocks.length).toBeGreaterThan(0);
      expect(l.cover).toBeDefined();
    }
    expect(lesson(lessons[0].slug)).toBe(lessons[0]);
  });
});

describe('quiz', () => {
  const quiz = lessons.find((l) => l.quiz)!.quiz!;

  it('scores the best answers as the best result', () => {
    const answers = quiz.questions.map((q) => best(q.answers));
    expect(score(answers)).toBe(0);
    expect(result(quiz, 0)).toBe([...quiz.results].sort((a, b) => a.min - b.min)[0]);
  });

  it('finds a result for scores that fall between ranges', () => {
    expect(result(quiz, 33.4)).toBeDefined();
  });
});

describe('recommend', () => {
  it('flags short nights', () => {
    const short = Array.from({ length: 7 }, (_, i) => night(1 + i, 23, 5));
    expect(problems(short).duration).toBeGreaterThan(0.8);
    expect(problems(short).consistency).toBe(0);
  });

  it('flags irregular bedtimes across midnight', () => {
    const irregular = [21, 1, 23, 2, 22, 0, 3].map((h, i) => night(1 + i, h, 8));
    expect(problems(irregular).consistency).toBeGreaterThan(0.5);
  });

  it('picks an unread lesson about the weakest metric', () => {
    const short = Array.from({ length: 7 }, (_, i) => night(1 + i, 23, 5));
    const pick = recommend(short, lessons, {})!;
    const top = Math.max(...lessons.filter((l) => l.weights).map((l) => l.weights!.duration));
    expect(pick.weights!.duration).toBeGreaterThan(top * 0.5);
    expect(recommend(short, lessons, { [pick.slug]: '2026-11-05' })!.slug).not.toBe(pick.slug);
  });
});

describe('metrics', () => {
  it('reports the raw values behind the problems', () => {
    const nights = Array.from({ length: 7 }, (_, i) => night(1 + i, 23, 8));
    const m = metrics(nights)!;
    expect(m.duration).toBeCloseTo(8 * H * 0.95);
    expect(m.consistency).toBe(0);
  });
});

describe('streaks', () => {
  const now = new Date(2026, 10, 5, 12);

  it('counts back from today, or from yesterday when today is not done yet', () => {
    expect(streak(['2026-11-03', '2026-11-04', '2026-11-05'], now)).toBe(3);
    expect(streak(['2026-11-03', '2026-11-04'], now)).toBe(2);
    expect(streak(['2026-11-02', '2026-11-03'], now)).toBe(0);
  });

  it('finds the longest run', () => {
    expect(longest(['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-10', '2026-10-31', '2026-11-01'])).toBe(3);
  });
});
