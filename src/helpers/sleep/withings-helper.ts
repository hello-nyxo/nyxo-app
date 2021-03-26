import CONFIG from '@config/config'
import { getNightDuration } from '@helpers/sleep/sleep'
import { WithingsSleepObject } from '@typings/sources/Withings'
import { Night, Value } from '@typings/Sleepdata'
import { addSeconds, subSeconds } from 'date-fns'

export const formatWithingsSample = (
  withingsSleepObject: WithingsSleepObject
): Night[] => {
  const {
    data: { durationtosleep = 0, durationtowakeup = 0 }
  } = withingsSleepObject

  const startDate = new Date(withingsSleepObject.startdate).toISOString()
  const endDate = new Date(withingsSleepObject.enddate).toISOString()
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

  const asleepStartDate = addSeconds(
    new Date(startDate),
    durationtosleep
  ).toISOString()
  const asleepEndDate = subSeconds(
    new Date(startDate),
    durationtowakeup
  ).toISOString()

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
