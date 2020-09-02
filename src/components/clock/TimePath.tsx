import React from 'react'
import { Path } from 'react-native-svg'

import { describeArc } from @helpers/geometry'

interface TimePathProps {
  strokeWidth: number
  color: string
  startAngle: number
  endAngle: number
  x: number
  y: number
  radius: number
}

const TimePath = (props: TimePathProps) => {
  const path = describeArc(
    props.x,
    props.y,
    props.radius,
    props.startAngle,
    props.endAngle
  ).toString()

  return (
    <Path
      strokeLinecap="round"
      d={path}
      fill="none"
      stroke={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}

export default TimePath
