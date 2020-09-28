import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import {
  Container,
  H2,
  SafeAreaView,
  ThemedRefreshControl
} from '@components/Primitives/Primitives'
import { CoachingPeriod, useListCoaching } from '@hooks/coaching/useCoaching'
import { useNavigation } from '@react-navigation/core'
import React, { FC, memo } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

const CoachingSettings: FC = () => {
  const { data: months, isLoading, refetch } = useListCoaching()
  const { navigate } = useNavigation()

  const renderItem: ListRenderItem<CoachingPeriod> = ({ item }) => (
    <CoachingMonthCard key={`${item?.id}`} month={item} />
  )

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
