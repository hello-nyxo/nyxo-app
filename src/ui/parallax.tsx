import { Stack } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { Cover } from './cover';
import { color } from './theme';

const PHI = 1.618;

/**
 * A screen that opens on a full-bleed photo. The photo drifts and stretches with the scroll,
 * and the title moves into the header once the photo is gone.
 */
export function ParallaxScreen({
  cover,
  title,
  hero,
  children,
  onEnd,
}: {
  cover?: string;
  title: string;
  /** Drawn on the photo's scrim, usually the title. */
  hero: ReactNode;
  children: ReactNode;
  /** Called once the reader reaches the bottom. */
  onEnd?: () => void;
}) {
  const { height: screen } = useWindowDimensions();
  const height = Math.round(screen * (1 - 1 / PHI));
  const y = useSharedValue(0);
  const past = useSharedValue(false);
  const ended = useSharedValue(false);
  const [titled, setTitled] = useState(false);

  // Crosses to JS only when the title state flips or the end is first reached.
  const onScroll = useAnimatedScrollHandler((e) => {
    y.value = e.contentOffset.y;
    const isPast = e.contentOffset.y > height - 100;
    if (isPast !== past.value) {
      past.value = isPast;
      scheduleOnRN(setTitled, isPast);
    }
    if (onEnd && !ended.value && e.layoutMeasurement.height + e.contentOffset.y >= e.contentSize.height - 80) {
      ended.value = true;
      scheduleOnRN(onEnd);
    }
  });

  const photo = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(y.value, [-height, 0, height], [-height / 2, 0, height * 0.4]) },
      { scale: interpolate(y.value, [-height, 0], [2, 1], 'clamp') },
    ],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: color.night }}>
      {/* iOS draws a glass bar over the content by itself; Android needs a solid one. */}
      <Stack.Screen
        options={{
          title: titled ? title : '',
          headerStyle: { backgroundColor: titled && process.env.EXPO_OS === 'android' ? color.night : 'transparent' },
        }}
      />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, h) => {
          if (onEnd && h <= screen) onEnd();
        }}>
        <Animated.View style={[{ height }, photo]}>
          <Cover cover={cover} style={{ flex: 1 }}>
            <View className="flex-1 justify-end px-5 pb-6">{hero}</View>
          </Cover>
        </Animated.View>
        <View style={{ backgroundColor: color.night, paddingBottom: 48 }}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}
