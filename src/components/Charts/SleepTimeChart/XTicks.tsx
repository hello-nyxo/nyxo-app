import { ScaleTime } from 'd3'
import { format } from 'date-fns'
import React, { memo, FC } from 'react'
import { G, Text } from 'react-native-svg'
import styled from 'styled-components/native'
import { fonts } from '../../../styles/themes'

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
        <Day
          fontFamily={fonts.medium}
          textAnchor="middle"
          x={x}
          y={chartHeight - 5}>
          {format(new Date(tick), 'EEE')}
        </Day>
        <LongDate
          fontFamily={fonts.bold}
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
  fill: theme.PRIMARY_TEXT_COLOR
}))``

const LongDate = styled(Text).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``

export default memo(XTicks)
