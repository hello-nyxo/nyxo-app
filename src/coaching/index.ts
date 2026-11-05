import content from './content.json';
import { images } from './images';

/** Generated from Contentful by `npm run sync-content`. */
export type Span = { text: string; bold?: boolean; italic?: boolean; href?: string };
export type Block =
  | { type: 'h' | 'p'; spans: Span[] }
  | { type: 'li'; n?: number; spans: Span[] }
  | { type: 'img'; image: string; ratio: number };
export type Period = 'morning' | 'afternoon' | 'evening';
export type Habit = { slug: string; title: string; period: Period; blocks: Block[] };
export type Answer = { text: string; score: number };
export type Quiz = {
  questions: { text: string; answers: Answer[] }[];
  results: { min: number; max: number; title: string; blocks: Block[] }[];
};
export type Metric = 'duration' | 'efficiency' | 'consistency' | 'jetlag';
export type Lesson = {
  slug: string;
  title: string;
  week: string;
  cover?: string;
  author?: string;
  blocks: Block[];
  habit?: Habit;
  quiz?: Quiz;
  references?: Block[];
  weights?: Record<Metric, number>;
};
export type Week = { slug: string; title: string; intro: string; cover?: string; lessons: string[] };
export type Author = { name: string; credentials?: string; avatar?: string };

export const weeks = content.weeks as Week[];
export const lessons = content.lessons as Lesson[];
export const authors = content.authors as Record<string, Author>;

const lessonBySlug = new Map(lessons.map((l) => [l.slug, l]));
const weekBySlug = new Map(weeks.map((w) => [w.slug, w]));

export const lesson = (slug: string) => lessonBySlug.get(slug);
export const week = (slug: string) => weekBySlug.get(slug);
export const next = (l: Lesson) => lessons[lessons.indexOf(l) + 1];
export const image = (key?: string) => (key ? images[key] : undefined);

/** Every habit once, in program order, with the lesson that introduces it. */
export const habits = [...new Map(lessons.flatMap((l) => (l.habit ? [[l.habit.slug, { ...l.habit, lesson: l.slug }] as const] : []))).values()];
const habitBySlug = new Map(habits.map((h) => [h.slug, h]));
export const habit = (slug: string) => habitBySlug.get(slug);
