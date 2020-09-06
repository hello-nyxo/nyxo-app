import BuyCoachingButton from '@components/CoachingSpecific/BuyCoachingButton'
import CoachingHeader from '@components/CoachingSpecific/CoachingHeader'
import CoachingNotStarted from '@components/CoachingSpecific/CoachingNotStarted'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import { SafeAreaView } from '@components/Primitives/Primitives'
import TopInfo from '@components/TopInfo'
import { WIDTH } from '@helpers/Dimensions'
import { useCreateCoaching, useGetCoaching } from '@hooks/coaching/useCoaching'
import { getLoadingContent } from '@selectors/content-selectors/content-selectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import { Auth } from 'aws-amplify'
import React, { FC, memo } from 'react'
import { Button, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import colors from '../../styles/colors'
import Lessons from './Lessons'

export const cardWidth = WIDTH - 40
export const cardMargin = 5

const CoachingScreen: FC = () => {
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const loadingContent = useSelector(getLoadingContent) as boolean

  const refreshContent = async () => {}

  const createCoaching = async () => {
    const { username } = await Auth.currentUserInfo()

    mutate({
      coaching: {
        userId: username,
        id: 'slug-1',
        started: new Date().toISOString()
      }
    })
  }

  return (
    <SafeAreaView>
      <TopInfo />
      <Button title="create" onPress={createCoaching} />
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
