import CoachingHeader from '@components/CoachingSpecific/CoachingHeader'
import CoachingNotStarted from '@components/CoachingSpecific/CoachingNotStarted'
import WeekCarousel from '@components/CoachingSpecific/WeekCarousel'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import {
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import TopInfo from '@components/TopInfo'
import { WIDTH } from '@helpers/Dimensions'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import colors from '@styles/colors'
import React, { FC, memo } from 'react'
import { RefreshControl } from 'react-native'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const CoachingScreen: FC = () => {
  const { refetch, isLoading } = useGetActiveCoaching()

  return (
    <SafeAreaView>
      <TopInfo />
      <StyledScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={colors.radiantBlue}
            onRefresh={refetch}
          />
        }>
        <CoachingHeader />
        <WeekCarousel />
      </StyledScrollView>

      <CoachingNotStarted />
      <NewHabitModal />
    </SafeAreaView>
  )
}

export default memo(CoachingScreen)
