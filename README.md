# Nyxo App

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

##

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
