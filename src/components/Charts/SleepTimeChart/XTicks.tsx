import { ScaleTime } from 'd3'
import moment from 'moment'
import React, { memo } from 'react'
import { G, Text } from 'react-native-svg'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getTextColorOnTheme } from '../../../store/Selectors/UserSelectors'
import { fonts } from '../../../styles/themes'

type Props = {
  scaleX: ScaleTime<any, any>
  chartHeight: number
  barWidth: number
  ticks: Date[]
}

const XTicks = ({ scaleX, chartHeight, barWidth, ticks }: Props) => {
  const color = useSelector(getTextColorOnTheme)
  const tickElements = ticks.map((tick, index) => {
    const x = scaleX(tick) + barWidth / 2

    return (
      <G key={`tick_${moment(tick).format('DD')}`}>
        <Day
          fontFamily={fonts.medium}
          textAnchor="middle"
          x={x}
          y={chartHeight - 5}>
          {moment(tick).format('ddd')}
        </Day>
        <LongDate
          fontFamily={fonts.bold}
          fontWeight="bold"
          textAnchor="middle"
          x={x}
          y={chartHeight - 20}>
          {moment(tick).format('DD')}
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
