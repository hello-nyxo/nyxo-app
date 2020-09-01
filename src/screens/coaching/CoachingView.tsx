import { getAllWeeks } from '@actions/coaching/content-actions'
import { getLoadingContent } from '@selectors/content-selectors/content-selectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import React, { memo, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BuyCoachingButton from '../../components/CoachingSpecific/BuyCoachingButton'
import CoachingHeader from '../../components/CoachingSpecific/CoachingHeader'
import CoachingNotStarted from '../../components/CoachingSpecific/CoachingNotStarted'
import NewHabitModal from '../../components/modals/HabitModal/NewHabitModal'
import { SafeAreaView } from '../../components/Primitives/Primitives'
import TopInfo from '../../components/TopInfo'
import { WIDTH } from '../../helpers/Dimensions'
import colors from '../../styles/colors'
import Lessons from './Lessons'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const CoachingScreen = () => {
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const loadingContent = useSelector(getLoadingContent) as boolean
  const dispatch = useDispatch()

  const refreshContent = async () => {
    dispatch(getAllWeeks())
  }

  return (
    <SafeAreaView>
      <TopInfo />
      <Lessons
        useCurrentWeek
        refreshControl={
          <RefreshControl
            refreshing={loadingContent}
            tintColor={colors.radiantBlue}
            onRefresh={refreshContent}
          />
        }
        header={<CoachingHeader />}
      />
      <CoachingNotStarted />
      {!hasActiveCoaching && <BuyCoachingButton />}
      <NewHabitModal />
    </SafeAreaView>
  )
}

export default memo(CoachingScreen)
