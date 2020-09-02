import moment from 'moment'
import { Platform } from 'react-native'
import AppleHealthKit from 'react-native-healthkit'
import {
  getAngleAM,
  getNightDuration,
  sortDays,
  sortNights
} from '@helpers/sleep'
import { GetState } from 'Types/GetState'
import { Day, Value, Night } from 'Types/Sleepdata'
import { updateSleepData } from '../sleep/sleep-data-actions'
import { Dispatch, Thunk } from 'Types/ReduxActions'

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
  const {
    sleepclock: { days, nights }
  } = getState()

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

  const dayToUpdate = days.find((day: Day) => day.date === date)
  const filteredDays = days.filter((day: Day) => day.date !== date)

  const newNightSample: Night = {
    source: 'Nyxo',
    sourceId: 'app.sleepcircle.application',
    sourceName: 'Nyxo',
    value: Value.InBed,
    startDate: startTime,
    endDate: endTime,
    totalDuration: getNightDuration(startTime, endTime)
  }

  if (dayToUpdate) {
    const updatedDay: Day = {
      ...dayToUpdate,
      night: [...dayToUpdate.night, newNightSample]
    }

    const sortedDays = sortDays([...filteredDays, updatedDay])
    const sortedNights = sortNights([...nights, newNightSample])

    if (Platform.OS === 'ios') {
      await createNight(startTime, endTime)
    }

    await dispatch(
      updateSleepData({
        days: sortedDays,
        nights: sortedNights
      })
    )
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

    await AppleHealthKit.saveSleep(newNightBed, (error: any, response: any) => {
      if (error) {
        throw error
      } else {
        return response
      }
    })

    await AppleHealthKit.saveSleep(
      newNightSleep,
      (error: any, response: any) => {
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
    await AppleHealthKit.saveSleep(newNight, (error: any, response: any) => {
      if (error) {
        throw error
      } else {
        return response
      }
    })
  }
}
