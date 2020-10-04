import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import {
  Container,
  SafeAreaView,
  ThemedRefreshControl
} from '@components/Primitives/Primitives'
import { H2 } from '@components/Primitives/Types'
import { CoachingPeriod, useListCoaching } from '@hooks/coaching/useCoaching'
import React, { FC, memo } from 'react'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const CoachingSettings: FC = () => {
  const { data: months, isLoading, refetch } = useListCoaching()

  const renderItem: ListRenderItem<CoachingPeriod> = ({ item }) => (
    <CoachingMonthCard key={`${item?.id}`} month={item} />
  )

  if (!months || months.length === 0) return null

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <ThemedRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListHeaderComponent={() => (
          <>
            <GoBackContainer>
              <GoBack />
            </GoBackContainer>
            <Container>
              <H2>Coaching settings</H2>
            </Container>
          </>
        )}
        data={months}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default memo(CoachingSettings)
