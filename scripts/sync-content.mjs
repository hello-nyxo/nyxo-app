// Pulls the coaching program from Contentful into the app:
//   src/coaching/content.json   weeks, lessons, authors (text and structure)
//   src/coaching/images.ts      require() map for bundled images
//   assets/coaching/*.jpg|png   images, resized by the Contentful Images API
// Usage: CONTENTFUL_SPACE_ID=… CONTENTFUL_ACCESS_TOKEN=… npm run sync-content
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';

const { CONTENTFUL_SPACE_ID: space, CONTENTFUL_ACCESS_TOKEN: token } = process.env;
if (!space || !token) {
  console.error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.');
  process.exit(1);
}

const root = new URL('../', import.meta.url);
const imageDir = new URL('assets/coaching/', root);

async function entries(contentType) {
  const url = `https://cdn.contentful.com/spaces/${space}/environments/master/entries?content_type=${contentType}&locale=en-US&limit=1000`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`${contentType}: ${res.status} ${await res.text()}`);
  return (await res.json()).items;
}

async function assets() {
  const url = `https://cdn.contentful.com/spaces/${space}/environments/master/assets?locale=en-US&limit=1000`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  return new Map((await res.json()).items.map((a) => [a.sys.id, a]));
}

const byId = (items) => new Map(items.map((i) => [i.sys.id, i]));
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

// --- Images -----------------------------------------------------------------

const [assetById, weeks, lessons, authors, habits, questionnaires, questions, answers, results] = await Promise.all([
  assets(),
  entries('coachingWeek'),
  entries('lesson'),
  entries('author'),
  entries('habit'),
  entries('questionnaire'),
  entries('question'),
  entries('answer'),
  entries('result'),
]);

const sizes = {
  cover: 'w=1200&h=800&fit=fill&f=center&fm=jpg&q=72&fl=progressive',
  avatar: 'w=160&h=160&fit=thumb&f=face&fm=jpg&q=80',
  diagram: 'w=1000&fm=png',
};
const images = new Map(); // key -> { file, url }

/** Registers an image for download and returns its key, or undefined. */
function image(link, size) {
  const asset = link && assetById.get(link.sys.id);
  const file = asset?.fields.file;
  if (!file || file.contentType === 'image/svg+xml') return undefined;
  const ext = size === 'diagram' ? 'png' : 'jpg';
  const key = `${size}-${slugify(asset.fields.title ?? asset.sys.id)}-${asset.sys.id.slice(0, 4).toLowerCase()}`;
  images.set(key, { file: `${key}.${ext}`, url: `https:${file.url}?${sizes[size]}` });
  return key;
}

// --- Rich text ----------------------------------------------------------------

function spans(node, href) {
  if (node.nodeType === 'text') {
    if (!node.value) return [];
    const span = { text: node.value };
    for (const m of node.marks ?? []) if (m.type === 'bold' || m.type === 'italic') span[m.type] = true;
    if (href) span.href = href;
    return [span];
  }
  const link = node.nodeType === 'hyperlink' ? node.data.uri : href;
  return (node.content ?? []).flatMap((child) => spans(child, link));
}

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const isBlank = (s) => s.every((span) => !span.text.trim());

/** Rich text -> flat blocks: h, p, li (ordered items carry n), img. */
function blocks(doc) {
  const result = [];
  for (const node of doc?.content ?? []) {
    const type = node.nodeType;
    if (type.startsWith('heading-') || type === 'paragraph' || type === 'blockquote') {
      const s = spans(node);
      if (!isBlank(s)) result.push({ type: type.startsWith('heading-') ? 'h' : 'p', spans: s });
    } else if (type === 'unordered-list' || type === 'ordered-list') {
      node.content.forEach((item, i) => {
        const s = spans(item);
        if (isBlank(s)) return;
        result.push(type === 'ordered-list' ? { type: 'li', n: i + 1, spans: s } : { type: 'li', spans: s });
      });
    } else if (type === 'embedded-asset-block') {
      const asset = assetById.get(node.data.target.sys.id);
      const key = image(node.data.target, 'diagram');
      const { width, height } = asset?.fields.file.details.image ?? {};
      if (key && width && height) result.push({ type: 'img', image: key, ratio: +(width / height).toFixed(3) });
    }
  }
  return result;
}

