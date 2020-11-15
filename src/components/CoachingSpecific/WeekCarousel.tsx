import { WIDTH } from '@helpers/Dimensions'
import { CoachingPeriod } from '@hooks/coaching/useCoaching'
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
  coaching?: CoachingPeriod
}

const WeekCarousel: FC<Props> = ({
  ListHeaderComponent,
  refreshControl,
  coaching
}) => {
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
        coaching={coaching}
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
