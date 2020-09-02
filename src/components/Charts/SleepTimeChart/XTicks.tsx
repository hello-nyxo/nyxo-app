import { ScaleTime } from 'd3'
import moment from 'moment'
import React, { memo } from 'react'
import { View } from 'react-native'
import { G, Text } from 'react-native-svg'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getTextColorOnTheme } from '../../../store/Selectors/UserSelectors'
import { fonts } from '../../../styles/themes'
import NightRating from 'components/sleepClock/NightRating'

type Props = {
  scaleX: ScaleTime<any, any>
  chartHeight: number
  barWidth: number
  ticks: Date[]
}

const XTicks = ({ scaleX, chartHeight, barWidth, ticks }: Props) => {
  const color = useSelector(getTextColorOnTheme)

  const tickElements = ticks.map((tick, index) => {
    const date = moment(tick).toISOString()
    const x = scaleX(tick) + barWidth / 2

    return (
      <G key={`tick_${moment(tick).format('DD')}`}>
        <DayText
          fontFamily={fonts.medium}
          textAnchor="middle"
          x={x}
          y={chartHeight - 35}>
          {moment(tick).format('ddd')}
        </DayText>
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

const DayText = styled(Text).attrs(({ theme }) => ({
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
