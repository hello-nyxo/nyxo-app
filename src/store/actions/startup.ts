import { refreshAuthStatus } from '@reducers/auth'
import { updateSubscriptionStatus } from '@reducers/subscription'
import { AppThunk } from '@typings/redux-actions'

export const startup = (): AppThunk => async (dispatch) => {
  await dispatch(updateSubscriptionStatus())
  await dispatch(refreshAuthStatus())
}
