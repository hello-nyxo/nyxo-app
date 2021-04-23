import {
  changeHealthKitSource,
  updateHealthKitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import { formatHealthKitResponse } from '@helpers/sleep/health-kit-helper'
import { getStartEndWeek } from '@helpers/sleep/sleep'
import { getHealthKitSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { SleepDataSource } from '@typings/SleepClockState'
import { Night } from '@typings/Sleepdata'
import { SUB_SOURCE } from '@typings/state/sleep-source-state'
import { Platform } from 'react-native'
import AppleHealthKit, { SleepSample } from 'react-native-healthkit'
import { fetchSleepData } from './sleep-data-actions'
import {
  FETCH_SLEEP_HEALTH_KIT_FAILURE,
  FETCH_SLEEP_HEALTH_KIT_START,
  FETCH_SLEEP_HEALTH_KIT_SUCCESS,
  FETCH_SLEEP_SUCCESS,
  SET_HEALTH_KIT_STATUS,
  SleepActions
} from './types'

/* ACTIONS */

export const setHealthKitStatus = (enabled: boolean): SleepActions => ({
  type: SET_HEALTH_KIT_STATUS,
  payload: enabled
})

export const fetchHKSleepStart = (): SleepActions => ({
  type: FETCH_SLEEP_HEALTH_KIT_START
})

export const fetchHKSleepSuccess = (): SleepActions => ({
  type: FETCH_SLEEP_HEALTH_KIT_SUCCESS
})

export const fetchSleepSuccess = (nights: Night[]): SleepActions => ({
  type: FETCH_SLEEP_SUCCESS,
  payload: nights
})

export const fetchHKSleepFailure = (): SleepActions => ({
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

export const prepareSleepDataFetching = (): AppThunk => async (dispatch) => {
  if (Platform.OS === 'ios') {
    await dispatch(initHealthKit())
  }
}

export const initHealthKit = (): AppThunk => async (dispatch) => {
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
export const switchHKSourceAndFetch = (
  hkSource: SUB_SOURCE
): AppThunk => async (dispatch) => {
  dispatch(changeHealthKitSource(hkSource))
  const { startDate, endDate } = getStartEndWeek()
  dispatch(fetchSleepData(startDate, endDate))
}

export const createHealthKitSources = (
  data: SleepSample[] = []
): AppThunk => async (dispatch, getState) => {
  const hkSource = getHealthKitSource(getState())

  const sourceList: SUB_SOURCE[] = [
    { sourceName: 'Nyxo', sourceId: 'app.sleepcircle.application' }
  ]

  data.forEach((item: SleepSample) => {
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
    const tracker = sourceList.length > 1 ? sourceList[1] : sourceList[0]
    await dispatch(changeHealthKitSource(tracker))
  }
}

export const fetchSleepFromHealthKit = (
  startDate?: string,
  endDate?: string
): AppThunk => async (dispatch) => {
  dispatch(fetchHKSleepStart())
  const options = {
    startDate,
    endDate
  }

  try {
    AppleHealthKit.getSleepSamples(
      options,
      async (error: string, response: Array<SleepSample>) => {
        if (error) {
          dispatch(fetchHKSleepFailure())
        }
        dispatch(createHealthKitSources(response))

        const formattedData: Night[] = response?.map((nightObject) =>
          formatHealthKitResponse(nightObject)
        )
        await dispatch(fetchSleepSuccess(formattedData))
      }
    )
  } catch (error) {
    dispatch(fetchHKSleepFailure())
  } finally {
    dispatch(fetchHKSleepSuccess())
  }
}
