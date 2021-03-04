import { describeArc } from '@helpers/geometry'
import React, { FC } from 'react'
import { Path } from 'react-native-svg'

interface TimePathProps {
  strokeWidth: number
  color: string
  startAngle: number
  endAngle: number
  x: number
  y: number
  radius: number
}

const TimePath: FC<TimePathProps> = ({
  x,
  y,
  radius,
  startAngle,
  endAngle,
  strokeWidth,
  color
}) => {
  const path = describeArc(x, y, radius, startAngle, endAngle).toString()

  return (
    <Path
      strokeLinecap="round"
      d={path}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  )
}

export default TimePath
