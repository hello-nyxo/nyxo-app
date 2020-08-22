import moment from 'moment'
import { Night, Value } from '../../Types/Sleepdata'
import { FitbitSleepObject } from '../../Types/Sleep/Fitbit'

export const formatFitbitSample = (
  fitbitObject: FitbitSleepObject
): Night[] => {
  const startDate = moment(fitbitObject.startTime).toISOString()
  const endDate = moment(fitbitObject.endTime).toISOString()
  const totalDuration = fitbitObject.timeInBed

  const inBedSample: Night = {
    sourceId: 'com.fitbit.FitbitMobilet',
    sourceName: 'Fitbit',
    value: Value.InBed,
    startDate: moment(startDate).toISOString(),
    endDate: moment(endDate).toISOString(),
    totalDuration
  }

  const asleepSamples: Night[] = fitbitObject.levels.data.map((sample) => ({
    sourceId: 'com.fitbit.FitbitMobilet',
    sourceName: 'Fitbit',
    value: Value.Asleep,
    startDate: moment(sample.dateTime).toISOString(),
    endDate: moment(sample.dateTime).add(sample.seconds).toISOString(),
    totalDuration: Math.floor(sample.seconds / 60)
  }))

  return [inBedSample, ...asleepSamples]
}

export const formatFitbitSamples = (samples: FitbitSleepObject[]): Night[] => {
  const nights: Night[] = []

  samples.forEach((sample) => {
    nights.push(...formatFitbitSample(sample))
  })

  return nights
}
