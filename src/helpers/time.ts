import {
  format,
  getHours,
  parse,
  getMinutes,
  startOfDay,
  subDays,
  parseISO,
  setHours,
  isWithinInterval,
  setMinutes
} from 'date-fns'
import translate from '../config/i18n'

export function to12hClock(hour: number): number {
  return hour > 12 ? hour - 12 : hour
}

export function timeToPolar(time: string): number {
  const date = new Date(time)
  const angle =
    ((to12hClock(getHours(date)) + getMinutes(date) / 60) / 12) * 360

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

export function toNightTime(date: string): string {
  const nightEnd = new Date(date)
  const nightStart = startOfDay(subDays(new Date(nightEnd), 1))
  return `${format(nightStart, 'dd.MM.')} – ${format(nightStart, 'dd.MM.')}`
}

export const getTitle = (): { title: string; subtitle: string } => {
  const timeFormat = 'HH:mm:ss'
  const now = new Date()
  if (
    isWithinInterval(now, {
      start: parse('04:00:00', timeFormat, new Date()),
      end: parse('11:59:59', timeFormat, new Date())
    })
  ) {
    return { title: 'Good Morning', subtitle: 'MORNING_SUBTITLE' }
  }
  if (
    isWithinInterval(now, {
      start: parse('12:00:00', timeFormat, new Date()),
      end: parse('16:59:59', timeFormat, new Date())
    })
  ) {
    return { title: 'Good Afternoon', subtitle: 'AFTERNOON_SUBTITLE' }
  }
  if (
    isWithinInterval(now, {
      start: parse('17:00:00', timeFormat, new Date()),
      end: parse('20:59:59', timeFormat, new Date())
    })
  ) {
    return { title: 'Good Evening', subtitle: 'EVENING_SUBTITLE' }
  }
  return { title: 'Good Night', subtitle: 'NIGHT_SUBTITLE' }
}

export const formatTimer = (numberOfSeconds: number): string => {
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
