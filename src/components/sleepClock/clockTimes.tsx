import range from 'lodash/range'
import React, { memo } from 'react'
import { G, Line, Text as SVGText } from 'react-native-svg'
import styled from 'styled-components/native'
import { polarToCartesian } from '../../helpers/geometry'

type Props = {
  x: number
  y: number
  radius: number
  shouldAnimate: boolean
}

const ClockTimes = ({ x, y, radius, shouldAnimate }: Props) => {
  const sticks = range(12).map((hour, index) => {
    const stickStart = polarToCartesian(x, y, radius - 20, hour * 30)
    const stickEnd = polarToCartesian(x, y, radius, hour * 30)
    const time = polarToCartesian(x, y, radius - 35, hour * 30)

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
        <ThemedText
          textAnchor="middle"
          fontFamily="Montserrat-Medium"
          fontSize="13"
          fontWeight="bold"
          alignmentBaseline="central"
          x={time.x}
          y={time.y}>
          {hour === 0 ? 12 : hour}
        </ThemedText>
      </G>
    )
  })

  return <G>{sticks}</G>
}

export default memo(ClockTimes)

const ThemedText = styled(SVGText).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``

const ThemedLine = styled(Line).attrs(({ theme }) => ({
  stroke: theme.SECONDARY_TEXT_COLOR
}))``
