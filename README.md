![Nyxo App](https://github.com/hello-nyxo/nyxo-website/blob/master/static/images/cover.png)
---
<p align="center">
<h1 align=center>Nyxo App – Better Sleep 💤💤💤<h1/>
</p>
<p align="center">
  <a href="https://apps.apple.com/us/app/nyxo-sleep-coaching/id1440417031">Download iOS</a> • <a href="https://play.google.com/store/apps/details?id=fi.nyxo.app">Download Android</a> • <a href="mailto:hello+github@nyxo.fi">Contact</a> • <a href="http://eepurl.com/g-0zKD">Nyxo Newsletter</a>
<br><br>
</p>
---

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![commit activity](https://img.shields.io/github/commit-activity/w/hello-nyxo/nyxo-app)
![release](https://img.shields.io/github/v/release/hello-nyxo/nyxo-app)
![license](https://img.shields.io/github/license/hello-nyxo/nyxo-app)

## What is Nyxo App
Nyxo is a mobile application for improving your sleep. Its built with React Native, AWS Amplify, styled-components, and Redux. Nyxo provides the following features:
- Sleep tracking, with support for multiple different trackers
  - Google Fit
  - Apple Health
  - Oura
  - Withings
  - Fitbit
  - Polar
- Sleep trends and sleep diary
- Nyxo Cloud: backup your sleep data and coaching progress, and access it from [nyxo.app](https://nyxo.app)
- 4 week sleep coaching program
- Ask experts, if you have any questions we have the professional sleep coaches to help
- And more

The plan is to develop Nyxo further and allow contributions from everyone. If you want to for example build a new sleep visualization or add support for new sleep tracker, we will gladly welcome a pull request of that :)


## Getting started

_Clone repository_

```shell
git clone
cd nyxo-app
yarn
```

### Setting up enviroment variables

Nyxo configurations keys are placed in config.ts file, which then references the requirement enviroment variables from local `.env`file.

## Troubleshooting

#### main.jsbundle missing

Run command `react-native bundle --entry-file index.js --platform ios --dev=false --bundle-output ios/main.jsbundle --assets-dest ios` for iOS
Run command `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/` for Android

## When you get a weird Xcode error about undefined symbols

If you see something like this:

`Undefined symbols for architecture x86_64: "_OBJC_CLASS_$_RCTReconnectingWebSocket", referenced from: objc-class-ref in libReact.a(RCTPackagerConnection.o) ld: symbol(s) not found for architecture x86_64 clang: error: linker command failed with exit code 1 (use -v to see invocation)`

Delete your Derived data

## Resetting bundlers etc.

1. Clear watchman watches: `watchman watch-del-all`.
2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.
