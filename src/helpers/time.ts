import { Day } from '@typings/Sleepdata'
import { format, parseISO, setHours, setMinutes } from 'date-fns'
import Moment from 'moment'
import translate from '../config/i18n'

type Moment = typeof Moment

export function to12hClock(hour: number): number {
  return hour > 12 ? hour - 12 : hour
}

export function momentTimeToPolar(time: string): number {
  const momentTime = Moment(time)
  const angle =
    ((to12hClock(momentTime.hour()) + momentTime.minute() / 60) / 12) * 360

  return angle
}

export function minutesToHoursString(
  minutes: number | undefined,
  longFormat?: boolean
): string {
  if (!minutes) {
    return '-'
  }

  const time = setMinutes(setHours(new Date(), 0), minutes)

  if (longFormat) {
    return `${format(time, 'h')} ${translate('Hours')} ${format(
      time,
      'mm'
    )}min `
  }
  return `${format(time, 'h')} h ${format(time, 'mm')} min`
}

export function getTimeInString(minutes: number): string {
  if (!minutes) {
    return '-'
  }
  const time = setMinutes(setHours(new Date(), 0), minutes)

  return `${format(time, 'h')} h ${format(time, 'mm')}`
}

export function isWeekend(day: Day): boolean {
  if (Moment(day.date).day() === 0 || Moment(day.date).day() === 6) {
    return true
  }
  return false
}

/**
 *
 * @param {*} dateString
 */
export function getStartTimeInMinutes(date: string): number {
  const timeMoment = Moment(date)
  const timeInPureMinutes = timeMoment.hours() * 60 + timeMoment.minutes()
  const periodEnd = 360 // 6 in the morning
  const periodStart = 1080 // 6 in the evening
  const balancer = 1440 // 24 hours in minutes

  if (timeInPureMinutes < periodEnd) {
    return timeInPureMinutes + balancer
  }
  return timeInPureMinutes
}

export function toNightTime(date: string): string {
  const nightEnd = Moment(date)
  const nightStart = Moment(nightEnd).subtract(1, 'days').startOf('day')
  return `${nightStart.format('DD.MM.')} – ${nightEnd.format('DD.MM.')}`
}

export const getTitle = () => {
  const timeFormat = 'hh:mm:ss'
  const now = Moment()
  if (
    now.isBetween(
      Moment('04:00:00', timeFormat),
      Moment('11:59:59', timeFormat)
    )
  ) {
    return { title: 'Good Morning', subtitle: 'MORNING_SUBTITLE' }
  }
  if (
    now.isBetween(
      Moment('12:00:00', timeFormat),
      Moment('16:59:59', timeFormat)
    )
  ) {
    return { title: 'Good Afternoon', subtitle: 'AFTERNOON_SUBTITLE' }
  }
  if (
    now.isBetween(
      Moment('17:00:00', timeFormat),
      Moment('20:59:59', timeFormat)
    )
  ) {
    return { title: 'Good Evening', subtitle: 'EVENING_SUBTITLE' }
  }
  return { title: 'Good Night', subtitle: 'NIGHT_SUBTITLE' }
}

export function nearestMinutes(interval: number, someMoment: any): string {
  const roundedMinutes =
    Math.round(someMoment.clone().minute() / interval) * interval
  return someMoment.clone().minute(roundedMinutes).second(0)
}

export const formatTimer = (numberOfSeconds: number): number => {
  const hours = Math.floor(numberOfSeconds / 3600)
  const minutes = Math.floor((numberOfSeconds - hours * 3600) / 60)
  const seconds = numberOfSeconds - hours * 3600 - minutes * 60

  let timerHours = String(hours)
  let timerMinutes = String(minutes)
  let timerSeconds = String(seconds)

  if (hours < 10) {
    timerHours = `0${hours}`
  }
  if (minutes < 10) {
    timerMinutes = `0${minutes}`
  }
  if (seconds < 10) {
    timerSeconds = `0${seconds}`
  }

  if (hours > 0) {
    return `${timerHours}:${timerMinutes}:${timerSeconds}`
  }
  return `${timerMinutes}:${timerSeconds}`
}

export function sameDay(
  as1: string | undefined,
  as2: string | undefined
): boolean {
  const s1 = Moment(as1)
  const s2 = Moment(as2)
  return s1.isSame(s2, 'day')
}

export function calculateMinutesFromAngle(angle: number): number {
  return Math.round(angle / ((2 * Math.PI) / (12 * 12))) * 5
}

export function calculateTimeFromAngle(
  angle: number,
  start: boolean
): { h: number; m: number } {
  if (start) {
    const minutes = calculateMinutesFromAngle(angle)
    const h = Math.floor(minutes / 60)
    const corrected = h >= 6 ? h + 12 : h
    const m = minutes - h * 60

    return { h: corrected, m }
  }
  const minutes = calculateMinutesFromAngle(angle)
  const h = Math.floor(minutes / 60)
  const m = minutes - h * 60

  return { h, m }
}

export function calculateEndTimeFromAngle(
  startAngle: number,
  endAngle: number
): { h: number; m: number } {
  const startMinutes = calculateMinutesFromAngle(startAngle)
  const startHours = Math.floor(startMinutes / 60)
  const startCorrected = startHours >= 6 ? startHours + 12 : startHours

  const minutes = calculateMinutesFromAngle(endAngle)
  const h = Math.floor(minutes / 60)

  const endCorrected =
    startCorrected >= 18 && h + 12 >= startCorrected ? h + 12 : h

  const m = minutes - h * 60

  return { m, h: endCorrected }
}

export function calculateTimeFromAngleAM(
  angle: number
): { h: number; m: number } {
  const minutes = calculateMinutesFromAngle(angle)
  const h = Math.floor(minutes / 60) + 12
  const m = minutes - h * 60

  return { h, m }
}

export function roundAngleToFives(angle: number): number {
  const fiveMinuteAngle = (2 * Math.PI) / 144

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle
}

export function padMinutes(min: number): string {
  if (`${min}`.length < 2) {
    return `0${min}`
  }

  return `${min}`
}

export const getFormattedDateOrPlaceholder = (
  value: string | null | undefined,
  formatter: string
): string => {
  if (value) {
    return format(parseISO(value), formatter)
  }

  return '-'
}
