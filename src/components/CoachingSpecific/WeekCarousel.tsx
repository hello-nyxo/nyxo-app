import { WIDTH } from '@helpers/Dimensions'
import {
  CombinedWeek,
  getCombinedWeeks,
  getCurrentWeek
} from '@selectors/coaching-selectors'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import React, { FC } from 'react'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { H3 } from '../Primitives/Primitives'
import WeekCard from './WeekCard'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const WeekCarousel: FC = () => {
  const { data } = useGetActiveCoaching()
  const combined = useSelector(getCombinedWeeks)
  const ongoing = combined

  const renderWeekCard = ({ item }: { item: CombinedWeek }) => {
    return (
      <WeekCard
        key={item.slug}
        week={item}
        cardMargin={cardMargin}
        cardWidth={cardWidth}
        completed={true}
      />
    )
  }

  const activeWeekIndex = ongoing.findIndex(
    (week: CombinedWeek) => week.slug === data?.activeWeek
  )
  const snapOffets: number[] = ongoing.map(
    (_, index) => index * (cardWidth + cardMargin * 2)
  )
  const inset = (WIDTH - cardWidth - cardMargin) / 2

  return (
    <>
      <Container>
        <H3>COACHING_WEEKS</H3>
      </Container>
      <FlatList
        contentContainerStyle={{
          paddingLeft: inset,
          paddingRight: inset
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        decelerationRate="fast"
        directionalLockEnabled
        initialScrollIndex={activeWeekIndex}
        snapToOffsets={snapOffets}
        getItemLayout={(_: CombinedWeek[], index: number) => ({
          index,
          length: cardWidth,
          offset: (cardWidth + cardMargin) * index
        })}
        snapToAlignment="center"
        snapToEnd={false}
        data={ongoing}
        renderItem={renderWeekCard}
      />
    </>
  )
}

export default WeekCarousel

const Container = styled.View`
  padding: 0px 20px;
`
