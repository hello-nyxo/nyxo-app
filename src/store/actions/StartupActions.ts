import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { GetState } from '@typings/GetState'
import { Dispatch, Thunk } from '@typings/redux-actions'
import { Platform } from 'react-native'
import { refreshAuthStatus } from './auth/auth-actions'
import {
  updateCoachingInCloud,
  validateWeeklyProgress
} from './coaching/coaching-actions'
import { getAllWeeks } from './coaching/content-actions'
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
} from './notifications'
import { prepareSleepDataFetching } from './sleep/health-kit-actions'
import { updateSubscriptionStatus } from './subscription/subscription-actions'

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

  // Actions related to sleep data
  if (isUsingHealthKit) {
    await dispatch(prepareSleepDataFetching())
  }

  // Get Coaching Materials
  await dispatch(getAllWeeks())

  // await dispatch(fetchSleepData())

  await dispatch(updateSubscriptionStatus())
  await dispatch(refreshAuthStatus())
  await dispatch(validateWeeklyProgress())

  await dispatch(updateDayStreaks())

  if (isAuthenticated) {
    await dispatch(updateCoachingInCloud())
  }

  await dispatch(handleBedtimeApproachNotifications())
  await dispatch(handleCoachingUncompletedLessonNotifications())
  await dispatch(handleCoachingLessonsInWeekNotifications())
}

export const backgroundAction = (): Thunk => async (dispatch: Dispatch) => {
  // await dispatch(handleBedtimeApproachNotifications())
  // await dispatch(handleCoachingUncompletedLessonNotifications())
  // await dispatch(handleCoachingLessonsInWeekNotifications())
  // await dispatch(handleUnsyncedHabitsThenRetrieveHabitsFromCloud())
}

export const preFetchCoaching = (): Thunk => async (dispatch: Dispatch) => {
  useGetActiveCoaching()
}
