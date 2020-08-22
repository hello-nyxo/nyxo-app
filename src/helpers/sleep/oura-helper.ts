import moment from 'moment'
import { OuraSleepObject } from 'Types/Sleep/Oura'
import { generateNightId } from './night-id-generator'
import CONFIG from 'config/Config'

export const formatOuraSample = (ouraObject: OuraSleepObject): Night[] => {
  const { hypnogram_5min } = ouraObject
  const startDate = moment(ouraObject?.bedtime_start).toISOString()
  const endDate = moment(ouraObject?.bedtime_end).toISOString()
  const totalDuration = ouraObject?.duration
  const inBedNightId = generateNightId(
    'oura',
    `${ouraObject.period_id}`,
    startDate,
    endDate,
    Value.InBed
  )

  const inBedSample: Night = {
    id: inBedNightId,
    sourceId: CONFIG.OURA_CONFIG.bundleId,
    sourceName: 'Oura',
    value: Value.InBed,
    startDate: moment(startDate).toISOString(),
    endDate: moment(endDate).toISOString(),
    totalDuration: Math.floor(totalDuration / 60) as number
  }

  const asleepSamples: Night[] = []
  const sleepPeriodMili = 5 * 60 * 1000
  sleepPeriodRecursion(
    ouraObject.period_id,
    0,
    hypnogram_5min.split(''),
    asleepSamples,
    startDate,
    sleepPeriodMili,
    0
  )

  return [inBedSample, ...asleepSamples]
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

      const asleepNightId = generateNightId(
        'oura',
        `${periodId}`,
        startSleepPeriodDate,
        endSleepPeriodDate,
        Value.Asleep
      )

      asleepSamples.push({
        id: asleepNightId,
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

      const endSleepPeriodDate = moment(
        moment(startSleepPeriodDate).valueOf() + sleepPeriodMili
      ).toISOString()

      const asleepNightId = generateNightId(
        'oura',
        `${periodId}`,
        startSleepPeriodDate,
        endSleepPeriodDate,
        Value.Asleep
      )

      asleepSamples.push({
        id: asleepNightId,
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

  samples.forEach((sample) => {
    nights.push(...formatOuraSample(sample))
  })

  return nights
}
