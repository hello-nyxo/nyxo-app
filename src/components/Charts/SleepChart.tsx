import TranslatedText from '@components/TranslatedText'
import { useAppSelector } from '@hooks/redux'
import { getNightsAsDays } from '@reducers/nights'
import { extent, max, min, scaleTime } from 'd3'
import { addHours, subHours } from 'date-fns'
import React, { FC } from 'react'
import { Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Svg from 'react-native-svg'
import styled from 'styled-components/native'
import SleepBars from './SleepTimeChart/SleepBars'
// import TargetBars from './SleepTimeChart/TargetBars'
import XTicks from './SleepTimeChart/XTicks'
import YTicks from './SleepTimeChart/YTicks'

const { height, width } = Dimensions.get('window')

export const barWidth = width / 12
export const paddingLeft = 100
export const paddingRight = 100
export const chartHeight = height / 3

const SleepTimeChart: FC = () => {
  const data = useAppSelector(getNightsAsDays)
  const daysToShow = data.length
  const chartWidth = (barWidth + 10) * daysToShow + paddingLeft + paddingRight

  const xDomain: Date[] = extent(data, (date) => new Date(date.date)) as Date[]

  const yDomain: number[] = [
    min(data, (date) =>
      min(date.night, (night) =>
        subHours(new Date(night.startDate), 1).valueOf()
      )
    ) as number,
    max(data, (date) =>
      max(date.night, (night) => addHours(new Date(night.endDate), 1).valueOf())
    ) as number
  ]

  const scaleX = scaleTime()
    .domain(xDomain)
    .range([paddingLeft, chartWidth - paddingRight])

  const scaleY = scaleTime()
    .domain(yDomain)
    .nice()
    .range([10, chartHeight - 80])

  const yTicks = scaleY.ticks(5)
  const xTicks = scaleX.ticks(daysToShow)

  return (
    <Card>
      <Title>STAT.TREND</Title>

      <ScrollContainer>
        <YTicksContainer
          pointerEvents="auto"
          width={chartWidth}
          height={chartHeight}>
          <YTicks scaleY={scaleY} chartWidth={chartWidth} ticks={yTicks} />
        </YTicksContainer>
        <ScrollView
          style={{ transform: [{ scaleX: -1 }] }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={{ transform: [{ scaleX: -1 }] }}>
            <Svg width={chartWidth} height={chartHeight}>
              {/* <TargetBars
                start={bedtimeWindow}
                onPress={select}
                barWidth={barWidth}
                scaleX={scaleX}
                scaleY={scaleY}
                data={normalizedSleepData}
              /> */}
              <SleepBars
                onPress={() => undefined}
                barWidth={barWidth}
                scaleX={scaleX}
                scaleY={scaleY}
                data={data}
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
      </ScrollContainer>
    </Card>
  )
}

export default SleepTimeChart

const ScrollContainer = styled.View`
  overflow: hidden;
`

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
  margin-top: 8px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  padding: 10px;
  margin: 0px 16px 8px;
  border-radius: 7px;
`
