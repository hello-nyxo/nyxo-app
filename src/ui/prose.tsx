import { Image } from 'expo-image';
import { openBrowserAsync } from 'expo-web-browser';
import { Text, View } from 'react-native';

import { image, type Block, type Span } from '@/coaching';

function Spans({ spans }: { spans: Span[] }) {
  return spans.map((s, i) => (
    <Text
      key={i}
      className={s.bold ? 'font-read-strong text-ink' : s.italic ? 'font-read-italic' : undefined}
      style={s.href ? { textDecorationLine: 'underline' } : undefined}
      onPress={s.href ? () => openBrowserAsync(s.href!) : undefined}>
      {s.text}
    </Text>
  ));
}

const BODY = {
  read: 'font-read text-[18px] leading-[29px] text-ink-2',
  small: 'font-read text-[16px] leading-[25px] text-ink-2',
};

/** Rich text from Contentful: serif body, sans headings, diagrams on white cards. */
export function Prose({ blocks, size = 'read' }: { blocks: Block[]; size?: keyof typeof BODY }) {
  const body = BODY[size];
  return (
    <View className="gap-5">
      {blocks.map((b, i) => {
        if (b.type === 'img')
          return (
            <View key={i} className="overflow-hidden rounded-3xl bg-white p-3" style={{ borderCurve: 'continuous' }}>
              <Image source={image(b.image)} style={{ width: '100%', aspectRatio: b.ratio }} contentFit="contain" />
            </View>
          );
        if (b.type === 'h')
          return (
            <Text key={i} className="pt-3 font-title text-[22px] leading-[28px] text-ink" accessibilityRole="header">
              <Spans spans={b.spans} />
            </Text>
          );
        if (b.type === 'li')
          return (
            <View key={i} className="flex-row gap-3">
              <Text className={`${body} w-5 text-ink-3`}>{b.n ? `${b.n}.` : '•'}</Text>
              <Text className={`${body} flex-1`} selectable>
                <Spans spans={b.spans} />
              </Text>
            </View>
          );
        return (
          <Text key={i} className={body} selectable>
            <Spans spans={b.spans} />
          </Text>
        );
      })}
    </View>
  );
}
