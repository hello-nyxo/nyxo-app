import * as d3 from 'd3'
import moment from 'moment'
import React, { memo, useMemo, useState } from 'react'
import { Dimensions, View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Svg from 'react-native-svg'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { constants, StyleProps } from '../../styles/themes'
import { getAllDays } from '../../store/Selectors/SleepDataSelectors'
import { getIsDarkMode } from '../../store/Selectors/UserSelectors'
import { Day, Value } from '../../Types/Sleepdata'
import { Container, H3 } from '../Primitives/Primitives'
import BottomInfo from './SleepTimeChart/BottomInfo'
import DayInfo from './SleepTimeChart/DayInfo'
import SleepBars from './SleepTimeChart/SleepBars'
import XTicks from './SleepTimeChart/XTicks'
import YTicks from './SleepTimeChart/YTicks'

const { height, width } = Dimensions.get('window')

export const barWidth = width / 12
export const paddingLeft = 100
export const paddingRight = 100
export const chartHeight = height / 3

const SleepTimeChart = () => {
  const days = useSelector(getAllDays)
  const [selectedDay, setSelectedDay] = useState()

  const chartWidth = (barWidth + 10) * days.length + paddingLeft + paddingRight

  const { normalizedSleepData }: any = useMemo(
    () => ({
      normalizedSleepData: normalizeSleepData(days, Value.InBed)
    }),
    []
  )

  const select = (day: Day) => {
    setSelectedDay(day)
  }

  const xDomain = d3.extent(
    normalizedSleepData,
    (day: Day) => new Date(day.date)
  )
  const yDomain: any = [
    d3.min(normalizedSleepData, (datum: Day) =>
      d3.min(datum.night, (night) =>
        moment(night.startDate).subtract(1, 'hour').valueOf()
      )
    ),
    d3.max(normalizedSleepData, (datum: Day) =>
      d3.max(datum.night, (night) =>
        moment(night.endDate).add(1, 'hour').valueOf()
      )
    )
  ]

  const scaleX = d3.scaleTime().domain(xDomain).range([paddingLeft, chartWidth - paddingRight])

  const scaleY = d3
    .scaleTime()
    .domain(yDomain)
    .nice()
    .range([0, chartHeight - 50])
  const yTicks = scaleY.ticks(4)
  const xTicks = scaleX.ticks(d3.timeDay.every(1))

  return (
    <>
      <Container>
        <H3>Sleep Goal Trend</H3>
      </Container>
      <ScrollContainer>
        <ScrollView
          style={{ transform: [{ scaleX: -1 }] }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={{ transform: [{ scaleX: -1 }] }}>
            <Svg width={chartWidth} height={chartHeight}>
              <SleepBars
                select={select}
                barWidth={barWidth}
                type={Value.InBed}
                scaleX={scaleX}
                scaleY={scaleY}
                data={normalizedSleepData}
              />
              <SleepBars
                select={select}
                barWidth={barWidth}
                type={Value.Asleep}
                scaleX={scaleX}
                scaleY={scaleY}
                data={normalizedSleepData}
              />
              <XTicks
                chartHeight={chartHeight}
                scaleX={scaleX}
                barWidth={barWidth}
                ticks={xTicks}
              />
            </Svg>
          </View>
        </ScrollView>
        <YTicksContainer width={chartWidth} height={chartHeight}>
          <YTicks scaleY={scaleY} chartWidth={chartWidth} ticks={yTicks} />
        </YTicksContainer>
      </ScrollContainer>
      <Stats>
        {selectedDay ? <DayInfo selectedDay={selectedDay} /> : <BottomInfo />}
      </Stats>
    </>
  )
}

export default memo(SleepTimeChart)

const Stats = styled.View`
  padding: 10px 20px;
  height: 60px;
  border-top-color: ${(props: StyleProps) => props.theme.HAIRLINE_COLOR};
  border-top-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${(props: StyleProps) => props.theme.HAIRLINE_COLOR};
  border-bottom-width: ${constants.hairlineWidth}px;
`

const ScrollContainer = styled.View``

const YTicksContainer = styled(Svg)`
  position: absolute;
`

const normalizeSleepData = (days: Day[], value: Value) => {
  const normalized = days.map((day) => {
    const normalizedNights = day.night.map((night) => {
      const trueDate = moment(day.date)

      const startDifference = moment.duration(
        moment(night.startDate).diff(trueDate.startOf('day'))
      )
      const newStartDate = moment().startOf('day').add(startDifference)

      const newEndDate = moment(newStartDate).add(
        night.totalDuration,
        'minutes'
      )

      return {
        ...night,
        startDate: newStartDate.valueOf(),
        endDate: newEndDate.valueOf()
      }
    })

    return { ...day, night: normalizedNights }
  })

  return normalized
}
