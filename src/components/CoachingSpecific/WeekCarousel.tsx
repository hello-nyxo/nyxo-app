import { WIDTH } from '@helpers/Dimensions'
import {
  CombinedWeek,
  getCombinedWeeks,
  getCurrentWeek
} from '@selectors/coaching-selectors'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import React, { FC } from 'react'
import {
  FlatList,
  ListRenderItem,
  RefreshControlProps,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { H3 } from '../Primitives/Primitives'
import WeekCard from './WeekCard'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

type Props = {
  ListHeaderComponent: React.ComponentType<any> | React.ReactElement | null
  refreshControl?: React.ReactElement<RefreshControlProps>
}

const WeekCarousel: FC<Props> = ({ ListHeaderComponent, refreshControl }) => {
  const { data } = useGetActiveCoaching()
  const combined = useSelector(getCombinedWeeks)
  const ongoing = combined

  const renderWeekCard: ListRenderItem<CombinedWeek> | null | undefined = ({
    item
  }) => {
    return (
      <WeekCard
        key={item.slug}
        week={item}
        cardMargin={cardMargin}
        cardWidth={cardWidth}
        completed
      />
    )
  }

  const inset = (WIDTH - cardWidth - cardMargin) / 2

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{
        paddingLeft: inset,
        paddingRight: inset
      }}
      refreshControl={refreshControl}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      data={ongoing}
      renderItem={renderWeekCard}
    />
  )
}

export default WeekCarousel
