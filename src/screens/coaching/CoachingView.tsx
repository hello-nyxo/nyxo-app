import CoachingHeader from '@components/CoachingSpecific/CoachingHeader'
import WeekCarousel from '@components/CoachingSpecific/WeekCarousel'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import { SafeAreaView } from '@components/Primitives/Primitives'
import { WIDTH } from '@helpers/Dimensions'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { useWeeks } from '@hooks/coaching/useWeeks'
import { useAppDispatch } from '@hooks/redux'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { updateSubscriptionStatus } from '@reducers/subscription'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { CompositeNavigationProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

type CoachingScreenRouteProp = RouteProp<RootStackParamList['App'], 'Coaching'>

export type CoachingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<RootStackParamList['App'], 'Coaching'>
>

type Props = {
  route: CoachingScreenRouteProp
  navigation: CoachingScreenNavigationProp
}

const CoachingScreen: FC<Props> = () => {
  const { data: coaching, refetch, isLoading } = useGetActiveCoaching()
  const { refetch: refetchContent } = useWeeks()

  const dispatch = useAppDispatch()

  const refresh = async () => {
    dispatch(updateSubscriptionStatus())
    refetch()
    refetchContent()
  }

  return (
    <SafeAreaView>
      <WeekCarousel
        coaching={coaching}
        ListHeaderComponent={<CoachingHeader />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
      />

      <NewHabitModal />
    </SafeAreaView>
  )
}

export default CoachingScreen

const RefreshControl = styled.RefreshControl.attrs(({ theme }) => ({
  tintColor: theme.accent
}))``
