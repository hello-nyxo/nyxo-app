# Nyxo

One purpose: help people sleep better. Three tabs: **Today** (last night, today's habits), **Trends** (sleep, heart, activity and habits over time) and **Coaching** (the nyxo.app program, progress, habits). Data from Apple Health / Health Connect. iOS first; Android must work too.

## Conventions

- Read `DESIGN.md` before changing UI. One look: night.
- Style with NativeWind `className` on core `react-native` components (Tailwind v4, tokens in `src/global.css`: `bg-night`, `bg-surface`, `text-ink`, `text-ink-2`, `font-title`, `font-read`, …). Library components (Reanimated `Animated.*`, expo-image) don't take `className`; use `style` and `src/ui/theme.ts`. No `/opacity` color modifiers and no `leading-N` scale classes: use `bg-[rgba(...)]` and `leading-[Npx]`. 1rem = 16pt.
- Use `@expo/ui` (universal API) for native controls such as buttons; `expo-symbols` for icons (`{ ios, android }` names).
- Health access goes through `src/health/source.<platform>.ts`, which implement `HealthSource` in `src/health/types.ts`. Screens read `useHealth()` only. Keep `night.ts`, `insights.ts`, `sample-data.ts`, `coaching/stats.ts` and `coaching/recommend.ts` pure and tested.
- Coaching progress (lessons read, quiz scores, habits and their done days) lives in `src/coaching/progress.ts`, on device. Days are local `YYYY-MM-DD` keys from `src/lib/days.ts`.
- Development builds have an Add sample data button on Today: 30 deterministic nights with heart rate, HRV, steps and two habits whose effects are built in (`src/sample.ts`).
- Coaching content is generated: edit it in Contentful, then `npm run sync-content`. It rewrites `src/coaching/content.json`, `src/coaching/images.ts` and `assets/coaching/`. Never hand-edit those.
- Copy: no taglines, helper text or secondary labels. If a screen needs them to make sense, fix the layout.
- Run `npm run lint`, `npm run typecheck` and `npm test` before calling a change done.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
