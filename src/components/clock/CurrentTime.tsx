import React from 'react'
import { Circle } from 'react-native-svg'
import { polarToCartesian } from @helpers/geometry'
import { to12hClock } from @helpers/time'
import colors from '../../styles/colors'

interface MinuteSticksProps {
  currentTime: any

  x: number
  y: number
  radius: number
}

const CurrentTime = (props: MinuteSticksProps) => {
  const degrees =
    ((to12hClock(props.currentTime.hour()) + props.currentTime.minute() / 60) /
      12) *
    360
  const time = polarToCartesian(props.x, props.y, props.radius, degrees)

  return <Circle cx={time.x} cy={time.y} r={2} fill={colors.accentRed} />
}

export default CurrentTime
