import type { Answer, Quiz } from '.';

/** Average of the chosen answers' scores: 0 is best, 100 worst. */
export const score = (chosen: Answer[]) => chosen.reduce((s, a) => s + a.score, 0) / (chosen.length || 1);

/** The best answer to a question (lowest score). */
export const best = (answers: Answer[]) => answers.reduce((a, b) => (b.score < a.score ? b : a));

/** The Contentful result whose range holds the score; ranges can leave gaps (33–34), so take the first that fits. */
export const result = (quiz: Quiz, value: number) =>
  [...quiz.results].sort((a, b) => a.min - b.min).find((r) => value <= r.max) ?? quiz.results.at(-1);
