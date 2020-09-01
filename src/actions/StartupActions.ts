import { Platform } from 'react-native'
import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { getWeek } from '@selectors/SleepDataSelectors'
import { Dispatch, Thunk } from 'Types/ReduxActions'
import { getAuthState } from '../store/Selectors/auth-selectors/auth-selectors'
import { GetState } from '../Types/GetState'
import { refreshAuthStatus } from './auth/auth-actions'
import {
  updateCoachingInCloud,
  validateWeeklyProgress
} from './coaching/coaching-actions'
import {
  handleUnsyncedHabitsThenRetrieveHabitsFromCloud,
  updateDayStreaks
} from './habit/habit-actions'
import { calculateInsights } from './insight-actions/insight-actions'
import {
  createAndroidChannels,
  handleBedtimeApproachNotifications,
  handleCoachingLessonsInWeekNotifications,
  handleCoachingUncompletedLessonNotifications
} from './NotificationActions'
import { prepareSleepDataFetching } from './sleep/health-kit-actions'
import { fetchSleepData, updateCalendar } from './sleep/sleep-data-actions'
import { updateSubscriptionStatus } from './subscription/subscription-actions'
import { getAllWeeks } from './coaching/content-actions'

export const startup = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const isAuthenticated = getAuthState(getState())
  const isUsingHealthKit = getIsHealthKitMainSource(getState())
  // Create necessary Android channels
  if (Platform.OS === 'android') {
    await createAndroidChannels()
  }

  await dispatch(handleUnsyncedHabitsThenRetrieveHabitsFromCloud())

  // await dispatch(pullSleepFromCloud());
  await dispatch(updateCalendar())

  // Actions related to sleep data
  if (isUsingHealthKit) {
    await dispatch(prepareSleepDataFetching())
  }

  // Get Coaching Materials
  await dispatch(getAllWeeks())

  await dispatch(fetchSleepData())

  await dispatch(updateSubscriptionStatus())
  await dispatch(refreshAuthStatus())
  // // Action related to coaching
  await dispatch(validateWeeklyProgress())

  await dispatch(updateDayStreaks())

  if (isAuthenticated) {
    await dispatch(updateCoachingInCloud())
  }
  await dispatch(calculateInsights())

  await dispatch(handleBedtimeApproachNotifications())
  await dispatch(handleCoachingUncompletedLessonNotifications())
  await dispatch(handleCoachingLessonsInWeekNotifications())
}

export const backgroundAction = (): Thunk => async (dispatch: Dispatch) => {
  await dispatch(updateCalendar())
  await dispatch(handleBedtimeApproachNotifications())
  await dispatch(handleCoachingUncompletedLessonNotifications())
  await dispatch(handleCoachingLessonsInWeekNotifications())
  await dispatch(handleUnsyncedHabitsThenRetrieveHabitsFromCloud())
}
