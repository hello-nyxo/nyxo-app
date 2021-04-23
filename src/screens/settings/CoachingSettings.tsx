import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import {
  H4,
  SafeAreaView,
  ThemedRefreshControl
} from '@components/Primitives/Primitives'
import { H2 } from '@components/Primitives/Types'
import {
  CoachingPeriod,
  useGetActiveCoaching,
  useListCoaching
} from '@hooks/coaching/useCoaching'
import React, { FC, memo } from 'react'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

const CoachingSettings: FC = () => {
  const {
    data: months,
    isLoading,
    refetch: refetchCoaching
  } = useListCoaching()
  const {
    data: activeMonth,
    refetch: refetchActiveMonth
  } = useGetActiveCoaching()

  const renderItem: ListRenderItem<CoachingPeriod> = ({ item }) => (
    <CoachingMonthCard key={`${item?.id}`} month={item} />
  )

  const data = months?.filter((m) => m?.id !== activeMonth?.id)

  const refresh = () => {
    refetchCoaching()
    refetchActiveMonth()
  }

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <ThemedRefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        ListHeaderComponent={() => (
          <>
            <GoBackContainer>
              <GoBack route={'Settings'} />
            </GoBackContainer>
            <Container>
              <H2>COACHING.SETTINGS.TITLE</H2>
              <H4>COACHING.SETTINGS.ACTIVE</H4>
            </Container>

            {activeMonth ? (
              <CoachingMonthCard actionsEnabled={false} month={activeMonth} />
            ) : null}
            <Container>
              <H4>COACHING.SETTINGS.ALL</H4>
            </Container>
          </>
        )}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default memo(CoachingSettings)

const Container = styled.View`
  padding: 16px;
  margin: 24px 0px 0px;
`
