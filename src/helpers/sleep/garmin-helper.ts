import { Night, Value } from '@typings/Sleepdata'
import { GarminSleepObject } from '@typings/sources/Garmin'
import { getNightDuration } from '@helpers/sleep/sleep'
import CONFIG from '@config/config'
import { captureException } from '@sentry/react-native'

export const formatGarminSample = (
  garminSleepObject: GarminSleepObject
): Night[] => {
  const startDate = new Date(
    garminSleepObject.startTimeInSeconds +
      garminSleepObject.startTimeOffsetInSeconds
  ).toISOString()
  const endDate = new Date(
    startDate.valueOf() + garminSleepObject.durationInSeconds
  ).toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedSample: Night = {
    id: `garmin_${startDate}_${endDate}_${Value.InBed}`,
    sourceId: 'com.garmin.connect.mobile',
    sourceName: 'Garmin',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  const asleepSamples: Night[] = []

  Object.values(garminSleepObject.sleepLevelsMap).forEach((value) => {
    if (value) {
      value.forEach((level) => {
        const asleepStartDate = new Date(level.startTimeInSeconds).toISOString()
        const asleepEndDate = new Date(level.endTimeInSeconds).toISOString()
        const timeAsleep = getNightDuration(asleepStartDate, asleepEndDate)

        asleepSamples.push({
          id: `garmin_${startDate}_${endDate}_${Value.Asleep}`,
          sourceId: 'com.garmin.connect.mobile',
          sourceName: 'Garmin',
          value: Value.Asleep,
          startDate: asleepStartDate,
          endDate: asleepEndDate,
          totalDuration: timeAsleep
        })
      })
    }
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

export const generateSleepApiCall = async (
  accessToken: string,
  accessTokenSecret: string,
  uploadStartTimeInSeconds: number,
  uploadEndTimeInSeconds: number
): Promise<Response | undefined> => {
  return fetch(CONFIG.GARMIN_CONFIG.GET_SLEEP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      accessTokenSecret,
      uploadStartTimeInSeconds,
      uploadEndTimeInSeconds
    })
  }).catch((error) => {
    captureException(error)
    return undefined
  })
}
