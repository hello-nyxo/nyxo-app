# Nyxo design

Night-first, photography-led, one accent. The original app's best ideas (sleep clock, photo covers, lesson anatomy) in today's iOS idiom.

## What we have to work with

**Contentful** (space used by nyxo.app)

| Content | Count | Use in the app |
| --- | --- | --- |
| Weeks | 5 | Full-bleed cover photo, name, intro line, lesson count |
| Lessons | 38 | Cover photo (all 38), body (89–1228 words, median 362 ≈ 2 min), keywords, author card, references (33) |
| Embedded diagrams | 10 | Sleep stages, sleep pressure vs. internal clock, HRV, heart rate: render inline |
| Habits | 30 | Linked from 25 lessons; period MORNING 6 / AFTERNOON 7 / EVENING 17 |
| Quizzes | 41 | One per lesson; 126 questions (124 multiple choice), scored results |
| Authors | 8 | Avatar, name, credentials (Pietari Nurmi wrote 33 lessons) |
| Lesson `weights` | 30 | Scores for `duration`, `efficiency`, `consistency`, `jetlag`: match lessons to the user's sleep |
| Images | 66 | 57 JPEG, 8 PNG, 1 SVG; 91 MB at source, resized through the Contentful Images API |

Photo caveats: stock photography of uneven tone. Duplicates: candle (Internal Clock, Mind Control), sunset (Time to Wake Up, Earlier Sleep–Wake Cycle), bedroom (Sleep Quality, Pre-sleep Routines), "hello" (week and lesson), crumpled sheets (Do You Sleep Enough, Difficulty Falling Asleep). Off-tone: credit card, burger, cigarettes, basketball. 11 unused assets (galaxy, key and light, wine, alarm clock, …) can replace duplicates in Contentful.

**nyxo.app brand** (`nyxo-website/app/globals.css`)

- Brand blue `#4A5AEF`, deep night `#1a0a4a` / `#0f0a2a`, mint `#4aefd5`
- Sleep: in bed `#7552ef`, asleep `#4a5aef`, bedtime `#4aefd5`, wake-up `#DD956E`
- Time of day: morning `#F5A623`, noon `#4A9AEF`, dusk `#7C5CFC`
- Type: Plus Jakarta Sans (UI), Source Serif 4 (reading)

**Original app** (`legacy/nyxo-1`)

- Signature: circular sleep clock with in-bed and asleep arcs, a mint fall-asleep window with curved text, big center duration
- Week cards: cover photo with dark scrim and intro text; lesson rows: title, author, read time, 60 pt thumbnail
- Lesson: parallax hero, title fades into a blurred header, keyword chips, rich text, habit carousel, references, author card
- Habit periods: sunrise / sun / sunset icons with a period color

Leave behind: Montserrat, grey `#F1F1F1` with 5 px radii, uppercase buttons, Streamline icons and onboarding art (licences unverified), the points gauge, subscription banner.

## Direction

**Color.** One look: night (`userInterfaceStyle: dark`). Night `#0B0820` ground, surfaces one step lighter, brand blue as the single accent, mint only for bedtime, warm `#DD956E` only for wake-up. Tokens live in `src/global.css` (classes) and `src/ui/theme.ts` (props).

**Type.** Plus Jakarta Sans for titles, numbers and controls (`font-ui`, `font-ui-strong`, `font-title`, `font-display`); Source Serif 4 for lesson text at 18/29 (`font-read*`). Fonts are embedded at build time from `assets/fonts`, named by PostScript name so one family name works on both platforms. Never use `font-bold`-style weight classes: each weight is its own family.

**Imagery.** Every photo gets the same treatment (dark bottom scrim, slight indigo tint) so mixed stock reads as one set. Images are resized at sync time and bundled, so the app works offline.

## Screens

**Today** (tab): what to do now.
1. Last night: duration, bedtime to wake-up, a small sleep clock, and heart rate, HRV and steps as icon + number. Opens the night.
2. Habits: today's checklist with the overall streak; before any habit, three suggestions with Start.
3. For you: one lesson picked by `weights` against the weakest metric (`src/coaching/recommend.ts`).

Before access: the Falling Asleep moon cover with one Connect button.

**Trends** (tab): how it's going and why.
1. Average sleep this week, change from last week, 30 nights as bars (5–9 h scale, 8 h line).
2. Schedule: bedtime (mint) to wake-up (warm) for 14 nights.
3. Heart: nightly heart rate and HRV lines.
4. Activity: sleep after active days (at or above median steps) vs. less active days.
5. Habits: sleep with vs. without each tracked habit, with heart rate and HRV differences.
6. Coaching focus: the four program metrics with a status dot.

**Night**: full sleep clock, heart / HRV / resting / steps, stage lanes, heart-rate curve.

**Coaching** (tab): progress and the program.
1. Progress: ring for lessons read, streak, lessons, quizzes passed.
2. Up next (after the first lesson).
3. Habits: one card each with a 4-week waffle, streak and sleep difference.
4. Badges: one per week, a ring filling with lessons read, the week photo lit and sealed when done.
5. Program: week cover cards.

**Habit**: photo hero, mark done today, streak now / best / total, 12-week waffle (weeks as columns), sleep with vs. without, the habit text, its lesson.

**Lesson**: parallax cover → serif body with diagrams → habit (start it, or its 2-week waffle) → quiz → author → references → next lesson.

**Quiz**: one question per screen, haptic on answer, scored result from Contentful.

## Correlations

`src/health/insights.ts` compares averages of nights after days with something (a habit done, more steps) against nights after days without it. A night belongs to the evening it started (`bedDay`). Comparisons need 3+ nights on each side; differences under 10 minutes show in gray. These are associations shown plainly, never causal claims in copy.

## Rules

- No taglines or helper text. Content (lesson titles, week intros, author credentials) is not copy.
- One accent per screen. Photos carry the color.
- Native controls and navigation (`@expo/ui`, Expo Router stacks, NativeTabs); custom drawing only for charts, rings, waffles and the clock.
- Numbers carry the meaning: an icon and a unit instead of a label.
