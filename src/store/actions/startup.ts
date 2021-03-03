import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { refreshAuthStatus } from './auth/auth-actions'
import {
  handleUnsyncedHabitsThenRetrieveHabitsFromCloud,
  updateDayStreaks
} from './habit/habit-actions'
import { prepareSleepDataFetching } from './sleep/health-kit-actions'
import { updateSubscriptionStatus } from './subscription/subscription-actions'

export const startup = (): AppThunk => async (dispatch, getState) => {
  const isUsingHealthKit = getIsHealthKitMainSource(getState())

  await dispatch(handleUnsyncedHabitsThenRetrieveHabitsFromCloud())

  if (isUsingHealthKit) {
    await dispatch(prepareSleepDataFetching())
  }

  await dispatch(updateSubscriptionStatus())
  await dispatch(refreshAuthStatus())
  await dispatch(updateDayStreaks())
}
