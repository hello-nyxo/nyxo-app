import CONFIG from '@config/Config'
import { getNightDuration } from '@helpers/sleep/sleep'
import { WithingsSleepObject } from '@typings/Sleep/Withings'
import { Night, Value } from '@typings/Sleepdata'
import moment from 'moment'
import { generateNightId } from './night-id-generator'

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
    id: `withings_${withingsSleepObject.date}_${startDate}_${endDate}_${Value.InBed}`,
    sourceId: CONFIG.WITHINGS_CONFIG.bundleId,
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

  const asleepSample: Night = {
    id: `withings_${withingsSleepObject.date}_${asleepStartDate}_${asleepEndDate}_${Value.Asleep}`,
    sourceId: CONFIG.WITHINGS_CONFIG.bundleId,
    sourceName: 'Withings',
    value: Value.Asleep,
    startDate: asleepStartDate,
    endDate: asleepEndDate,
    totalDuration: timeAsleep
  }

  return [inBedSample, asleepSample]
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
