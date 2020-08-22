import {
  changeHealthKitSource,
  updateHealthKitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import { formatHealthKitResponse } from 'helpers/sleep/sleep-data-helper'
import moment from 'moment'
import { Platform } from 'react-native'
import {
  default as AppleHealthKit,
  default as appleHealthKit
} from 'react-native-healthkit'
import { getHealthKitSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import { SUB_SOURCE } from 'typings/state/sleep-source-state'
import { Dispatch, Thunk } from 'Types/ReduxActions'
import { GetState } from 'Types/GetState'
import { SleepDataSource } from '../../Types/SleepClockState'
import { HealthKitSleepResponse, Night } from '../../Types/Sleepdata'
import { fetchSleepData, formatSleepData } from './sleep-data-actions'

/* ACTION TYPES */

export const FETCH_SLEEP_HEALTH_KIT_START = 'FETCH_SLEEP_HEALTH_KIT_START'
export const FETCH_SLEEP_HEALTH_KIT_SUCCESS = 'FETCH_SLEEP_HEALTH_KIT_SUCCESS'
export const FETCH_SLEEP_HEALTH_KIT_FAILURE = 'FETCH_SLEEP_HEALTH_KIT_FAILURE'

export const SWITCH_HEALTH_KIT_SOURCE = 'SWITCH_HEALTH_KIT_SOURCE'

export const TOGGLE_HEALTH_KIT_AVAILABILITY = 'TOGGLE_HEALTH_KIT_AVAILABILITY'
export const TOGGLE_USE_HEALTH_KIT = 'TOGGLE_USE_HEALTH_KIT'
export const SET_HEALTH_KIT_STATUS = 'SET_HEALTH_KIT_STATUS'

/* ACTIONS */

export const setHealthKitStatus = (enabled: boolean) => ({
  type: SET_HEALTH_KIT_STATUS,
  payload: enabled
})

export const fetchHKSleepStart = () => ({
  type: FETCH_SLEEP_HEALTH_KIT_START
})

export const fetchHKSleepSuccess = () => ({
  type: FETCH_SLEEP_HEALTH_KIT_SUCCESS
})

export const fetchHKSleepFailure = () => ({
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

export const prepareSleepDataFetching = () => async (dispatch: Function) => {
  Platform.OS === 'ios' ? await dispatch(initHealthKit()) : null
}

export const initHealthKit = () => async (dispatch: Function) => {
  await AppleHealthKit.initHealthKit(healthKitOptions, (err, res) => {
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
  rawSleepData: HealthKitSleepResponse[] = []
): Thunk => async (dispatch: Dispatch, getState: GetState) => {
  const hkSource = getHealthKitSource(getState())

  const sourceList: SUB_SOURCE[] = [
    { sourceName: 'Nyxo', sourceId: 'app.sleepcircle.application' }
  ]

  rawSleepData.forEach((item: HealthKitSleepResponse) => {
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

export const fetchSleepFromHealthKit = () => async (dispatch: Function) => {
  dispatch(fetchHKSleepStart())
  const getDataFrom = moment().subtract(2, 'week').startOf('days').toISOString()

  const options = {
    startDate: getDataFrom
  }
  try {
    await appleHealthKit.getSleepSamples(
      options,
      async (error: any, response: any) => {
        if (error) {
          dispatch(fetchHKSleepFailure())
        }
        dispatch(createHealthKitSources(response))

        const formattedData: Night[] = response.map(
          (nightObject: HealthKitSleepResponse) =>
            formatHealthKitResponse(nightObject)
        )

        dispatch(formatSleepData(formattedData))
        dispatch(fetchHKSleepSuccess())
      }
    )
  } catch (error) {
    console.warn(error)
    dispatch(fetchHKSleepFailure())
  }
}
