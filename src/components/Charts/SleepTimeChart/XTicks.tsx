import { ScaleTime } from 'd3'
import moment from 'moment'
import { View } from 'react-native'
import React, { memo, FC } from 'react'
import { G, Text } from 'react-native-svg'
import styled from 'styled-components/native'
import { fonts } from '../../../styles/themes'
import NightRating from 'components/clock/NightRating'

type Props = {
  scaleX: ScaleTime<number, number>
  chartHeight: number
  barWidth: number
  ticks: Date[]
}

const XTicks: FC<Props> = ({ scaleX, chartHeight, barWidth, ticks }) => {
  const tickElements = ticks.map((tick) => {
    const x = scaleX(tick) + barWidth / 2
    const date = moment(tick).toISOString()

    return (
      <G key={`tick_${moment(tick).toISOString()}`}>
        <Day
          fontFamily={fonts.medium}
          textAnchor="middle"
          x={x}
          y={chartHeight - 35}>
          {moment(tick).format('ddd')}
        </Day>
        <LongDate
          fontFamily={fonts.bold}
          fontWeight="bold"
          textAnchor="middle"
          x={x}
          y={chartHeight - 50}>
          {moment(tick).format('DD')}
        </LongDate>

        <RatingIconContainer
          barWidth={barWidth}
          x={scaleX(tick)}
          y={chartHeight - 25}>
          <NightRating unClickable height={15} width={15} date={date} />
        </RatingIconContainer>
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

interface RatingIconContainerProps {
  x: number
  y: number
  children: React.ReactNode
  barWidth: number
}

const RatingIconContainer = (props: RatingIconContainerProps) => (
  <View
    style={{
      transform: [{ translateX: props.x }, { translateY: props.y }],
      justifyContent: 'center',
      alignItems: 'center',
      width: props.barWidth,
      position: 'absolute'
    }}>
    {props.children}
  </View>
)

export default memo(XTicks)
