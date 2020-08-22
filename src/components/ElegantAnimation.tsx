import React, { useState, useEffect, memo } from 'react'
import { Animated, Easing } from 'react-native'

interface ElegantAnimationProps {
  delay: number
  children: any
  style?: any
}

const ElegantAnimation = (props: ElegantAnimationProps) => {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [scaleAnim] = useState(new Animated.Value(0))

  const delay = 30 * parseInt(props.delay, 0)
  const duration = 350

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        delay,
        duration,
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.easeInOutBack
      }),
      Animated.spring(scaleAnim, {
        delay,
        toValue: 1,
        friction: 7,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }}>
      {props.children}
    </Animated.View>
  )
}

export default memo(ElegantAnimation)
