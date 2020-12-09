import { recordGoogleFitSleep } from '@actions/api-actions/google-fit-actions'
import { fetchSleepData } from '@actions/sleep/sleep-data-actions'
import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { Value } from '@typings/Sleepdata'
import { SOURCE } from '@typings/state/sleep-source-state'
import moment from 'moment'
import AppleHealthKit, { SleepSample } from 'react-native-healthkit'
import { ManualSleepActions, SET_VALUES, TOGGLE_EDIT_MODE } from './types'

export const setValues = (
  start: { h: number; m: number },
  end: { h: number; m: number }
): ManualSleepActions => ({
  type: SET_VALUES,
  payload: { start, end }
})

export const toggleEditMode = (): ManualSleepActions => ({
  type: TOGGLE_EDIT_MODE
})

/* ASYNC ACTIONS */

export const addManualDataToNight = (
  date: string,
  nightStart: { h: number; m: number },
  nightEnd: { h: number; m: number }
): AppThunk => async (dispatch, getState) => {
  const source = getMainSource(getState())

  const startTime = moment(date)
    .startOf('day')
    .subtract(1, 'day')
    .hours(nightStart.h >= 18 ? nightStart.h : nightStart.h + 24)
    .minute(nightStart.m)
    .toISOString()

  const endTime = moment(date)
    .startOf('day')
    .subtract(1, 'day')
    .hours(nightEnd.h >= 18 ? nightEnd.h : nightEnd.h + 24)
    .minute(nightEnd.m)
    .toISOString()

  if (source === SOURCE.HEALTH_KIT) {
    await createNightHealthKit(startTime, endTime)
    await dispatch(fetchSleepData(startTime, endTime))
  } else if (source === SOURCE.GOOGLE_FIT) {
    await dispatch(recordGoogleFitSleep(startTime, endTime))
    await dispatch(fetchSleepData(startTime, endTime))
  }
}

export const createNightHealthKit = async (
  startTime: string,
  endTime: string,
  value?: Value
): Promise<void> => {
  if (!value) {
    const newNightBed = {
      startDate: startTime,
      endDate: endTime,
      value: Value.InBed
    }

    const newNightSleep = {
      startDate: startTime,
      endDate: endTime,
      value: Value.Asleep
    }

    await AppleHealthKit.saveSleep(
      newNightBed,
      (error: string, response: SleepSample[]) => {
        if (error) {
          throw error
        } else {
          return response
        }
      }
    )

    await AppleHealthKit.saveSleep(
      newNightSleep,
      (error: string, response: SleepSample[]) => {
        if (error) {
          throw error
        } else {
          return response
        }
      }
    )
  } else {
    const newNight = {
      value,
      startDate: startTime,
      endDate: endTime
    }
    await AppleHealthKit.saveSleep(
      newNight,
      (error: string, response: SleepSample[]) => {
        if (error) {
          throw error
        } else {
          return response
        }
      }
    )
  }
}
