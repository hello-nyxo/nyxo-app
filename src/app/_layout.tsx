import '@/global.css';

import { DarkTheme, ThemeProvider } from 'expo-router';
import { NativeTabs } from 'expo-router/native-tabs';

import { color } from '@/ui/theme';

const night = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: color.night, card: color.night, text: color.ink, primary: color.brandLight, border: color.line },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={night}>
      <NativeTabs tintColor={color.brandLight} backgroundColor={color.night} indicatorColor={color.raised}>
        <NativeTabs.Trigger name="(today)">
          <NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="moon.zzz.fill" md="bedtime" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="trends">
          <NativeTabs.Trigger.Label>Trends</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="chart.bar.xaxis" md="bar_chart" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="coaching">
          <NativeTabs.Trigger.Label>Coaching</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="book.pages.fill" md="menu_book" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
