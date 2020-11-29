import { describeArc } from '@helpers/geometry'
import { getAngleAM } from '@helpers/sleep/sleep'
import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { Night, Value } from '@typings/Sleepdata'
import styled from 'styled-components/native'

type Props = {
  value: Value
  strokeWidth: number
  color: string
  night: Night[]
  x: number
  y: number
  outline?: boolean
  radius: number
}

const SleepArc: FC<Props> = ({
  night,
  value,
  color,
  strokeWidth,
  x,
  y,
  outline,
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

      if (outline) {
        return (
          <G key={`${part.id}_outline`}>
            <Path
              d={path}
              strokeLinecap="round"
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <ThemedPath
              d={path}
              strokeLinecap="round"
              fill="none"
              strokeWidth={strokeWidth - 5}
            />
          </G>
        )
      }

      return (
        <Path
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

const ThemedPath = styled(Path).attrs(({ theme }) => ({
  stroke: theme.SECONDARY_BACKGROUND_COLOR
}))``
