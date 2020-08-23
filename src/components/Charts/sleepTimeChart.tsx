import { extent, max, min, scaleTime } from 'd3'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Svg from 'react-native-svg'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getAllDays } from '../../store/Selectors/SleepDataSelectors'
import { Day, Value } from '../../Types/Sleepdata'
import { Container, H3 } from '../Primitives/Primitives'
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

  const { normalizedSleepData } = useMemo(
    () => ({
      normalizedSleepData: normalizeSleepData(days, Value.InBed)
    }),
    [days]
  )

  const select = (day: Day) => {
    setSelectedDay(day)
  }

  const xDomain: Date[] = extent(
    normalizedSleepData,
    (day: Day) => new Date(day.date)
  ) as Date[]

  const yDomain: number[] = [
    min(normalizedSleepData, (datum: Day) =>
      min(datum.night, (night) =>
        moment(night.startDate).subtract(1, 'hour').valueOf()
      )
    ) as number,
    max(normalizedSleepData, (datum: Day) =>
      max(datum.night, (night) =>
        moment(night.endDate).add(1, 'hour').valueOf()
      )
    ) as number
  ]
  const scaleX = scaleTime().domain(xDomain).range([paddingLeft, chartWidth])

  const scaleY = scaleTime()
    .domain(yDomain)
    .nice()
    .range([10, chartHeight - 80])

  const yTicks = scaleY.ticks(5)
  const xTicks = scaleX.ticks(days.length)

  return (
    <Card>
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
                barWidth={barWidth}
                type={Value.InBed}
                scaleX={scaleX}
                scaleY={scaleY}
                data={normalizedSleepData}
              />
              <SleepBars
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
    </Card>
  )
}

export default SleepTimeChart

const ScrollContainer = styled.View``

const YTicksContainer = styled(Svg)`
  position: absolute;
`

const Card = styled.View`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 10px;
  margin: 8px;
  border-radius: 7px;
`

type NormalizedDay = Day & {
  night: Night & {
    startDate: number
    endDate: number
  }
}

const normalizeSleepData = (days: Day[]): NormalizedDay[] => {
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
