import { toggleFitbit } from '@actions/api-actions/fitbit-actions'
import { toggleGarmin } from '@actions/api-actions/garmin-actions'
import { toggleGoogleFit } from '@actions/api-actions/google-fit-actions'
import { toggleOura } from '@actions/api-actions/oura-actions'
import { togglePolar } from '@actions/api-actions/polar-actions'
import { toggleWithings } from '@actions/api-actions/withings-actions'
import { toggleHealthKit } from '@actions/sleep-source-actions/sleep-source-actions'
import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { SOURCE } from '@typings/state/sleep-source-state'

export const revokePreviousSource = (): AppThunk => async (
  dispatch,
  getState
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
