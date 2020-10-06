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
    id: `fitbit_${fitbitObject.logId}_${startDate}_${endDate}_${Value.InBed}`,
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
      id: `fitbit_${fitbitObject.logId}_${start}_${end}_${Value.Asleep}`,
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
