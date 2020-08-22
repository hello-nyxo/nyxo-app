import React, { memo } from 'react'
import { Animated as Anim, Text, TextProps, Platform } from 'react-native'
import Animated from 'react-native-reanimated'
import translate from '../config/i18n'

interface Props extends TextProps {
  children: string
  variables?: any
  style?: any
  androidTranslation?: string
}

const TranslatedText = (props: Props) => {
  const { children, variables, androidTranslation } = props

  if (androidTranslation && Platform.OS === 'android') {
    return <Text {...props}>{translate(androidTranslation, variables)}</Text>
  }

  return <Text {...props}>{translate(children, variables)}</Text>
}

export const AnimatedTranslatedText: React.SFC<Props> = (props: Props) => (
  <Anim.Text {...props}>{translate(props.children, props.variables)}</Anim.Text>
)

export const ReAnimatedTranslatedText: React.SFC<Props> = (props: Props) => (
  <Animated.Text {...props}>
    {translate(props.children, props.variables)}
  </Animated.Text>
)

export default memo(TranslatedText)
