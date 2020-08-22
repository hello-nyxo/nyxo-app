import { ScaleTime } from 'd3'
import moment from 'moment'
import React, { memo } from 'react'
import { G, Line, Text } from 'react-native-svg'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { StyleProps } from '../../../styles/themes'
import { getTextColorOnTheme } from '../../../store/Selectors/UserSelectors'

interface Props {
  chartWidth: number
  scaleY: ScaleTime<any, any>
  ticks: Date[]
}

const YTicks = (props: Props) => {
  const color = useSelector(getTextColorOnTheme)

  const ticks = props.ticks.map((tick, index) => {
    return (
      <G key={index}>
        <Line
          stroke={color}
          strokeWidth={0.25}
          x1={40}
          x2={props.chartWidth}
          y1={props.scaleY(tick)}
          y2={props.scaleY(tick)}
        />
        <StyledText
          alignmentBaseline="middle"
          key={index}
          x={5}
          y={props.scaleY(tick)}>
          {moment(tick).format('HH:mm')}
        </StyledText>
      </G>
    )
  })

  return <G>{ticks}</G>
}

export default memo(YTicks)

const StyledText = styled(Text).attrs((props: StyleProps) => ({
  fill: props.theme.PRIMARY_TEXT_COLOR
}))``
