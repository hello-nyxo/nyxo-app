import moment from 'moment'
import { Night, Value } from '@typings/Sleepdata'
import { GarminSleepObject } from '@typings/Sleep/Garmin'
import { getNightDuration } from '@helpers/sleep/sleep'

export const formatGarminSample = (
  garminSleepObject: GarminSleepObject
): Night[] => {
  const startDate = moment
    .unix(
      garminSleepObject.startTimeInSeconds +
        garminSleepObject.startTimeOffsetInSeconds
    )
    .toISOString()
  const endDate = moment
    .unix(moment(startDate).valueOf() + garminSleepObject.durationInSeconds)
    .toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedSample: Night = {
    sourceId: 'com.garmin.connect.mobile',
    sourceName: 'Garmin',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  const asleepSamples: Night[] = []

  Object.values(garminSleepObject.sleepLevelsMap).forEach((value) => {
    value?.forEach((level) => {
      const asleepStartDate = moment
        .unix(level.startTimeInSeconds)
        .toISOString()
      const asleepEndDate = moment.unix(level.endTimeInSeconds).toISOString()
      const timeAsleep = getNightDuration(asleepStartDate, asleepEndDate)

      asleepSamples.push({
        sourceId: 'com.garmin.connect.mobile',
        sourceName: 'Garmin',
        value: Value.Asleep,
        startDate: asleepStartDate,
        endDate: asleepEndDate,
        totalDuration: timeAsleep
      })
    })
  })

  return [inBedSample, ...asleepSamples]
}

export const formatGarminSamples = (samples: GarminSleepObject[]): Night[] => {
  const nights: Night[] = []
  if (samples) {
    samples.forEach((sample) => {
      nights.push(...formatGarminSample(sample))
    })
  }

  return nights
}
