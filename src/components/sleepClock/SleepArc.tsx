import React from 'react'
import { Path, G } from 'react-native-svg'
import Reanimated from 'react-native-reanimated'
import AnimatedSvgPath from '../AnimatedSvgPath'
import { Value, Day, Night } from '../../Types/Sleepdata'
import { describeArc } from '../../helpers/geometry'
import { getAngleAM } from '../../helpers/sleep'

interface SleepArcProps {
  day: Day
  value: Value
  strokeWidth: number
  color: string

  x: number
  y: number
  radius: number
}

const AnimatedPath = Reanimated.createAnimatedComponent(Path)

const SleepArc = (props: SleepArcProps) => {
  if (!props.day || !props.day.night) {
    return <G />
  }

  const arcs = props.day.night
    .filter((night: Night) => night.value === props.value)
    .map((part: Night, index: number) => {
      const path = describeArc(
        props.x,
        props.y,
        props.radius,
        getAngleAM(part.startDate),
        getAngleAM(part.endDate)
      ).toString()

      return (
        <AnimatedPath
          d={path}
          strokeLinecap="round"
          fill="none"
          stroke={props.color}
          key={index}
          strokeWidth={props.strokeWidth}
        />
      )
    })

  return <G>{arcs}</G>
}

export default SleepArc
