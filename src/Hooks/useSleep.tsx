import { useSelector } from 'react-redux'
import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '@selectors/insight-selectors/Insights'
import { getNightForSelectedDate } from '@selectors/night-selectors'
import { Night, Value } from '@typings/Sleepdata'
import {
  calculateTotalSleep,
  findStartTime,
  findEndTime,
  calculateEfficiency
} from '@helpers/sleep/sleep-data-helper'

type Hook = {
  windowStart: string
  windowEnd: string
  night: Night[]

  inBedDuration: number
  asleepDuration: number
  bedStart?: string
  bedEnd?: string
  sleepStart?: string
  sleepEnd?: string

  efficiency: string
}

const useSleep = (): Hook => {
  const windowStart = useSelector(getGoToSleepWindowStart)
  const windowEnd = useSelector(getGoToSleepWindowEnd)
  const night = useSelector(getNightForSelectedDate)

  const inBedDuration = calculateTotalSleep(night, Value.InBed)
  const asleepDuration = calculateTotalSleep(night, Value.Asleep)

  const efficiency = calculateEfficiency(inBedDuration, asleepDuration)

  let bedStart
  let bedEnd
  let sleepStart
  let sleepEnd

  // Start times for easier handling
  if (inBedDuration !== 0) {
    bedStart = findStartTime(night, Value.InBed)
    bedEnd = findEndTime(night, Value.InBed)
  }

  if (asleepDuration !== 0) {
    sleepStart = findStartTime(night, Value.Asleep)
    sleepEnd = findEndTime(night, Value.Asleep)
  }

  console.log(night)

  return {
    windowStart,
    windowEnd,
    night,
    inBedDuration,
    asleepDuration,
    bedStart,
    bedEnd,
    sleepStart,
    sleepEnd,
    efficiency
  }
}

export default useSleep
