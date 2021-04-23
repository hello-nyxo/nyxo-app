import CONFIG from '@config/config'
import { FitbitSleepObject } from '@typings/sources/Fitbit'
import { Night, Value } from '@typings/Sleepdata'
import { addSeconds } from 'date-fns'

export const formatFitbitSample = (
  fitbitObject: FitbitSleepObject
): Night[] => {
  const startDate = new Date(fitbitObject.startTime).toISOString()
  const endDate = new Date(fitbitObject.endTime).toISOString()
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
    const start = new Date(sample.dateTime).toISOString()
    const end = addSeconds(
      new Date(sample.dateTime),
      sample.seconds
    ).toISOString()

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
