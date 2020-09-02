import {
  fetchSleepData,
  updateCalendar
} from '@actions/sleep/sleep-data-actions'
import { backgroundAction, startup } from '@actions/StartupActions'
import useBackgroundFetch from '@hooks//UseBackgroundFetch'
import useNotificationEventHandlers from '@hooks/UseNotificationEventHandlers'
import {
  getLoadingFitbit,
  getLoadingGoogleFit
} from '@selectors/api-selectors/api-selectors'
import { getHealthKitLoading } from '@selectors/health-kit-selectors/health-kit-selectors'
import InitializeSource from '@components/MainScreenSpecific/InitializeSources'
import ExplanationsModal from '@components/modals/ExplanationsModal'
import MergeHabitsModal from '@components/modals/MergeHabitsModal/MergeHabitsModal'
import NotificationCenterLink from '@components/NotificationCenter/NotificationCenterLink'
import RatingModal from '@components/RatingModal'
import React, { memo, useEffect } from 'react'
import { RefreshControl, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DayStrip from '@components/DayStrip'
import Habits from '@components/HabitList/HabitList'
import ClockCarousel from '@components/MainScreenSpecific/ClockCarousel'
import { EditNightHeader } from '@components/MainScreenSpecific/EditNightHeader'
import TodayView from '@components/MainScreenSpecific/TodayView'
import EditHabitModal from '@components/modals/HabitModal/EditHabitModal'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import { SafeAreaView } from '@components/Primitives/Primitives'
import TopInfo from '@components/TopInfo'
import colors from '../../styles/colors'

const MainScreen = () => {
  const isLoadingSleepData = useSelector(getHealthKitLoading)
  const isLoadingFitbit = useSelector(getLoadingFitbit)
  const isLoadingGoogleFit = useSelector(getLoadingGoogleFit)
  const dispatch = useDispatch()

  useNotificationEventHandlers()

  useEffect(() => {
    dispatch(startup())
  }, [])

  useBackgroundFetch(15, async () => {
    dispatch(backgroundAction())
  })

  const checkSleepData = async () => {
    await dispatch(fetchSleepData())
    await dispatch(updateCalendar())
  }

  return (
    <SafeAreaView>
      <TopInfo />
      <EditNightHeader />

      <Habits
        header={
          <View>
            <DayStrip />
            <NotificationCenterLink />
            <ClockCarousel />
            <TodayView />
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoadingSleepData}
            tintColor={colors.white}
            onRefresh={checkSleepData}
          />
        }
      />
      <RatingModal />
      <ExplanationsModal />
      <InitializeSource />
      <NewHabitModal />
      <EditHabitModal />
      <MergeHabitsModal />
    </SafeAreaView>
  )
}

export default memo(MainScreen)
