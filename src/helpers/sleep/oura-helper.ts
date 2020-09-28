/* eslint-disable camelcase */
import CONFIG from 'config/Config'
import { addMinutes } from 'date-fns'
import moment from 'moment'
import { OuraSleepObject } from 'Types/Sleep/Oura'
import { Night, Value } from 'Types/Sleepdata'
import { getNightDuration } from '../sleep'

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
    }

    // if awake move both start and end time
    else if (!asleep && hypnogram[i] === '4') {
      asleep = false
      startTime = addMinutes(startTime, 5)
      endTime = addMinutes(startTime, 5)
    }

    // if awke and hyphogram shows sleep set asleep
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

// The recursive function for separating sleep period.
// There are 4 stages of sleep: 1 - deep sleep, 2 - light sleep, 3 - rem sleep & 4 - awake.
// Only (1) (2) (3) are taken into account.
// This function is used with O(n) time complexity which divides the hypnogram_5min value into
// many chunks of sleep periods.
const sleepPeriodRecursion = (
  periodId: number,
  currentIndex: number, // initially at 0, will keep track of the current index
  splittedString: string[], // hypnogram_5min splitted into each character
  asleepSamples: Night[], // initially an empty array
  startDate: string, // = bedtime_start
  sleepPeriodMili: number, // 5 min in mili 5 * 60 * 1000
  streakStartIndex: number // will be reset when a new chunk begins. It is used to calculate the duration, start date
  // end date of a sleep period.
) => {
  // Base case 1, return when current index reaches the end of array
  if (currentIndex === splittedString.length) {
    return
  }

  // Get the current character
  const char = splittedString[currentIndex]

  // Base case 2, push a new element to asleepSamples and return because we're comparing the characters at
  // current index and current index + 1 -> if don't return it will throw out of range error
  if (currentIndex === splittedString.length - 1) {
    if (char !== '4') {
      const startSleepPeriodDate = moment(
        moment(startDate).valueOf() * currentIndex * sleepPeriodMili
      ).toISOString()

      const endSleepPeriodDate = moment(
        moment(startSleepPeriodDate).valueOf() + sleepPeriodMili
      ).toISOString()

      asleepSamples.push({
        id: `${startSleepPeriodDate}_${Value.Asleep}_${startSleepPeriodDate}`,
        sourceId: CONFIG.OURA_CONFIG.bundleId,
        sourceName: 'Oura',
        endDate: endSleepPeriodDate,
        startDate: startSleepPeriodDate,
        totalDuration: 5,
        value: Value.Asleep
      })
    }

    return
  }

  const nextChar = splittedString[currentIndex + 1]

  // Handle sleep periods (chunks).
  // If current character === the following character, increase the streak
  if (char === nextChar) {
    streakStartIndex += 1
  }
  // If not, it means the current sleep period ends to come a new sleep period, reset the streak
  else {
    // We only take value of phase (1) (2) (3)
    if (nextChar !== '4') {
      const startSleepPeriodDate = moment(
        moment(startDate).valueOf() + streakStartIndex * sleepPeriodMili
      ).toISOString()

      const endSleepPeriodDate = new Date(
        new Date(startSleepPeriodDate).valueOf() + sleepPeriodMili
      ).toISOString()

      asleepSamples.push({
        id: `${startSleepPeriodDate}_${Value.Asleep}_${startSleepPeriodDate}`,
        sourceId: CONFIG.OURA_CONFIG.bundleId,
        sourceName: 'Oura',
        endDate: endSleepPeriodDate,
        startDate: startSleepPeriodDate,
        totalDuration: 5 * (streakStartIndex + 1),
        value: Value.Asleep
      })
    }

    streakStartIndex = 0
  }

  // Repeat itself till reaching base case (1) or (2)
  sleepPeriodRecursion(
    periodId,
    currentIndex + 1,
    splittedString,
    asleepSamples,
    startDate,
    sleepPeriodMili,
    streakStartIndex
  )
}

export const formatOuraSamples = (samples: OuraSleepObject[]): Night[] => {
  const nights: Night[] = []
  console.log(samples)
  samples.forEach((sample) => {
    nights.push(...formatOuraSample(sample))
  })

  return nights
}
