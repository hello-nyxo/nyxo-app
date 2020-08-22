import * as React from 'react'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Analytics from 'appcenter-analytics'
import {
  GestureResponderEvent,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
import styled from 'styled-components/native'
import Intercom from 'react-native-intercom'

interface ScalingButtonProps {
  onPress: (event: GestureResponderEvent) => void
  analyticsEvent: string
  disabled?: boolean
  children: React.ReactNode
  noDefaultStyles?: boolean
  styles?: any
}

const ScalingButton = (props: ScalingButtonProps) => {
  const scaleValue = new Animated.Value(0)
  const [isPressed, setPressed] = React.useState(false)

  const scale = () => {
    scaleValue.setValue(0)
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 60,
      bounciness: 25
    }).start()
  }

  const onPressIn = () => {
    scale()
  }

  const onPress = (event: any) => {
    Analytics.trackEvent('Button pressed', {
      buttonType: props.analyticsEvent
    })
    Intercom.logEvent('Button pressed', {
      buttonType: props.analyticsEvent
    })
    setPressed(true)
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true
    })

    props.onPress(event)
  }

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true
    }).start()

    setPressed(false)
  }

  const buttonScaleIn = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9]
  })

  const buttonScaleOut = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1]
  })

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={props.disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...props}>
      <Button
        style={{
          transform: [{ scale: isPressed ? buttonScaleOut : buttonScaleIn }]
        }}>
        {props.children}
      </Button>
    </TouchableWithoutFeedback>
  )
}

const Button = styled(Animated.View)``

export default React.memo(ScalingButton)
