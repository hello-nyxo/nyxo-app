import { to12hClock } from '@helpers/time'
import {
  differenceInMinutes,
  endOfDay,
  getHours,
  getMinutes,
  startOfDay,
  subDays
} from 'date-fns'

export function getAngleAM(dateTime: string): number {
  const time = new Date(dateTime)

  const hourAngleAM =
    ((to12hClock(getHours(time)) + getMinutes(time) / 60) / 12) * 360

  return hourAngleAM
}

export function getAngle(dateTime: string): number {
  const time = new Date(dateTime)

  const hourAngle = ((getHours(time) + getMinutes(time) / 60) / 24) * 360

  return hourAngle
}

export function getNightDuration(start: string, end: string): number {
  return differenceInMinutes(new Date(start), new Date(end))
}

export function getDurationString(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)

  let minutes = differenceInMinutes(startDate, endDate)
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  return `${hours} h ${minutes} m`
}

type StartEnd = {
  startDate: string
  endDate: string
}

export const getStartEndWeek = (): StartEnd => {
  return {
    startDate: startOfDay(subDays(new Date(), 7)).toISOString(),
    endDate: endOfDay(new Date()).toISOString()
  }
}

export const getStartEndDay = (): StartEnd => {
  return {
    startDate: startOfDay(new Date()).toISOString(),
    endDate: endOfDay(new Date()).toISOString()
  }
}
