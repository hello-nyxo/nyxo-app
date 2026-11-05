![Nyxo App](https://github.com/hello-nyxo/nyxo-website/blob/master/static/images/cover.png)

<h1 align=center>Nyxo App – Better Sleep 💤💤💤</h1>

![license](https://img.shields.io/github/license/hello-nyxo/nyxo-app)

Nyxo is a mobile app for improving your sleep. This is the relaunch codebase (Nyxo 2.0), rebuilt from scratch on:

- React Native 0.70 with TypeScript
- [Tamagui](https://tamagui.dev) and styled-components for UI
- TanStack Query for data fetching
- MMKV for local storage
- Apple HealthKit for sleep and heart-rate data

## Looking for the original app?

The original Nyxo app (React Native 0.64, AWS Amplify, Redux, coaching content, Fitbit/Oura/Garmin/Polar/Withings integrations) lives on the [`legacy/nyxo-1`](https://github.com/hello-nyxo/nyxo-app/tree/legacy/nyxo-1) branch. Full history is preserved in this repo as well.

## Getting started

Requirements: Node 16 (see `.node-version`), Yarn, Xcode + CocoaPods for iOS, Android Studio for Android.

```bash
yarn install
cd ios && bundle install && bundle exec pod install && cd ..
yarn start
yarn ios      # or: yarn android
```

## Scripts

| Command | Description |
| --- | --- |
| `yarn start` | Start Metro (with `TAMAGUI_TARGET=native`) |
| `yarn ios` / `yarn android` | Build and run on simulator/device |
| `yarn lint` | ESLint |
| `yarn test` | Jest |

## License

See [LICENSE.md](LICENSE.md).
