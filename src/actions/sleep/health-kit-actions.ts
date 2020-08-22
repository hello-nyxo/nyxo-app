import {
  changeHealthKitSource,
  updateHealthKitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import { formatHealthKitResponse } from 'helpers/sleep/sleep-data-helper'
import moment from 'moment'
import { Platform } from 'react-native'
import AppleHealthKit, { SleepSample } from 'react-native-healthkit'
import { getHealthKitSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import { SUB_SOURCE } from 'typings/state/sleep-source-state'
import ReduxAction, { Dispatch, Thunk } from 'Types/ReduxActions'
import { GetState } from 'Types/GetState'
import { SleepDataSource } from '../../Types/SleepClockState'
import { HealthKitSleepResponse, Night } from '../../Types/Sleepdata'
import { fetchSleepData, formatSleepData } from './sleep-data-actions'
import { syncNightsToCloud } from './night-cloud-actions'

/* ACTION TYPES */

export const FETCH_SLEEP_HEALTH_KIT_START = 'FETCH_SLEEP_HEALTH_KIT_START'
export const FETCH_SLEEP_HEALTH_KIT_SUCCESS = 'FETCH_SLEEP_HEALTH_KIT_SUCCESS'
export const FETCH_SLEEP_HEALTH_KIT_FAILURE = 'FETCH_SLEEP_HEALTH_KIT_FAILURE'

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

export const fetchSleepFromHealthKit = (): Thunk => async (
  dispatch: Dispatch
) => {
  dispatch(fetchHKSleepStart())
  const getDataFrom = moment().subtract(2, 'week').startOf('days').toISOString()

  const options = {
    startDate: getDataFrom
  }
  try {
    await AppleHealthKit.getSleepSamples(
      options,
      async (error: string, response: Array<SleepSample>) => {
        if (error) {
          dispatch(fetchHKSleepFailure())
        }
        dispatch(createHealthKitSources(response))
        console.log(response)

        const formattedData: Night[] = response?.map((nightObject) =>
          formatHealthKitResponse(nightObject)
        )

        console.log(formattedData)

        await dispatch(syncNightsToCloud(formattedData))
        await dispatch(formatSleepData(formattedData))
        await dispatch(fetchHKSleepSuccess())
      }
    )
  } catch (error) {
    console.warn(error)
    dispatch(fetchHKSleepFailure())
  } finally {
    await dispatch(fetchHKSleepSuccess())
  }
}
