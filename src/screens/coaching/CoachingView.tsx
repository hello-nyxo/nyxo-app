import { updateSubscriptionStatus } from '@actions/subscription/subscription-actions'
import CoachingHeader from '@components/CoachingSpecific/CoachingHeader'
import WeekCarousel from '@components/CoachingSpecific/WeekCarousel'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import { SafeAreaView } from '@components/Primitives/Primitives'
import TopInfo from '@components/TopInfo'
import { WIDTH } from '@helpers/Dimensions'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { useWeeks } from '@hooks/coaching/useWeeks'
import colors from '@styles/colors'
import React, { FC, memo } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const CoachingScreen: FC = () => {
  const { data: coaching, refetch, isLoading } = useGetActiveCoaching()
  const { refetch: refetchContent } = useWeeks()

  const dispatch = useDispatch()

  const refresh = async () => {
    await dispatch(updateSubscriptionStatus())
    refetch()
    refetchContent()
  }

  return (
    <SafeAreaView>
      <TopInfo />

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

export default memo(CoachingScreen)
