import Moment from 'moment'
import AppleHealthKit from 'react-native-healthkit'
import { Value } from 'Types/Sleepdata'

export const updateData = () => async (dispatch: Function) => {}

export const createNight = (
  startTime: string,
  endTime: string,
  value?: Value
) => async (dispatch: Function) => {
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
      (error: any, response: any) => {}
    )

    await AppleHealthKit.saveSleep(
      newNightSleep,
      (error: any, response: any) => {}
    )
  } else {
    const newNight = {
      value,
      startDate: startTime,
      endDate: endTime
    }
    await AppleHealthKit.saveSleep(newNight, (error: any, response: any) => {})
  }
}
