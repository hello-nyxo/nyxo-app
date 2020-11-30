import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setHealthKitStatus } from '@actions/sleep/health-kit-actions'
import { fetchSleepData } from '@actions/sleep/sleep-data-actions'
import AppleHealthKit from 'react-native-healthkit'
import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { GetState } from '@typings/GetState'
import { AppThunk, Dispatch } from '@typings/redux-actions'
import { SOURCE, SUB_SOURCE } from '@typings/state/sleep-source-state'
import { subDays } from 'date-fns'
import { captureException } from '@sentry/react-native'
import {
  SET_MAIN_SOURCE,
  CHANGE_HEALTH_KIT_SOURCE,
  UPDATE_HEALTH_KIT_SOURCES,
  CHANGE_GOOGLE_FIT_SOURCE,
  UPDATE_GOOGLE_FIT_SOURCES,
  SleepSourceActions
} from './types'

const PERMS = AppleHealthKit.Constants.Permissions

const healthKitOptions = {
  permissions: {
    read: [PERMS.HeartRate, PERMS.ActiveEnergyBurned, PERMS.SleepAnalysis],
    write: [PERMS.SleepAnalysis]
  }
}

/* ACTIONS */

export const setMainSource = (source: SOURCE): SleepSourceActions => ({
  type: SET_MAIN_SOURCE,
  payload: { mainSource: source }
})

export const changeHealthKitSource = (
  hkSource: SUB_SOURCE
): SleepSourceActions => ({
  type: CHANGE_HEALTH_KIT_SOURCE,
  payload: { healthKitSource: hkSource }
})

export const updateHealthKitSources = (
  sources: SUB_SOURCE[]
): SleepSourceActions => ({
  type: UPDATE_HEALTH_KIT_SOURCES,
  payload: { sources }
})

export const changeGoogleFitSource = (
  googleFitSource: SUB_SOURCE
): SleepSourceActions => ({
  type: CHANGE_GOOGLE_FIT_SOURCE,
  payload: { googleFitSource }
})

export const updateGoogleFitSources = (
  sources: SUB_SOURCE[]
): SleepSourceActions => ({
  type: UPDATE_GOOGLE_FIT_SOURCES,
  payload: { sources }
})

/* ASYNC ACTIONS */

export const toggleHealthKit = (): AppThunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const isHealthKitMainSource = getIsHealthKitMainSource(getState())

  try {
    if (isHealthKitMainSource) {
      dispatch(setMainSource(SOURCE.NO_SOURCE))
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(setHealthKitAsSourceAndFetch())
      await dispatch(setMainSource(SOURCE.HEALTH_KIT))
    }
  } catch (err) {
    captureException(err)
  }
}

export const setHealthKitAsSourceAndFetch = (): AppThunk => async (
  dispatch: Dispatch
) => {
  await AppleHealthKit.initHealthKit(healthKitOptions, async (err, res) => {
    if (err) {
      captureException(err)
      await dispatch(setHealthKitStatus(false))
    } else {
      dispatch(setHealthKitStatus(true))
      await dispatch(
        fetchSleepData(
          subDays(new Date(), 15).toISOString(),
          new Date().toISOString()
        )
      )
    }
  })
}
