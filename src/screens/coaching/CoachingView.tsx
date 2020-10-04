import BuyCoachingButton from '@components/CoachingSpecific/BuyCoachingButton'
import CoachingHeader from '@components/CoachingSpecific/CoachingHeader'
import CoachingNotStarted from '@components/CoachingSpecific/CoachingNotStarted'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import {
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import TopInfo from '@components/TopInfo'
import { WIDTH } from '@helpers/Dimensions'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import WeekCarousel from '@components/CoachingSpecific/WeekCarousel'
import React, { FC, memo } from 'react'
import { RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import colors from '../../styles/colors'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const CoachingScreen: FC = () => {
  const hasActiveCoaching = useSelector(getActiveCoaching)
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
      {!hasActiveCoaching && <BuyCoachingButton />}
      <NewHabitModal />
    </SafeAreaView>
  )
}

export default memo(CoachingScreen)
