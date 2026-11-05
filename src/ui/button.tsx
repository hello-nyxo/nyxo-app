import { Button, Host, Text } from '@expo/ui';
import { controlSize, frame } from '@expo/ui/swift-ui/modifiers';

import { color, font } from './theme';

const ios = process.env.EXPO_OS === 'ios';

/** The one primary action on a screen: a native, full-width button. */
export function PrimaryButton({ label, onPress, quiet }: { label: string; onPress: () => void; quiet?: boolean }) {
  return (
    <Host matchContents={{ vertical: true }} seedColor={quiet ? color.brandLight : color.brand} style={{ width: '100%' }}>
      <Button
        onPress={onPress}
        variant={quiet ? 'text' : 'filled'}
        style={ios ? undefined : { width: '100%', height: 54 }}
        modifiers={ios ? [controlSize('large')] : undefined}>
        {/* SwiftUI sizes the capsule to its label, so the label takes the full width. */}
        <Text
          textStyle={{ fontFamily: font.title, fontSize: 17, textAlign: 'center', color: quiet ? color.brandLight : color.ink }}
          modifiers={ios ? [frame({ maxWidth: 10000 })] : undefined}>
          {label}
        </Text>
      </Button>
    </Host>
  );
}
