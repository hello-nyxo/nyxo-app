import { NightValue } from '@API'
import { Day, Night, Value } from '@typings/Sleepdata'
import {
  addHours,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfDay,
  setMinutes,
  subHours,
  roundToNearestMinutes,
  subMinutes,
  addMinutes,
  differenceInMinutes,
  isWeekend
} from 'date-fns'

// Find the starting time of the night
export function findStartTime(nights: Night[], value: Value): string {
  const nightStartTime = nights
    ?.filter((n: Night) => n.value === value)
    .reduce((previousValue: Night, currentValue: Night) =>
      isBefore(
        new Date(previousValue.startDate),
        new Date(currentValue.startDate)
      )
        ? previousValue
        : currentValue
    )
  return new Date(nightStartTime.startDate).toISOString()
}
// Find the endit time of the night
export function findEndTime(nights: Night[], value: Value): string {
  const nightStartTime = nights
    ?.filter((n: Night) => n.value === value)
    .reduce((previousValue: Night, currentValue: Night) =>
      isAfter(new Date(previousValue.endDate), new Date(currentValue.endDate))
        ? previousValue
        : currentValue
    )
  return new Date(nightStartTime.endDate).toISOString()
}

export function calculateBedtimeWindow(
  lastSevenDays: Day[]
): {
  goToSleepWindowStart: string
  goToSleepWindowCenter: string
  goToSleepWindowEnd: string
} {
  let averageBedTime = 0
  let divideBy = 0
  lastSevenDays.forEach((day) => {
    const dayStarted = new Date(day.date) // Beginning of the day
    if (day.bedStart) {
      const bedTimeStart = new Date(day.bedStart)

      const totalDifference = differenceInMinutes(bedTimeStart, dayStarted)
      // Add difference to the average time
      averageBedTime += totalDifference
      // increment divider
      divideBy += 1
    }
  })

  if (divideBy !== 0) {
    averageBedTime /= divideBy
  }

  // Remove the extra 24 hours
  if (averageBedTime > 1440) {
    averageBedTime = -1440
  }

  const bedTimeWindowCenter = roundToNearestMinutes(
    setMinutes(startOfDay(new Date()), averageBedTime),
    {
      nearestTo: 15
    }
  ).toISOString()

  const bedTimeWindowStart = subMinutes(
    new Date(bedTimeWindowCenter),
    45
  ).toISOString()

  const bedTimeWindowEnd = addMinutes(
    new Date(bedTimeWindowCenter),
    45
  ).toISOString()

  const insights = {
    goToSleepWindowStart: bedTimeWindowStart,
    goToSleepWindowCenter: bedTimeWindowCenter,
    goToSleepWindowEnd: bedTimeWindowEnd
  }

  return insights
}

export function getAverageOfTimes(days: Day[]): number {
  let averageBedTime = 0
  let divideBy = 0
  days.forEach((day) => {
    const dayStarted = new Date(day.date) // Beginning of the day
    if (day.bedStart) {
      const bedTimeStart = new Date(day.bedStart)

      const totalDifference = differenceInMinutes(bedTimeStart, dayStarted)

      // Add difference to the average time
      averageBedTime += totalDifference
      // increment divider
      divideBy += 1
    }
  })

  if (divideBy !== 0) {
    averageBedTime /= divideBy
  }

  // Remove the extra 24 hours
  if (averageBedTime > 1440) {
    averageBedTime = -1440
  }
  return averageBedTime
}

export function calculateSocialJetlag(
  lastSevenDays: Day[]
): {
  weekDayAverage: string
  weekendDayAverage: string
} {
  const weekdays = lastSevenDays.filter(
    (day: Day) => !isWeekend(new Date(day.date))
  )
  const weekendDays = lastSevenDays.filter((day: Day) =>
    isWeekend(new Date(day.date))
  )

  const weekDayAverage = setMinutes(
    startOfDay(new Date()),
    getAverageOfTimes(weekdays)
  ).toISOString()
  const weekendDayAverage = setMinutes(
    startOfDay(new Date()),
    getAverageOfTimes(weekendDays)
  ).toISOString()

  const insights = {
    weekDayAverage,
    weekendDayAverage
  }

  return insights
}

/**
 * @param {array} night all night values
 * @param {*} value value for filtering, e.g. INBED, ASLEEP
 */
export function calculateTotalSleep(night: Night[], value: Value): number {
  const filteredNightData = night?.filter((n: Night) => n.value === value)

  const totalDuration = filteredNightData.reduce(
    (acc, n) => acc + n.totalDuration,
    0
  )

  return totalDuration
}

// Used to match sleep samples to date
export function matchDayAndNight(night: string, day: string): boolean {
  const nightTime = new Date(night)
  const nightStart = subHours(startOfDay(new Date(day)), 12)
  const nightEnd = addHours(startOfDay(new Date(day)), 12)
  return isWithinInterval(nightTime, { start: nightStart, end: nightEnd })
}

export const calculateEfficiency = (
  totalBedTime: number | undefined,
  totalSleepTime: number | undefined
): string => {
  if (
    !totalBedTime ||
    !totalSleepTime ||
    totalBedTime === 0 ||
    totalSleepTime === 0
  ) {
    return '-'
  }

  return `${Math.round((totalBedTime / totalSleepTime) * 100)} %`
}

export const convertNightValue = (value: Value): NightValue => {
  switch (value) {
    case Value.Asleep:
      return NightValue.Asleep
    case Value.Awake:
      return NightValue.Awake
    case Value.InBed:
      return NightValue.InBed
    default:
      return NightValue.InBed
  }
}
