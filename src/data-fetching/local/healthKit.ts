import { startOfDay, endOfDay, subDays } from 'date-fns'
import appleHealthKit, { SleepSample } from 'react-native-healthkit'
import { formatHealthKitResponse } from '@helpers/sleep/health-kit-helper'
import { Night } from '@typings/Sleepdata'

export const getHealthKitData = (startDate: string): Night[] => {
  const options = {
    startDate: startOfDay(subDays(new Date(), 800)).toISOString(),
    endDate: endOfDay(new Date()).toISOString()
  }

  let data: Night[] = []

  appleHealthKit.getSleepSamples(
    options,
    (error: string, response: Array<SleepSample>) => {
      if (error) {
        return error
      }
      data = response.map((nightObject) => formatHealthKitResponse(nightObject))
      return data
    }
  )

  return data
}
