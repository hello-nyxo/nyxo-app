import React, { useState, useEffect, useRef } from 'react'
import { View, Image, Dimensions } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { withNavigationFocus } from 'react-navigation'

import MaskedView from '@react-native-community/masked-view'

const { height, width } = Dimensions.get('window')

interface AnimateDisplayProps {
  children: any
  navigation: {
    isFocused: () => boolean
  }
}

const AnimateDisplay = (props: AnimateDisplayProps) => {
  const [scaleValue, setScale] = useState(new Animated.Value(1))
  const [scaleChild, setScaleChild] = useState(new Animated.Value(1))
  const [capturedView, captureView] = useState(
    require('../../assets/testScreen.png')
  )

  const animateScale = () => {
    Animated.timing(
      // Animate over time
      scaleValue, // The animated value to drive
      {
        easing: Easing.inOut(Easing.ease),
        toValue: 200, // Animate to opacity: 1 (opaque)
        duration: 250 // Make it take a while
      }
    ).start()
  }

  const animateChild = () => {
    Animated.timing(
      // Animate over time
      scaleChild, // The animated value to drive
      {
        easing: Easing.inOut(Easing.ease),
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 250 // Make it take a while
      }
    ).start()
  }

  useEffect(() => {
    if (props.navigation.isFocused()) {
      animateScale()
      animateChild()
    } else {
      setScale(new Animated.Value(1))
      setScaleChild(new Animated.Value(0))
    }
  }, [props.navigation.isFocused()])

  // const scaleOut = scaleValue.interpolate({
  // 	inputRange: [0, 1],
  // 	outputRange: [1, 20],
  // });

  // const scaleIn = scaleValue.interpolate({
  // 	inputRange: [0, 1],
  // 	outputRange: [20, 1],
  // });

  return (
    <View
      style={{
        flex: 1,
        height,
        width,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
      }}>
      <Image
        source={capturedView}
        resizeMode="cover"
        height={height}
        width={width}
        style={{
          flex: 1,
          backgroundColor: 'green',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1,
          height,
          width
        }}
      />
      <MaskedView
        style={{
          flex: 1,
          zIndex: 2,
          flexDirection: 'row',
          height: '100%'
        }}
        maskElement={
          <Animated.View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                transform: [{ scale: scaleValue }],
                height: 10,
                width: 10,
                borderRadius: 100
              }}
            />
          </Animated.View>
        }>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
            // transform: [{ scale: scaleChild }],
          }}>
          {props.children}
        </Animated.View>
      </MaskedView>
    </View>
  )
}

export default withNavigationFocus(AnimateDisplay)
