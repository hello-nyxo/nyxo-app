import moment, { MomentInput } from 'moment'
import { SleepSample } from 'react-native-healthkit'
import { Day, Night, Value } from 'Types/Sleepdata'
import { getNightDuration } from '../sleep'
import { nearestMinutes } from '../time'

export const formatHealthKitResponse = (hkSample: SleepSample): Night => {
  const startDate = moment(hkSample.startDate, 'YYYY-MM-DD kk:mm:SS ZZ')
  const endDate = moment(hkSample.endDate, 'YYYY-MM-DD kk:mm:SS ZZ')
  let minutes = endDate.diff(startDate, 'minutes')
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  const isoStartDate = startDate.toISOString()
  const isoEndDate = endDate.toISOString()

  const totalDuration = getNightDuration(isoStartDate, isoEndDate)

  return {
    id: hkSample.uuid,
    sourceId: hkSample.sourceId,
    sourceName: hkSample.sourceName,
    value: healthKitSampleToValue(hkSample.value),
    startDate: isoStartDate,
    endDate: isoEndDate,
    totalDuration
  }
}

export const healthKitSampleToValue = (healthKitSample: string): Value => {
  switch (healthKitSample) {
    case 'INBED':
      return Value.InBed
    case 'ASLEEP':
      return Value.Asleep
    case 'AWAKE':
      return Value.Awake
    default:
      return Value.InBed
  }
}

// Find the starting time of the night
export function findStartTime(nights: Night[], value: Value): string {
  const filteredNightData = nights.filter((n: Night) => n.value === value)

  const nightStartTime = filteredNightData.reduce(
    (previousValue: Night, currentValue: Night) =>
      moment(previousValue.startDate).isBefore(moment(currentValue.startDate))
        ? previousValue
        : currentValue
  )
  return moment(nightStartTime.startDate).toISOString()
}
// Find the endit time of the night
export function findEndTime(night: Night[], value: Value): string {
  const filteredNightData = night.filter((n) => n.value === value)

  const nightStartTime = filteredNightData.reduce(
    (previousValue: Night, currentValue: Night) =>
      moment(previousValue.endDate).isAfter(moment(currentValue.endDate))
        ? previousValue
        : currentValue
  )
  return moment(nightStartTime.endDate).toISOString()
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
    const dayStarted = moment(day.date) // Beginning of the day
    if (day.bedStart) {
      const bedTimeStart = moment(day.bedStart)

      const totalDifference = bedTimeStart.diff(dayStarted, 'minutes')
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

  const bedTimeWindowCenter = nearestMinutes(
    15,
    moment().startOf('day').minutes(averageBedTime)
  ).toISOString()

  const bedTimeWindowStart = moment(bedTimeWindowCenter)
    .subtract(45, 'minutes')
    .toISOString()

  const bedTimeWindowEnd = moment(bedTimeWindowCenter)
    .add(45, 'minutes')
    .toISOString()

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
    const dayStarted = moment(day.date) // Beginning of the day
    if (day.bedStart) {
      const bedTimeStart = moment(day.bedStart)

      const totalDifference = bedTimeStart.diff(dayStarted, 'minutes')

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
    (day: Day) => moment(day.date).day() < 6 && moment(day.date).day() > 0
  )
  const weekendDays = lastSevenDays.filter(
    (day: Day) => moment(day.date).day() === 0 || moment(day.date).day() === 6
  )

  const weekDayAverage = moment()
    .startOf('day')
    .minutes(getAverageOfTimes(weekdays))
    .toISOString()
  const weekendDayAverage = moment()
    .startOf('day')
    .minutes(getAverageOfTimes(weekendDays))
    .toISOString()

  const insights = {
    weekDayAverage,
    weekendDayAverage
  }

  return insights
}

export const calculateAverages = (
  lastSevenDays: Day[]
): { averageBedTime: number; averageSleepTime: number } => {
  const insights = { averageBedTime: 8, averageSleepTime: 8 }
  return insights
}

/**
 * @param {array} night all night values
 * @param {*} value value for filtering, e.g. INBED, ASLEEP
 */
export function calculateTotalSleep(night: Night[], value: Value): number {
  const filteredNightData = night.filter((n: Night) => n.value === value)

  const totalDuration = filteredNightData.reduce(
    (acc, n) => acc + n.totalDuration,
    0
  )

  return totalDuration
}

// Used to match sleep samples to date
export function matchDayAndNight(night: string, day: string): boolean {
  const nightmomentFormat = moment(night, 'YYYY-MM-DD HH:mm:SS ZZ')
  const nightStart = moment(day, 'YYYY-MM-DD HH:mm:SS ZZ')
    .startOf('day')
    .subtract(12, 'hour')
  const nightEnd = moment(day, 'YYYY-MM-DD HH:mm:SS ZZ')
    .startOf('day')
    .add(12, 'hour')
  return (
    nightmomentFormat.isAfter(nightStart) &&
    nightmomentFormat.isBefore(nightEnd)
  )
}

export function getDaysBetweenDates(
  startDate: MomentInput,
  endDate: MomentInput,
  days: Day[]
): Day[] {
  return days.filter((d: Day) => moment(d.date).isBetween(startDate, endDate))
}
