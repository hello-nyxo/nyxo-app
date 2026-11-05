import type { NativeStackNavigationOptions } from 'expo-router';

import { color, font } from './theme';

/** Large titles that collapse into a glass bar on iOS; a flat night bar on Android. */
export const stackOptions: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerTransparent: process.env.EXPO_OS === 'ios',
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal',
  headerTintColor: color.ink,
  headerTitleStyle: { fontFamily: font.strong, color: color.ink },
  headerLargeTitleStyle: { fontFamily: font.display, color: color.ink },
  contentStyle: { backgroundColor: color.night },
};

/** Screens that open on a photo: the header floats over it. */
export const photoOptions: NativeStackNavigationOptions = {
  headerLargeTitle: false,
  headerTransparent: true,
  title: '',
};
