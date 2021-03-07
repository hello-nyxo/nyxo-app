import CoachingHeader from '@components/CoachingSpecific/CoachingHeader'
import WeekCarousel from '@components/CoachingSpecific/WeekCarousel'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import { SafeAreaView } from '@components/Primitives/Primitives'
import { HEIGHT, WIDTH } from '@helpers/Dimensions'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { useWeeks } from '@hooks/coaching/useWeeks'
import { useAppDispatch } from '@hooks/redux'
import { updateSubscriptionStatus } from '@reducers/subscription'
import colors from '@styles/colors'
import React, { FC } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const CoachingScreen: FC = () => {
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
      {/* <TopArea /> */}

      <WeekCarousel
        coaching={coaching}
        ListHeaderComponent={<CoachingHeader />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={colors.darkBlue}
            onRefresh={refresh}
          />
        }
      />

      <NewHabitModal />
    </SafeAreaView>
  )
}

export default CoachingScreen

const TopArea = styled.View`
  height: ${HEIGHT / 3}px;
  background-color: ${({ theme }) => theme.accent};
`
