import { SOURCE } from '@typings/state/sleep-source-state'
import { toggleHealthKit } from '@actions/sleep-source-actions/sleep-source-actions'
import { toggleGoogleFit } from '@actions/api-actions/google-fit-actions'
import { toggleFitbit } from '@actions/api-actions/fitbit-actions'
import { Thunk, Dispatch } from '@typings/redux-actions'
import { GetState } from '@typings/GetState'
import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { toggleOura } from '@actions/api-actions/oura-actions'
import { toggleWithings } from '@actions/api-actions/withings-actions'
import { toggleGarmin } from '@actions/api-actions/garmin-actions'
import { togglePolar } from '@actions/api-actions/polar-actions'

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
      break
    case SOURCE.WITHINGS:
      await dispatch(toggleWithings())
      break
    case SOURCE.GARMIN:
      await dispatch(toggleGarmin())
      break
    case SOURCE.POLAR:
      await dispatch(togglePolar())
      break

    default:
      break
  }
}
