import { Image } from 'expo-image';
import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Children, Fragment, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { image } from '@/coaching';

import { Cover } from './cover';
import { color } from './theme';

/** Photo card: the image carries the color, the title sits on its scrim. */
export function PhotoCard({
  href,
  cover,
  title,
  ratio = 16 / 10,
  progress,
  large,
}: {
  href: Href;
  cover?: string;
  title: string;
  ratio?: number;
  /** 0–1, drawn as a thin bar under the title. */
  progress?: number;
  large?: boolean;
}) {
  return (
    <Link href={href} asChild>
      <Pressable className="active:opacity-80">
        <Cover cover={cover} style={{ aspectRatio: ratio, borderRadius: 28, borderCurve: 'continuous' }}>
          <View className="flex-1 justify-end gap-3 p-5">
            <Text className={`font-title text-ink ${large ? 'text-[30px] leading-[36px]' : 'text-[22px] leading-[28px]'}`}>
              {title}
            </Text>
            {progress !== undefined ? (
              <View className="h-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.22)]">
                <View className="h-full rounded-full bg-ink" style={{ width: `${Math.round(progress * 100)}%` }} />
              </View>
            ) : null}
          </View>
        </Cover>
      </Pressable>
    </Link>
  );
}

/** Grouped rows on a surface, with hairline separators. */
export function Group({ children }: { children: ReactNode }) {
  const rows = Children.toArray(children);
  return (
    <View className="overflow-hidden rounded-[28px] bg-surface" style={{ borderCurve: 'continuous' }}>
      {rows.map((row, i) => (
        <Fragment key={i}>
          {i > 0 ? <View className="ml-20 bg-line" style={{ height: StyleSheet.hairlineWidth }} /> : null}
          {row}
        </Fragment>
      ))}
    </View>
  );
}

/** Lesson row: thumbnail, title, and a checkmark once read. */
export function LessonRow({ href, cover, title, done }: { href: Href; cover?: string; title: string; done?: boolean }) {
  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-center gap-4 p-3 pr-4 active:opacity-60">
        <Image
          source={image(cover)}
          style={{ width: 52, height: 52, borderRadius: 14, borderCurve: 'continuous', backgroundColor: color.raised }}
          contentFit="cover"
        />
        <Text className="flex-1 font-ui-strong text-[16px] leading-[21px] text-ink" numberOfLines={2}>
          {title}
        </Text>
        <SymbolView
          name={done ? { ios: 'checkmark.circle.fill', android: 'check_circle' } : { ios: 'chevron.right', android: 'chevron_right' }}
          size={done ? 20 : 13}
          weight="semibold"
          tintColor={done ? color.mint : color.ink3}
        />
      </Pressable>
    </Link>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <Text className="px-1 font-title text-[20px] text-ink">{children}</Text>;
}
