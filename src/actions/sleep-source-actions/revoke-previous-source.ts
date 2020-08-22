import { SOURCE } from 'typings/state/sleep-source-state'
import { toggleHealthKit } from '@actions/sleep-source-actions/sleep-source-actions'
import { toggleGoogleFit } from '@actions/api-actions/google-fit-actions'
import { toggleFitbit } from '@actions/api-actions/fitbit-actions'
import { Thunk, Dispatch } from 'Types/ReduxActions'
import { GetState } from 'Types/GetState'
import { getMainSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import { toggleOura } from '@actions/api-actions/oura-actions'
import { toggleWithings } from '@actions/api-actions/withings-actions'

export const revokePreviousSource = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const currentSource = getMainSource(getState())

  switch (currentSource) {
    case SOURCE.HEALTH_KIT:
      await dispatch(toggleHealthKit())
      break
    case SOURCE.GOOGLE_FIT:
      await dispatch(toggleGoogleFit())
      break
    case SOURCE.FITBIT:
      await dispatch(toggleFitbit())
      break
    case SOURCE.OURA:
      await dispatch(toggleOura())
    case SOURCE.WITHINGS:
      await dispatch(toggleWithings())
      break
    default:
      break
  }
}
