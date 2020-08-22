import Moment from 'moment'
import translate from '../config/i18n'
import { Day } from '../Types/Sleepdata'

type Moment = typeof Moment

export function to12hClock(hour: number) {
  return hour > 12 ? hour - 12 : hour
}

export function momentTimeToPolar(time: string) {
  const momentTime = Moment(time)
  const angle =
    ((to12hClock(momentTime.hour()) + momentTime.minute() / 60) / 12) * 360

  return angle
}

export function minutesToHoursString(
  minutes: number | undefined,
  longFormat?: boolean
) {
  if (!minutes) {
    return '-'
  }

  const h = Math.floor(minutes / 60)
  const m = Math.floor(minutes - h * 60)
  if (longFormat) {
    return `${h !== 0 ? h : ''} ${h !== 0 ? translate('Hours') : ''} ${
      m !== 0 ? m : ''
    } min`
  }
  return `${(minutes / 60).toFixed(1)} h`
}

export function getTimeInString(minutes: number) {
  if (!minutes) {
    return '-'
  }
  const time = Moment().hours(0).minutes(minutes)

  return `${time.format('H')} h ${time.format('mm')} `
}

export function returnNightString(date: string) {
  const startDate = Moment(date)
  const endDate = startDate.add(1, 'day')
}

export function formatDate(date: string) {
  return Moment(date).format('dddd Do MMMM')
}

export function formatMinutesToHours(minutes: number) {
  const value = Moment.duration(minutes, 'minutes').humanize()

  return value
}

export function isWeekend(day: Day) {
  if (Moment(day.date).day() === 0 || Moment(day.date).day() === 6) {
    return true
  }
  return false
}

/**
 *
 * @param {*} dateString
 */
export function getStartTimeInMinutes(date: string) {
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

export function toNightTime(date: string) {
  const nightEnd = Moment(date)
  const nightStart = Moment(nightEnd).subtract(1, 'days').startOf('day')
  return `${nightStart.format('DD.MM.')} – ${nightEnd.format('DD.MM.')}`
}

export const getTitle = () => {
  const format = 'hh:mm:ss'
  const now = Moment()
  if (now.isBetween(Moment('04:00:00', format), Moment('11:59:59', format))) {
    return { title: 'Good Morning', subtitle: 'MORNING_SUBTITLE' }
  }
  if (now.isBetween(Moment('12:00:00', format), Moment('16:59:59', format))) {
    return { title: 'Good Afternoon', subtitle: 'AFTERNOON_SUBTITLE' }
  }
  if (now.isBetween(Moment('17:00:00', format), Moment('20:59:59', format))) {
    return { title: 'Good Evening', subtitle: 'EVENING_SUBTITLE' }
  }
  return { title: 'Good Night', subtitle: 'NIGHT_SUBTITLE' }
}

export function nearestMinutes(interval: number, someMoment: any) {
  const roundedMinutes =
    Math.round(someMoment.clone().minute() / interval) * interval
  return someMoment.clone().minute(roundedMinutes).second(0)
}

export const formatTimer = (numberOfSeconds: number) => {
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

export function calculateMinutesFromAngle(angle: number) {
  return Math.round(angle / ((2 * Math.PI) / (12 * 12))) * 5
}

export function calculateTimeFromAngle(angle: number, start: boolean) {
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
) {
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

export function calculateTimeFromAngleAM(angle: number) {
  const minutes = calculateMinutesFromAngle(angle)
  const h = Math.floor(minutes / 60) + 12
  const m = minutes - h * 60

  return { h, m }
}

export function roundAngleToFives(angle: number) {
  const fiveMinuteAngle = (2 * Math.PI) / 144

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle
}

export function padMinutes(min: number) {
  if (`${min}`.length < 2) {
    return `0${min}`
  }

  return min
}
