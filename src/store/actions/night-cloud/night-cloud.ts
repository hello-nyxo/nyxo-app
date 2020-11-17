import { getFitbitSleep } from '@actions/api-actions/fitbit-actions'
import { getGarminSleep } from '@actions/api-actions/garmin-actions'
import { readGoogleFitSleep } from '@actions/api-actions/google-fit-actions'
import { getOuraSleep } from '@actions/api-actions/oura-actions'
import { getPolarSleep } from '@actions/api-actions/polar-actions'
import { getWithingsSleep } from '@actions/api-actions/withings-actions'
import { fetchSleepFromHealthKit } from '@actions/sleep/health-kit-actions'
import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { GetState } from '@typings/GetState'
import { Dispatch, Thunk } from '@typings/redux-actions'
import { SOURCE } from '@typings/state/sleep-source-state'
import { endOfDay, startOfDay } from 'date-fns'

export const fetchSleepData = (
  startDate: string = startOfDay(new Date()).toISOString(),
  endDate: string = endOfDay(new Date()).toISOString()
): Thunk => async (dispatch: Dispatch, getState: GetState) => {
  const source = getMainSource(getState())

  switch (source) {
    case SOURCE.HEALTH_KIT:
      dispatch(fetchSleepFromHealthKit(startDate, endDate))
      break
    case SOURCE.GOOGLE_FIT:
      dispatch(readGoogleFitSleep())
      break
    case SOURCE.FITBIT:
      dispatch(getFitbitSleep())
      break
    case SOURCE.OURA:
      dispatch(getOuraSleep(startDate, endDate))
      break
    case SOURCE.WITHINGS:
      dispatch(getWithingsSleep())
      break
    case SOURCE.GARMIN:
      dispatch(getGarminSleep())
      break
    case SOURCE.POLAR:
      dispatch(getPolarSleep(startDate, endDate))
      break

    default:
      break
  }
}
