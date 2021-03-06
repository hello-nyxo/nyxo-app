import React, { memo, FC } from 'react'
import {
  Animated as Anim,
  Text,
  TextProps,
  Platform,
  TextStyle
} from 'react-native'
import Animated from 'react-native-reanimated'
import translate from '@config/i18n'

interface Props extends TextProps {
  children?: string
  variables?: I18n.TranslateOptions
  style?: TextStyle
  androidTranslation?: string
}

const TranslatedText: FC<Props> = ({
  children,
  variables,
  androidTranslation,
  ...rest
}) => {
  if (androidTranslation && Platform.OS === 'android') {
    return <Text {...rest}>{translate(androidTranslation, variables)}</Text>
  }

  return <Text {...rest}>{translate(children, variables)}</Text>
}

export const AnimatedTranslatedText: FC<Props> = ({
  children,
  variables,
  ...rest
}) => <Anim.Text {...rest}>{translate(children, variables)}</Anim.Text>

export const ReAnimatedTranslatedText: FC<Props> = ({
  children,
  variables,
  ...rest
}) => <Animated.Text {...rest}>{translate(children, variables)}</Animated.Text>

export default memo(TranslatedText)
