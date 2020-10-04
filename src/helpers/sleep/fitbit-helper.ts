import CONFIG from '@config/Config'
import moment from 'moment'
import { FitbitSleepObject } from '@typings/Sleep/Fitbit'
import { Night, Value } from '@typings/Sleepdata'

export const formatFitbitSample = (
  fitbitObject: FitbitSleepObject
): Night[] => {
  const startDate = moment(fitbitObject.startTime).toISOString()
  const endDate = moment(fitbitObject.endTime).toISOString()
  const totalDuration = fitbitObject.timeInBed

  const inBedSample: Night = {
    id: `${fitbitObject.logId}_${Value.InBed}_${startDate}_${endDate}`,
    sourceId: CONFIG.FITBIT_CONFIG.bundleId,
    sourceName: 'Fitbit',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration
  }

  const asleepSamples: Night[] = fitbitObject.levels.data.map((sample) => {
    const start = moment(sample.dateTime).toISOString()
    const end = moment(sample.dateTime).add(sample.seconds).toISOString()

    return {
      id: `${fitbitObject.logId}_${Value.Asleep}_${start}_${end}`,
      sourceId: CONFIG.FITBIT_CONFIG.bundleId,
      sourceName: 'Fitbit',
      value: Value.Asleep,
      startDate: start,
      endDate: end,
      totalDuration: Math.floor(sample.seconds / 60)
    }
  })

  return [inBedSample, ...asleepSamples]
}

export const formatFitbitSamples = (samples: FitbitSleepObject[]): Night[] => {
  const nights: Night[] = []

  samples.forEach((sample) => {
    nights.push(...formatFitbitSample(sample))
  })

  return nights
}
