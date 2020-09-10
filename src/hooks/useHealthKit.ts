import { useQuery, QueryResult } from 'react-query'
import appleHealthKit, { SleepSample } from 'react-native-healthkit'
import { formatHealthKitResponse } from 'helpers/sleep/sleep-data-helper'
import { Night } from 'Types/Sleepdata'
import { endOfDay, startOfDay, subDays } from 'date-fns'

const getHealthKitData = async () => {
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

export const useHealthKit = (): QueryResult<Night[]> => {
  return useQuery('healthKit', getHealthKitData)
}
