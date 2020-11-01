import { createSelector } from 'reselect'
import { State } from '@typings/State'
import { matchDayAndNight } from '@helpers/sleep/sleep-data-helper'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { getMainSource } from '@sleep-source-selectors/sleep-source-selectors'
import { Day, Night, Value } from '@typings/Sleepdata'
import {
  differenceInDays,
  min,
  max,
  eachDayOfInterval,
  subDays,
  differenceInMilliseconds,
  startOfDay,
  addMilliseconds,
  addMinutes
} from 'date-fns'
import { deviation } from 'd3'

const getNights = (state: State) => state.nights

const getTracker = () => 'com.ouraring.oura'

const getTotalTrackedNights = (state: State) => state.nights

export const getNightForSelectedDate = createSelector(
  [getNights, getSelectedDate, getTracker],
  (nights, selectedDate, tracker) => {
    console.log('nights', nights, selectedDate)
    return nights
      .filter((night) => night.sourceId === tracker)
      .map((night) => {
        return night
      })
      .filter((night) => matchDayAndNight(night.startDate, selectedDate))
  }
)

export const getInBedDuration = createSelector(
  [getNightForSelectedDate],
  (nights: Night[]) =>
    nights
      .filter((night) => night.value === Value.InBed)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalDuration,
        0
      )
)

export const getAsleepDuration = createSelector(
  [getNightForSelectedDate],
  (nights: Night[]) =>
    nights
      .filter((night) => night.value === Value.Asleep)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalDuration,
        0
      )
)

export const getMonthOfNights = createSelector(getNights, (night) => night)

export const getNightsAsDays = createSelector(getNights, (nights) => {
  const firstDate = min([...nights.map((night) => new Date(night.startDate))])
  const lastDate = max([...nights.map((night) => new Date(night.endDate))])

  const days = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: new Date() // lastDate
  })

  return days.map((day) => ({
    date: day.toISOString(),
    night: nights
      .filter((night) => matchDayAndNight(night.startDate, day.toISOString()))
      .map((night) => {
        const startDifference = differenceInMilliseconds(
          new Date(night.startDate),
          startOfDay(new Date(day))
        )

        const newStartDate = addMilliseconds(
          startOfDay(new Date()),
          startDifference
        )

        const newEndDate = addMinutes(newStartDate, night.totalDuration)

        return {
          ...night,
          startDate: newStartDate.valueOf(),
          endDate: newEndDate.valueOf()
        }
      })
  }))
})
export const getBedTimeNights = createSelector(
  getTotalTrackedNights,
  (daysWithNights: Day[]) =>
    daysWithNights
      ? daysWithNights.filter((day: Day) => day.inBedDuration ?? -1 > 0)
      : []
)

export const getAsleepNights = createSelector(
  getTotalTrackedNights,
  (daysWithNights: Day[]) =>
    daysWithNights
      ? daysWithNights.filter((day: Day) => day.asleepDuration ?? -1 > 0)
      : []
)

export const getAverageBedTime = createSelector(
  getBedTimeNights,
  (longestNight: Day[]) =>
    longestNight.reduce(
      (acc, n) => (acc + n.inBedDuration ? n.inBedDuration : 0),
      0
    ) / longestNight.length
)

export const getAverageSleepTime = createSelector(
  getAsleepNights,
  (longestNight: Day[]) =>
    mean(longestNight, (item: Day) => item.asleepDuration)
)

export const deviationBedTime = createSelector(
  getBedTimeNights,
  (days: Day[]) => deviation(days, (item: Day) => item.inBedDuration)
)

export const deviationSleep = createSelector(getAsleepNights, (days: Day[]) =>
  deviation(days, (item: Day) => item.asleepDuration)
)

export const getShortestBedTime = createSelector(
  getBedTimeNights,
  (days: Day[]) => min(days, (item: Day) => item.inBedDuration)
)

export const getShortestSleepTime = createSelector(
  getAsleepNights,
  (days: Day[]) => min(days, (item: Day) => item.asleepDuration)
)

export const getLongestBedTime = createSelector(
  getBedTimeNights,
  (longestNight) => max(longestNight, (item) => item.inBedDuration)
)

export const getLongestSleepTime = createSelector(
  getAsleepNights,
  (longestNight: Day[]) => max(longestNight, (item: Day) => item.asleepDuration)
)

export const getNightsWithOver8HoursBedTime = createSelector(
  getBedTimeNights,
  (nightsOver8: Day[]) =>
    nightsOver8.filter((night: Day) => night?.inBedDuration ?? 0 >= 480)
)

export const getNightsWithOver8HoursSleep = createSelector(
  getAsleepNights,
  (nightsOver8: Day[]) =>
    nightsOver8.filter((night: Day) => night?.asleepDuration ?? 0 >= 480)
)
