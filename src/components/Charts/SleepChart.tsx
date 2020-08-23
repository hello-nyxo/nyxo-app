import TranslatedText from '@components/TranslatedText'
import { setSelectedDay } from '@actions/sleep/sleep-data-actions'
import { extent, max, min, scaleTime } from 'd3'
import moment from 'moment'
import React, { useMemo, FC } from 'react'
import { Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Svg from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getAllDays } from '@selectors/SleepDataSelectors'
import { getGoToSleepWindowCenter } from '@selectors/insight-selectors/Insights'
import { Day, Night, Value } from '../../Types/Sleepdata'
import SleepBars from './SleepTimeChart/SleepBars'
import XTicks from './SleepTimeChart/XTicks'
import YTicks from './SleepTimeChart/YTicks'
import TargetBars from './SleepTimeChart/TargetBars'

const { height, width } = Dimensions.get('window')

export const barWidth = width / 12
export const paddingLeft = 100
export const paddingRight = 100
export const chartHeight = height / 3

const SleepTimeChart: FC = () => {
  const days = useSelector(getAllDays)
  const dispatch = useDispatch()
  const chartWidth = (barWidth + 10) * days.length + paddingLeft + paddingRight
  const bedtimeWindow = useSelector(getGoToSleepWindowCenter)

  const { normalizedSleepData } = useMemo(
    () => ({
      normalizedSleepData: normalizeSleepData(days)
    }),
    [days]
  )

  const select = (day: Day) => {
    dispatch(setSelectedDay(day))
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

  console.log(normalizedSleepData)

  return (
    <Card>
      <Title>Sleep Goal Trend</Title>

      <ScrollContainer>
        <ScrollView
          style={{ transform: [{ scaleX: -1 }] }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={{ transform: [{ scaleX: -1 }] }}>
            <Svg width={chartWidth} height={chartHeight}>
              <TargetBars
                start={bedtimeWindow}
                onPress={select}
                barWidth={barWidth}
                scaleX={scaleX}
                scaleY={scaleY}
                data={normalizedSleepData}
              />
              <SleepBars
                onPress={select}
                barWidth={barWidth}
                type={Value.InBed}
                scaleX={scaleX}
                scaleY={scaleY}
                data={normalizedSleepData}
              />
              <SleepBars
                onPress={select}
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

const Title = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 15px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 10px;
`

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
