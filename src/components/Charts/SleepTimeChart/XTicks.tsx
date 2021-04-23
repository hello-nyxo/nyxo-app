import { ScaleTime } from 'd3'
import { format } from 'date-fns'
import React, { memo, FC } from 'react'
import { G, Text } from 'react-native-svg'
import styled from 'styled-components/native'

type Props = {
  scaleX: ScaleTime<number, number>
  chartHeight: number
  barWidth: number
  ticks: Date[]
}

const XTicks: FC<Props> = ({ scaleX, chartHeight, barWidth, ticks }) => {
  const tickElements = ticks.map((tick) => {
    const x = scaleX(tick) + barWidth / 2

    return (
      <G key={`tick_${new Date(tick).toISOString()}`}>
        <Day textAnchor="middle" x={x} y={chartHeight - 5}>
          {format(new Date(tick), 'EEE')}
        </Day>
        <LongDate
          fontWeight="bold"
          textAnchor="middle"
          x={x}
          y={chartHeight - 20}>
          {format(new Date(tick), 'dd')}
        </LongDate>
      </G>
    )
  })

  return <G>{tickElements}</G>
}

const Day = styled(Text).attrs(({ theme }) => ({
  fill: theme.textPrimary,
  fontFamily: theme.medium
}))``

const LongDate = styled(Text).attrs(({ theme }) => ({
  fill: theme.textPrimary,
  fontFamily: theme.bold
}))``

export default memo(XTicks)
