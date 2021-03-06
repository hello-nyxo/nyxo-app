import { polarToCartesian } from '@helpers/geometry'
import range from 'lodash/range'
import React, { memo } from 'react'
import { G, Line } from 'react-native-svg'
import styled from 'styled-components/native'

type Props = {
  x: number
  y: number
  radius: number
}

const MinuteSticks = ({ x, y, radius }: Props) => {
  const sticks = range(72).map((minute: number, index: number) => {
    const stickStart = polarToCartesian(x, y, radius - 5, minute * 5)
    const stickEnd = polarToCartesian(x, y, radius, minute * 5)

    return (
      <G key={index}>
        <ThemedLine
          key={index}
          x1={stickStart.x}
          x2={stickEnd.x}
          y1={stickStart.y}
          y2={stickEnd.y}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </G>
    )
  })

  return <G>{sticks}</G>
}

export default memo(MinuteSticks)

const ThemedLine = styled(Line).attrs(({ theme }) => ({
  stroke: theme.SECONDARY_TEXT_COLOR
}))``
