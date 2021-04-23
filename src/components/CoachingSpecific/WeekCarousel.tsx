import { WIDTH } from '@helpers/Dimensions'
import { CoachingPeriod } from '@hooks/coaching/useCoaching'
import { useWeeks } from '@hooks/coaching/useWeeks'
import { WeekCollectionItem } from '@typings/contentful'
import React, { FC } from 'react'
import { FlatList, ListRenderItem, RefreshControlProps } from 'react-native'
import WeekCard from './WeekCard'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

type Props = {
  ListHeaderComponent: React.ComponentType<unknown> | React.ReactElement | null
  refreshControl?: React.ReactElement<RefreshControlProps>
  coaching?: CoachingPeriod
}

const WeekCarousel: FC<Props> = ({
  ListHeaderComponent,
  refreshControl,
  coaching
}) => {
  const { data, error } = useWeeks()

  const renderWeekCard: ListRenderItem<WeekCollectionItem> = ({ item }) => {
    return (
      <WeekCard
        key={item.slug}
        week={item}
        cardMargin={cardMargin}
        cardWidth={cardWidth}
        coaching={coaching}
      />
    )
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={refreshControl}
      keyExtractor={(item) => item.slug}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      data={data?.coachingWeekCollection?.items}
      renderItem={renderWeekCard}
    />
  )
}

export default WeekCarousel
