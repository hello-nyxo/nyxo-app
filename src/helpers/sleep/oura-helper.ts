/* eslint-disable camelcase */
import CONFIG from '@config/config'
import { OuraSleepObject } from '@typings/sources/Oura'
import { Night, Value } from '@typings/Sleepdata'
import { addMinutes } from 'date-fns'
import { getNightDuration } from './sleep'

export const formatOuraSample = (ouraObject: OuraSleepObject): Night[] => {
  const { hypnogram_5min: hypnogram } = ouraObject
  const totalDuration = ouraObject?.duration

  const inBedSample: Night = {
    id: `${ouraObject.summary_date}_${ouraObject.period_id}_${ouraObject.period_id}`,
    sourceId: CONFIG.OURA_CONFIG.bundleId,
    sourceName: 'Oura',
    value: Value.InBed,
    startDate: new Date(ouraObject?.bedtime_start).toISOString(),
    endDate: new Date(ouraObject?.bedtime_end).toISOString(),
    totalDuration: Math.floor(totalDuration / 60) as number
  }

  const asleepSamples = calculateAsleepPeriods(
    new Date(ouraObject?.bedtime_start).toISOString(),
    hypnogram
  )

  return [inBedSample, ...asleepSamples]
}

const calculateAsleepPeriods = (start: string, hypnogram: string): Night[] => {
  const asleepSamples: Night[] = []
  let startTime = new Date(start)
  let endTime = addMinutes(new Date(start), 5)
  let asleep = false
  let i

  for (i = 0; i < hypnogram.length; i += 1) {
    // if asleep and wakes up, add new sleep sample
    if (asleep && hypnogram[i] === '4') {
      asleepSamples.push({
        id: `oura_${startTime.toISOString()}_${endTime.toISOString()}`,
        totalDuration: getNightDuration(
          startTime.toISOString(),
          endTime.toISOString()
        ),
        sourceName: 'Oura',
        sourceId: CONFIG.OURA_CONFIG.bundleId,
        value: Value.Asleep,
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString()
      })

      asleep = false
      startTime = addMinutes(endTime, 5)
      endTime = addMinutes(startTime, 5)
    }

    // 4 == awake
    // if awake move both start and end time
    else if (!asleep && hypnogram[i] === '4') {
      asleep = false
      startTime = addMinutes(startTime, 5)
      endTime = addMinutes(startTime, 5)
    }

    // if awake and hyphogram shows sleep set asleep
    else if (!asleep && hypnogram[i] !== '4') {
      asleep = true
    }

    // is asleep and hypnogram shows sleep increment endTime
    else if (asleep && hypnogram[i] !== '4') {
      endTime = addMinutes(endTime, 5)
    }
  }

  return asleepSamples
}

export const formatOuraSamples = (samples: OuraSleepObject[]): Night[] => {
  const nights: Night[] = []
  samples.forEach((sample) => {
    nights.push(...formatOuraSample(sample))
  })

  return nights
}
