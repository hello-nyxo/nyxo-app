import { refreshAuthStatus } from '@reducers/auth'
import { updateSubscriptionStatus } from '@reducers/subscription'
import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { prepareSleepDataFetching } from './sleep/health-kit-actions'

export const startup = (): AppThunk => async (dispatch, getState) => {
  const isUsingHealthKit = getIsHealthKitMainSource(getState())

  if (isUsingHealthKit) {
    await dispatch(prepareSleepDataFetching())
  }

  await dispatch(updateSubscriptionStatus())
  await dispatch(refreshAuthStatus())
}
