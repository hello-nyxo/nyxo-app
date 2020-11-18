import React, { memo } from 'react'
import { G, Line, Text as SvgText } from 'react-native-svg'
import { minutesToHoursString } from '@helpers/time'
import colors from '../../../styles/colors'

interface SleepTimeChartAverageProps {
  averageBedTime: number
  chartWidth: number
  average: number
}

const SleepTimeChartAverage = (props: SleepTimeChartAverageProps) => {
  if (!props.averageBedTime || !props.average) {
    return null
  }
  return (
    <G>
      <Line
        x1={0}
        x2={props.chartWidth}
        y1={props.averageBedTime}
        y2={props.averageBedTime}
        strokeWidth="2"
        stroke={colors.darkBlue}
        strokeDasharray={[10, 10]}
        strokeDashoffset={10}
        strokeLinecap="round"
      />
      <SvgText
        fontFamily="Montserrat-Medium"
        fontSize="13"
        fill={colors.darkBlue}
        alignmentBaseline="central"
        x={20}
        y={props.averageBedTime - 12}>
        {minutesToHoursString(props.average)}
      </SvgText>
      <SvgText
        fontFamily="Montserrat-Medium"
        fontSize="13"
        fill={colors.darkBlue}
        alignmentBaseline="central"
        x={20}
        y={props.averageBedTime + 12}>
        Sleep
      </SvgText>
    </G>
  )
}

export default memo(SleepTimeChartAverage)
