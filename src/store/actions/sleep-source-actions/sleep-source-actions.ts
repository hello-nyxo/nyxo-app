import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setHealthKitStatus } from '@actions/sleep/health-kit-actions'
import { fetchSleepData } from '@actions/sleep/sleep-data-actions'
import AppleHealthKit from 'react-native-healthkit'
import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { GetState } from '@typings/GetState'
import ReduxAction, { Dispatch, Thunk } from '@typings/ReduxActions'
import { SOURCE, SUB_SOURCE } from '@typings/state/sleep-source-state'

const PERMS = AppleHealthKit.Constants.Permissions

const healthKitOptions = {
  permissions: {
    read: [PERMS.HeartRate, PERMS.ActiveEnergyBurned, PERMS.SleepAnalysis],
    write: [PERMS.SleepAnalysis]
  }
}

/* ACTION TYPES */

export const SET_MAIN_SOURCE = 'SET_MAIN_SOURCE'
export const CHANGE_HEALTH_KIT_SOURCE = 'CHANGE_HEALTH_KIT_SOURCE'
export const UPDATE_HEALTH_KIT_SOURCES = 'UPDATE_HEALTH_KIT_SOURCES'

export const CHANGE_GOOGLE_FIT_SOURCE = 'CHANGE_GOOGLE_FIT_SOURCE'
export const UPDATE_GOOGLE_FIT_SOURCES = 'UPDATE_GOOGLE_FIT_SOURCES'

/* ACTIONS */

export const setMainSource = (source: SOURCE): ReduxAction => ({
  type: SET_MAIN_SOURCE,
  payload: { mainSource: source }
})

export const changeHealthKitSource = (hkSource: SUB_SOURCE): ReduxAction => ({
  type: CHANGE_HEALTH_KIT_SOURCE,
  payload: { healthKitSource: hkSource }
})

export const updateHealthKitSources = (sources: SUB_SOURCE[]): ReduxAction => ({
  type: UPDATE_HEALTH_KIT_SOURCES,
  payload: { sources }
})

export const changeGoogleFitSource = (
  googleFitSource: SUB_SOURCE
): ReduxAction => ({
  type: CHANGE_GOOGLE_FIT_SOURCE,
  payload: { googleFitSource }
})

export const updateGoogleFitSources = (sources: SUB_SOURCE[]): ReduxAction => ({
  type: UPDATE_GOOGLE_FIT_SOURCES,
  payload: { sources }
})

/* ASYNC ACTIONS */

export const toggleHealthKit = (): Thunk => async (
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
    console.warn(err)
  }
}

export const setHealthKitAsSourceAndFetch = (): Thunk => async (
  dispatch: Dispatch
) => {
  await AppleHealthKit.initHealthKit(healthKitOptions, async (err, res) => {
    if (err) {
      await dispatch(setHealthKitStatus(false))
    } else {
      dispatch(setHealthKitStatus(true))
      await dispatch(fetchSleepData())
    }
  })
}
