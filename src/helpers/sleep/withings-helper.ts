import moment from 'moment'
import { WithingsSleepObject } from 'Types/Sleep/Withings'
import { Night, Value } from 'Types/Sleepdata'
import { getNightDuration } from 'helpers/sleep'
import { generateNightId } from './night-id-generator'
import CONFIG from 'config/Config'

export const formatWithingsSample = (
  withingsSleepObject: WithingsSleepObject
): Night[] => {
  const {
    data: { durationtosleep = 0, durationtowakeup = 0 }
  } = withingsSleepObject

  const startDate = moment.unix(withingsSleepObject.startdate).toISOString()
  const endDate = moment.unix(withingsSleepObject.enddate).toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedNightId = generateNightId(
    'withings',
    withingsSleepObject.date,
    startDate,
    endDate,
    Value.InBed
  )

  const inBedSample: Night = {
    id: inBedNightId,
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

  const asleepNightId = generateNightId(
    'withings',
    <string>withingsSleepObject.id,
    asleepStartDate,
    asleepEndDate,
    Value.Asleep
  )

  const asleepSamples: Night = {
    id: asleepNightId,
    sourceId: CONFIG.WITHINGS_CONFIG.bundleId,
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
