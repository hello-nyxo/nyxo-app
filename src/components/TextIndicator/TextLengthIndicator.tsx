import React, { FC } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import colors from '../../styles/colors'

type Props = {
  radius: number
  percentage: number
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const TextLengthIndicator: FC<Props> = ({ radius, percentage }) => {
  const circumference = returnCircumference(radius)
  const progress = returnProgress(percentage, circumference)

  return (
    <Svg height="25" width="25" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r={radius}
        stroke={colors.gray}
        strokeWidth="8"
        fill="transparent"
      />

      <AnimatedCircle
        cx="-50"
        cy="50"
        r={radius}
        stroke="blue"
        strokeWidth="8"
        fill="transparent"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={`${progress}`}
        rotation={-90}
      />
    </Svg>
  )
}

const returnCircumference = (radius: number) => {
  return radius * 2 * Math.PI
}

const returnProgress = (percentage: number, circumference: number) => {
  return circumference - percentage * circumference
}
