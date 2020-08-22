import React, { memo, useEffect, useState } from 'react'
import { Dimensions, Animated } from 'react-native'
import Svg, {
  Rect,
  ClipPath,
  Stop,
  LinearGradient,
  Defs
} from 'react-native-svg'

const { width } = Dimensions.get('window')

const animatedValue = new Animated.Value(0)

const SkeletonContent = () => {
  const setAnimation = () => {
    // Turn in seconds to keep compatible with web one
    const durInSeconds = 1000

    Animated.timing(animatedValue, {
      toValue: 2,
      delay: durInSeconds,
      duration: durInSeconds,
      useNativeDriver: true
    }).start(() => {
      animatedValue.setValue(-1)
      setAnimation()
    })
  }
  const height = 250
  const contentWidth = width - 40
  const [offset, setOffset] = useState(-1)

  useEffect(() => {
    setAnimation()
    const ani = animatedValue.addListener(({ value }: any) => {
      setOffset(value)
    })
  }, [])

  const offset1 = offsetValueBound(offset - 1)
  const offset2 = offsetValueBound(offset)
  const offset3 = offsetValueBound(offset + 1)

  return (
    <Svg
      style={{ marginHorizontal: 20, marginTop: 30, width: width - 40 }}
      height={height}>
      <Rect
        x="0"
        y="0"
        width={contentWidth}
        height={height}
        fill="url(#gradient)"
        clipPath="url(#clipPath)"
      />

      <Defs>
        <ClipPath id="clipPath">
          <Rect x={0} y={0} width="100%" height={15} fill="#CACACA" rx="2" />
          <Rect x={0} y={5} width="100%" height={15} fill="#CACACA" rx="2" />
          <Rect x={0} y={30} width="100%" height={15} fill="#b9b2b2" rx="2" />
          <Rect x={0} y={60} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={90} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={120} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={150} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={180} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={210} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={240} width="100%" height={15} fill="red" rx="2" />
          <Rect x={0} y={270} width="100%" height={15} fill="red" rx="2" />
        </ClipPath>
        <LinearGradient id="gradient" x1="-100%" y1={0} x2="100%" y2={0}>
          <Stop offset={offset1} stopColor="#f0f0f0" />
          <Stop offset={offset2} stopColor="#e0e0e0" />
          <Stop offset={offset3} stopColor="#f0f0f0" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default memo(SkeletonContent)

const offsetValueBound = (value: number): number => {
  if (value > 1) {
    return 1
  }

  if (value < 0) {
    return 0
  }

  return value
}
