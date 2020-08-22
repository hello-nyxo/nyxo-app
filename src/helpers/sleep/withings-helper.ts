import moment from 'moment'
import { WithingsSleepObject } from 'Types/Sleep/Withings'
import { Night, Value } from 'Types/Sleepdata'
import { getNightDuration } from 'helpers/sleep'

export const formatWithingsSample = (
  withingsSleepObject: WithingsSleepObject
): Night[] => {
  const {
    data: { durationtosleep = 0, durationtowakeup = 0 }
  } = withingsSleepObject

  const startDate = moment.unix(withingsSleepObject.startdate).toISOString()
  const endDate = moment.unix(withingsSleepObject.enddate).toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedSample: Night = {
    sourceId: 'com.withings.wiScaleNG',
    sourceName: 'Withings',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  const asleepStartDate = moment(startDate)
    .add(durationtosleep, 'seconds')
    .toISOString()
  const asleepEndDate = moment(endDate)
    .subtract(durationtowakeup, 'seconds')
    .toISOString()

  const timeAsleep = getNightDuration(asleepStartDate, asleepEndDate)

  const asleepSamples: Night = {
    sourceId: 'com.withings.wiScaleNG',
    sourceName: 'Withings',
    value: Value.Asleep,
    startDate: asleepStartDate,
    endDate: asleepEndDate,
    totalDuration: timeAsleep
  }

  return [inBedSample, asleepSamples]
}

export const formatWithingsSamples = (
  samples: WithingsSleepObject[]
): Night[] => {
  const nights: Night[] = []
  samples.forEach((sample) => {
    nights.push(...formatWithingsSample(sample))
  })
  return nights
}
