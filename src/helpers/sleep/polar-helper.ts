import { Value } from '@typings/Sleepdata'
import { getNightDuration } from '@helpers/sleep/sleep'
import { PolarSleepObject } from '@typings/sources/Polar'
import CONFIG from '@config/config'
import { Night } from '@reducers/nights'

export const formatPolarSample = (
  polarSleepObject: PolarSleepObject
): Night[] => {
  const startDate = new Date(polarSleepObject.sleep_start_time).toISOString()
  const endDate = new Date(polarSleepObject.sleep_end_time).toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedSample: Night = {
    id: `polar_${startDate}_${endDate}_${Value.InBed}`,
    sourceId: CONFIG.POLAR_CONFIG.bundleId,
    sourceName: 'Polar',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  const asleepSample: Night = {
    id: `polar_${startDate}_${endDate}_${Value.Asleep}`,
    sourceId: CONFIG.POLAR_CONFIG.bundleId,
    sourceName: 'Polar',
    value: Value.Asleep,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  return [inBedSample, asleepSample]
}

export const formatPolarSamples = (samples: PolarSleepObject[]): Night[] => {
  const nights: Night[] = []
  if (samples) {
    samples.forEach((sample) => {
      nights.push(...formatPolarSample(sample))
    })
  }

  return nights
}
