import moment from 'moment'
import { Night, Value } from 'Types/Sleepdata'
import { FitbitSleepObject } from 'Types/Sleep/Fitbit'
import { generateNightId } from './night-id-generator'
import CONFIG from 'config/Config'

export const formatFitbitSample = (
  fitbitObject: FitbitSleepObject
): Night[] => {
  const startDate = moment(fitbitObject.startTime).toISOString()
  const endDate = moment(fitbitObject.endTime).toISOString()
  const totalDuration = fitbitObject.timeInBed

  const inBedNightId = (<unknown>(
    generateNightId(
      'fitbit',
      `${fitbitObject.logId}`,
      startDate,
      endDate,
      Value.InBed
    )
  )) as string

  const inBedSample: Night = {
    id: inBedNightId,
    sourceId: CONFIG.FITBIT_CONFIG.bundleId,
    sourceName: 'Fitbit',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration
  }

  const asleepSamples: Night[] = fitbitObject.levels.data.map((sample) => {
    const startDate = moment(sample.dateTime).toISOString()
    const endDate = moment(sample.dateTime).add(sample.seconds).toISOString()
    const asleepNightId = generateNightId(
      'fitbit',
      `${fitbitObject.logId}`,
      startDate,
      endDate,
      Value.Asleep
    )

    return {
      id: asleepNightId,
      sourceId: CONFIG.FITBIT_CONFIG.bundleId,
      sourceName: 'Fitbit',
      value: Value.Asleep,
      startDate,
      endDate,
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
