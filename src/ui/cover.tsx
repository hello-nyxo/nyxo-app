import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { image } from '@/coaching';

import { color } from './theme';

/**
 * A Contentful photo with Nyxo's treatment: a faint indigo tint and a dark bottom scrim,
 * so mixed stock photography reads as one set and text on it stays legible.
 */
export function Cover({ cover, children, style }: { cover?: string; children?: ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ overflow: 'hidden', backgroundColor: color.raised }, style]}>
      <Image source={image(cover)} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(40,30,120,0.18)' }]} />
      <LinearGradient
        colors={['rgba(11,8,32,0)', 'rgba(11,8,32,0.35)', 'rgba(11,8,32,0.92)']}
        locations={[0.25, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}