// --- Content ------------------------------------------------------------------

const lessonById = byId(lessons);
const authorById = byId(authors);
const habitById = byId(habits);
const questionById = byId(questions);
const answerById = byId(answers);
const resultById = byId(results);
const questionnaireById = byId(questionnaires);

const authorOut = {};
function author(lesson) {
  const a = authorById.get(lesson.fields.authorCard?.[0]?.sys.id);
  if (!a) return undefined;
  authorOut[a.fields.slug] ??= {
    name: a.fields.name,
    credentials: a.fields.credentials,
    avatar: image(a.fields.avatar, 'avatar'),
  };
  return a.fields.slug;
}

function habit(lesson) {
  const h = habitById.get(lesson.fields.habit?.[0]?.sys.id);
  if (!h) return undefined;
  return { slug: h.fields.slug, title: h.fields.title.trim(), period: h.fields.period.toLowerCase(), blocks: blocks(h.fields.description) };
}

// Answers score 0 (best) to 100; the average picks a result by range.
function quiz(lesson) {
  const q = questionnaireById.get(lesson.fields.questionnaire?.sys.id);
  if (!q) return undefined;
  const qs = (q.fields.questions ?? [])
    .map((l) => questionById.get(l.sys.id))
    .filter((x) => x?.fields.type === 'Select' && x.fields.question)
    .map((x) => ({
      text: x.fields.question.trim(),
      answers: (x.fields.answers ?? [])
        .map((l) => answerById.get(l.sys.id))
        .filter(Boolean)
        .map((a) => ({ text: a.fields.title.trim(), score: a.fields.score ?? 0 }))
        // Contentful lists the best answer first; a stable shuffle keeps diffs quiet.
        .sort((a, b) => hash(a.text) - hash(b.text)),
    }))
    .filter((x) => x.answers.length > 1);
  const rs = (q.fields.results ?? [])
    .map((l) => resultById.get(l.sys.id))
    .filter(Boolean)
    .map((r) => ({ min: r.fields.scoreRange.lowEnd, max: r.fields.scoreRange.highEnd, title: r.fields.title, blocks: blocks(r.fields.description) }));
  return qs.length ? { questions: qs, results: rs } : undefined;
}

const ordered = weeks.sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0));
const lessonOut = [];
const weekOut = ordered.map((week) => {
  const own = (week.fields.lessons ?? []).map((l) => lessonById.get(l.sys.id)).filter(Boolean);
  for (const l of own) {
    const f = l.fields;
    lessonOut.push({
      slug: f.slug,
      title: f.lessonName.trim(),
      week: week.fields.slug,
      cover: image(f.cover, 'cover'),
      author: author(l),
      blocks: blocks(f.lessonContent),
      habit: habit(l),
      quiz: quiz(l),
      references: blocks(f.additionalInformation),
      weights: f.weights,
    });
  }
  return {
    slug: week.fields.slug,
    title: week.fields.weekName,
    intro: week.fields.intro,
    cover: image(week.fields.coverPhoto, 'cover'),
    lessons: own.map((l) => l.fields.slug),
  };
});

// --- Write --------------------------------------------------------------------

rmSync(imageDir, { recursive: true, force: true });
mkdirSync(imageDir, { recursive: true });
for (const [, { file, url }] of images) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  writeFileSync(new URL(file, imageDir), Buffer.from(await res.arrayBuffer()));
}

const json = (v) => JSON.stringify(v, (k, x) => (x === undefined || (Array.isArray(x) && !x.length && k === 'references') ? undefined : x), 1);
writeFileSync(new URL('src/coaching/content.json', root), json({ weeks: weekOut, lessons: lessonOut, authors: authorOut }) + '\n');
writeFileSync(
  new URL('src/coaching/images.ts', root),
  '// Generated by `npm run sync-content`. Do not edit.\n' +
    'export const images: Record<string, number> = {\n' +
    [...images].map(([key, { file }]) => `  '${key}': require('../../assets/coaching/${file}'),`).join('\n') +
    '\n};\n',
);

console.log(`Wrote ${weekOut.length} weeks, ${lessonOut.length} lessons, ${images.size} images.`);
