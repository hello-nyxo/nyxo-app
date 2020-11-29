import { fetchSleepData } from '@actions/sleep/sleep-data-actions'
import { getNightDuration } from '@helpers/sleep/sleep'
import { GetState } from '@typings/GetState'
import { Dispatch, Thunk } from '@typings/redux-actions'
import { Night, Value } from '@typings/Sleepdata'
import moment from 'moment'
import { Platform } from 'react-native'
import AppleHealthKit, { SleepSample } from 'react-native-healthkit'

export const SET_VALUES = 'SET_VALUES'
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'

export const setValues = (
  start: { h: number; m: number },
  end: { h: number; m: number }
) => ({
  type: SET_VALUES,
  payload: { start, end }
})

export const toggleEditMode = () => ({
  type: TOGGLE_EDIT_MODE
})

export const addManualDataToNight = (
  date: string,
  nightStart: { h: number; m: number },
  nightEnd: { h: number; m: number }
): Thunk => async (dispatch: Dispatch, getState: GetState) => {
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

  const newNightSample: Night = {
    source: 'Nyxo',
    sourceId: 'app.sleepcircle.application',
    sourceName: 'Nyxo',
    value: Value.InBed,
    startDate: startTime,
    endDate: endTime,
    totalDuration: getNightDuration(startTime, endTime)
  }

  if (Platform.OS === 'ios') {
    await createNight(startTime, endTime)
    await dispatch(fetchSleepData(startTime, endTime))
  }
}

export const createNight = async (
  startTime: string,
  endTime: string,
  value?: Value
) => {
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
