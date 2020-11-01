import {
  changeHealthKitSource,
  updateHealthKitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import { formatHealthKitResponse } from '@helpers/sleep/health-kit-helper'
import { getHealthKitSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { GetState } from '@typings/GetState'
import ReduxAction, { Dispatch, Thunk } from '@typings/redux-actions'
import { SleepDataSource } from '@typings/SleepClockState'
import { Night } from '@typings/Sleepdata'
import { SUB_SOURCE } from '@typings/state/sleep-source-state'
import { endOfDay, startOfDay, subDays } from 'date-fns'
import { Platform } from 'react-native'
import AppleHealthKit, { SleepSample } from 'react-native-healthkit'
import { syncNightsToCloud } from './night-cloud-actions'
import { fetchSleepData } from './sleep-data-actions'

/* ACTION TYPES */

export const FETCH_SLEEP_HEALTH_KIT_START = 'FETCH_SLEEP_HEALTH_KIT_START'
export const FETCH_SLEEP_HEALTH_KIT_SUCCESS = 'FETCH_SLEEP_HEALTH_KIT_SUCCESS'
export const FETCH_SLEEP_HEALTH_KIT_FAILURE = 'FETCH_SLEEP_HEALTH_KIT_FAILURE'
export const FETCH_SLEEP_SUCCESS = 'FETCH_SLEEP_SUCCESS'

export const SWITCH_HEALTH_KIT_SOURCE = 'SWITCH_HEALTH_KIT_SOURCE'

export const TOGGLE_HEALTH_KIT_AVAILABILITY = 'TOGGLE_HEALTH_KIT_AVAILABILITY'
export const TOGGLE_USE_HEALTH_KIT = 'TOGGLE_USE_HEALTH_KIT'
export const SET_HEALTH_KIT_STATUS = 'SET_HEALTH_KIT_STATUS'

/* ACTIONS */

export const setHealthKitStatus = (enabled: boolean): ReduxAction => ({
  type: SET_HEALTH_KIT_STATUS,
  payload: enabled
})

export const fetchHKSleepStart = (): ReduxAction => ({
  type: FETCH_SLEEP_HEALTH_KIT_START
})

export const fetchHKSleepSuccess = (): ReduxAction => ({
  type: FETCH_SLEEP_HEALTH_KIT_SUCCESS
})

export const fetchSleepSuccess = (night: Night[]): ReduxAction => ({
  type: FETCH_SLEEP_SUCCESS,
  payload: night
})

export const fetchHKSleepFailure = (): ReduxAction => ({
  type: FETCH_SLEEP_HEALTH_KIT_FAILURE
})

/* ASYNC ACTIONS */

const PERMS = AppleHealthKit.Constants.Permissions

const healthKitOptions = {
  permissions: {
    read: [PERMS.HeartRate, PERMS.ActiveEnergyBurned, PERMS.SleepAnalysis],
    write: [PERMS.SleepAnalysis]
  }
}

export const prepareSleepDataFetching = (): Thunk => async (
  dispatch: Dispatch
) => {
  if (Platform.OS === 'ios') {
    await dispatch(initHealthKit())
  }
}

export const initHealthKit = (): Thunk => async (dispatch: Dispatch) => {
  await AppleHealthKit.initHealthKit(healthKitOptions, (err) => {
    if (err) {
      dispatch(setHealthKitStatus(false))
    } else {
      dispatch(setHealthKitStatus(true))
    }
  })
}

/**
 * Switches tracking source and gets all the new data
 * @todo fix so that it does not always fetch all the data
 * @param {Array} nights Unfiltered night data from Healthkit
 *
 */
export const switchHKSourceAndFetch = (hkSource: SUB_SOURCE): Thunk => async (
  dispatch: Dispatch
) => {
  dispatch(changeHealthKitSource(hkSource))
  dispatch(fetchSleepData())
}

export const createHealthKitSources = (
  rawSleepData: SleepSample[] = []
): Thunk => async (dispatch: Dispatch, getState: GetState) => {
  const hkSource = getHealthKitSource(getState())

  const sourceList: SUB_SOURCE[] = [
    { sourceName: 'Nyxo', sourceId: 'app.sleepcircle.application' }
  ]

  rawSleepData.forEach((item: SleepSample) => {
    const existingSource = sourceList.find(
      (source: SleepDataSource) => source.sourceId === item.sourceId
    )

    if (!existingSource) {
      sourceList.push({
        sourceName: item.sourceName,
        sourceId: item.sourceId
      })
    }
  })

  dispatch(updateHealthKitSources(sourceList))
  const noSleepTrackersInState = !hkSource

  if (noSleepTrackersInState) {
    const tracker = sourceList[1] ? sourceList[1] : sourceList[0]
    await dispatch(changeHealthKitSource(tracker))
  }
}

export const fetchSleepFromHealthKit = (
  startDate?: string,
  endDate?: string
): Thunk => async (dispatch: Dispatch) => {
  dispatch(fetchHKSleepStart())

  const options = {
    startDate: startOfDay(subDays(new Date(), 365)).toISOString(),
    endDate: endOfDay(new Date()).toISOString()
  }

  try {
    await AppleHealthKit.getSleepSamples(
      options,
      async (error: string, response: Array<SleepSample>) => {
        if (error) {
          dispatch(fetchHKSleepFailure())
        }
        // dispatch(createHealthKitSources(response))

        const formattedData: Night[] = response?.map((nightObject) =>
          formatHealthKitResponse(nightObject)
        )

        await dispatch(syncNightsToCloud(formattedData))
        await dispatch(fetchSleepSuccess(formattedData))
      }
    )
  } catch (error) {
    dispatch(fetchHKSleepFailure())
  } finally {
    dispatch(fetchHKSleepSuccess())
  }
}
