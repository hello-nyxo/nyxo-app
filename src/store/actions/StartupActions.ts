import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { refreshAuthStatus } from './auth/auth-actions'
import { getAllWeeks } from './coaching/content-actions'
import {
  handleUnsyncedHabitsThenRetrieveHabitsFromCloud,
  updateDayStreaks
} from './habit/habit-actions'
// import { createAndroidChannels } from './notifications'
import { prepareSleepDataFetching } from './sleep/health-kit-actions'
import { updateSubscriptionStatus } from './subscription/subscription-actions'

export const startup = (): AppThunk => async (dispatch, getState) => {
  const isAuthenticated = getAuthState(getState())
  const isUsingHealthKit = getIsHealthKitMainSource(getState())
  // Create necessary Android channels
  // if (Platform.OS === 'android') {
  //   await createAndroidChannels()
  // }

  await dispatch(handleUnsyncedHabitsThenRetrieveHabitsFromCloud())

  // Actions related to sleep data
  if (isUsingHealthKit) {
    await dispatch(prepareSleepDataFetching())
  }

  // Get Coaching Materials
  await dispatch(getAllWeeks())

  // await dispatch(fetchSleepData())

  await dispatch(updateSubscriptionStatus())
  await dispatch(refreshAuthStatus())
  await dispatch(updateDayStreaks())

  // await dispatch(handleBedtimeApproachNotifications())
  // await dispatch(handleCoachingUncompletedLessonNotifications())
  // await dispatch(handleCoachingLessonsInWeekNotifications())
}

export const backgroundAction = (): AppThunk => async (dispatch) => {
  // await dispatch(handleBedtimeApproachNotifications())
  // await dispatch(handleCoachingUncompletedLessonNotifications())
  // await dispatch(handleCoachingLessonsInWeekNotifications())
  // await dispatch(handleUnsyncedHabitsThenRetrieveHabitsFromCloud())
}
