import { WIDTH } from '@helpers/Dimensions'
import { CombinedWeek, getCombinedWeeks } from '@selectors/coaching-selectors'
import React, { FC } from 'react'
import { FlatList, ListRenderItem, RefreshControlProps } from 'react-native'
import { useSelector } from 'react-redux'
import WeekCard from './WeekCard'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

type Props = {
  ListHeaderComponent: React.ComponentType<any> | React.ReactElement | null
  refreshControl?: React.ReactElement<RefreshControlProps>
}

const WeekCarousel: FC<Props> = ({ ListHeaderComponent, refreshControl }) => {
  const ongoing = useSelector(getCombinedWeeks)

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

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={refreshControl}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      data={ongoing}
      renderItem={renderWeekCard}
    />
  )
}

export default WeekCarousel
