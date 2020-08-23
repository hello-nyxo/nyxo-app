import React, { FC } from 'react'
import { View, FlatList } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import {
  CombinedWeek,
  getCombinedWeeks,
  getCurrentWeek
} from 'store/Selectors/coaching-selectors'
import styled from 'styled-components/native'
import { WIDTH } from '../../helpers/Dimensions'
import { H3 } from '../Primitives/Primitives'
import WeekCard from './WeekCard'

export const cardWidth = WIDTH - 40
export const cardMargin = 5
const xOffset = new Animated.Value(0)

const WeekCarousel: FC = () => {
  const currentWeek = useSelector(getCurrentWeek)
  const combined = useSelector(getCombinedWeeks)
  const ongoing = combined

  const renderWeekCard = ({ item }: { item: CombinedWeek }) => {
    return (
      <WeekCard
        key={item.slug}
        week={item}
        cardMargin={cardMargin}
        cardWidth={cardWidth}
        xOffset={xOffset}
      />
    )
  }

  const activeWeekIndex = ongoing.findIndex(
    (week: CombinedWeek) => week.contentId === currentWeek
  )
  const snapOffets: number[] = ongoing.map(
    (item, index) => index * (cardWidth + cardMargin * 2)
  )
  const inset = (WIDTH - cardWidth - cardMargin) / 2

  return (
    <View>
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
    </View>
  )
}

export default WeekCarousel

const Container = styled.View`
  padding: 0px 20px;
`
