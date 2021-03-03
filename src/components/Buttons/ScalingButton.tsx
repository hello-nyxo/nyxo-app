import Analytics from 'appcenter-analytics'
import React, { FC, memo, ReactNode, useRef } from 'react'
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback
} from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import styled from 'styled-components/native'

type Props = {
  onPress: (event: GestureResponderEvent) => void
  analyticsEvent: string
  disabled?: boolean
  children: ReactNode
}

const ScalingButton: FC<Props> = ({
  analyticsEvent,
  children,
  onPress,
  disabled
}) => {
  const scaleIn = useRef(new Animated.Value(0)).current

  const pressIn = () => {
    scaleIn.setValue(0)
    Animated.timing(scaleIn, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  const pressOut = () => {
    scaleIn.setValue(1)
    Animated.timing(scaleIn, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  const handlePress = (event: GestureResponderEvent) => {
    Analytics.trackEvent('Button pressed', {
      buttonType: analyticsEvent
    })
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: true
    })

    onPress(event)
  }

  const transform = (animated: Animated.Value) => {
    const interpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95]
    })

    return {
      transform: [{ scale: interpolation }]
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      disabled={disabled}
      onPressIn={pressIn}
      onPressOut={pressOut}>
      <Button style={transform(scaleIn)}>{children}</Button>
    </TouchableWithoutFeedback>
  )
}

const Button = styled(Animated.View)``

export default memo(ScalingButton)
