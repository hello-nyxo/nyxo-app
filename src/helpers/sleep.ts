import Moment from 'moment'
import { to12hClock } from './time'
import { Day, Night } from '../Types/Sleepdata'

export function getAngleAM(dateTime: string): number {
  const time = Moment(dateTime)

  const hourAngleAM =
    ((to12hClock(time.hour()) + time.minute() / 60) / 12) * 360

  return hourAngleAM
}

export function getAngle(dateTime: string): number {
  const time = Moment(dateTime)

  const hourAngle = ((time.hour() + time.minute() / 60) / 24) * 360

  return hourAngle
}

export function getNightDuration(start: string, end: string): number {
  const startDate = Moment(start)
  const endDate = Moment(end)

  return endDate.diff(startDate, 'minutes')
}

export function getDurationString(start: string, end: string): string {
  const startDate = Moment(start)
  const endDate = Moment(end)

  let minutes = endDate.diff(startDate, 'minutes')
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  return `${hours} h ${minutes} m`
}

export function sortDays(days: Day[]): Day[] {
  const sorted = days.sort((a: Day, b: Day) =>
    Moment(a.date).diff(Moment(b.date))
  )
  return sorted
}

export function sortNights(nights: Night[]): Night[] {
  const sorted = nights.sort((a: Night, b: Night) =>
    Moment(a.startDate).diff(Moment(b.startDate))
  )
  return sorted
}
