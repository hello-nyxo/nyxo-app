import { describeArc } from '@helpers/geometry'
import { getAngleAM } from '@helpers/sleep/sleep'
import React, { FC } from 'react'
import Reanimated from 'react-native-reanimated'
import { G, Path } from 'react-native-svg'
import { Night, Value } from '@typings/Sleepdata'

type Props = {
  value: Value
  strokeWidth: number
  color: string
  night: Night[]
  x: number
  y: number
  radius: number
}

const AnimatedPath = Reanimated.createAnimatedComponent(Path)

const SleepArc: FC<Props> = ({
  night,
  value,
  color,
  strokeWidth,
  x,
  y,
  radius
}) => {
  if (!night) {
    return <G />
  }

  const arcs = night
    .filter((n: Night) => n.value === value)
    .map((part: Night) => {
      const path = describeArc(
        x,
        y,
        radius,
        getAngleAM(part.startDate),
        getAngleAM(part.endDate)
      ).toString()

      return (
        <AnimatedPath
          d={path}
          strokeLinecap="round"
          fill="none"
          stroke={color}
          key={part.id}
          strokeWidth={strokeWidth}
        />
      )
    })

  return <G>{arcs}</G>
}

export default SleepArc
