import { matchDayAndNight } from '@helpers/sleep/sleep-data-helper'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { getSharedSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { Night, Value } from '@typings/Sleepdata'
import { State } from '@typings/State'
import { deviation, max, mean, min } from 'd3'
import {
  addMilliseconds,
  addMinutes,
  differenceInMilliseconds,
  eachDayOfInterval,
  startOfDay,
  subDays
} from 'date-fns'
import { createSelector } from 'reselect'

const getNights = (state: State) => state.nights.nights

export const getNightForSelectedDate = createSelector(
  [getNights, getSelectedDate, getSharedSource],
  (nights, selectedDate, tracker) => {
    return nights
      .filter((night) => night.sourceId === tracker.sourceId)
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
  // const firstDate = min([...nights?.map((night) => new Date(night.startDate))])
  // const lastDate = max([...nights?.map((night) => new Date(night.endDate))])

  const days = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: new Date() // lastDate
  })

  return days.map((day) => ({
    date: day.toISOString(),
    inBedDuration: 0,
    asleepDuration: 0,
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
  getNightsAsDays,
  (daysWithNights) =>
    daysWithNights
      ? daysWithNights.filter((day) => day.inBedDuration ?? -1 > 0)
      : []
)

export const getAsleepNights = createSelector(
  getNightsAsDays,
  (daysWithNights) =>
    daysWithNights
      ? daysWithNights.filter((day) => day.asleepDuration ?? -1 > 0)
      : []
)

export const getAverageBedTime = createSelector(
  getBedTimeNights,
  (longestNight) =>
    longestNight.reduce(
      (acc, n) => (acc + n.inBedDuration ? n.inBedDuration : 0),
      0
    ) / longestNight.length
)

export const getAverageSleepTime = createSelector(
  getAsleepNights,
  (longestNight) => mean(longestNight, (item) => item.asleepDuration)
)

export const deviationBedTime = createSelector(getBedTimeNights, (days) =>
  deviation(days, (item) => item.inBedDuration)
)

export const deviationSleep = createSelector(getAsleepNights, (days) =>
  deviation(days, (item) => item.asleepDuration)
)

export const getShortestBedTime = createSelector(getBedTimeNights, (days) =>
  min(days, (item) => item.inBedDuration)
)

export const getShortestSleepTime = createSelector(getAsleepNights, (days) =>
  min(days, (item) => item.asleepDuration)
)

export const getLongestBedTime = createSelector(
  getBedTimeNights,
  (longestNight) => max(longestNight, (item) => item.inBedDuration)
)

export const getLongestSleepTime = createSelector(
  getAsleepNights,
  (longestNight) => max(longestNight, (item) => item.asleepDuration)
)

export const getNightsWithOver8HoursBedTime = createSelector(
  getBedTimeNights,
  (nightsOver8) =>
    nightsOver8.filter((night) => night?.inBedDuration ?? 0 >= 480)
)

export const getNightsWithOver8HoursSleep = createSelector(
  getAsleepNights,
  (nightsOver8) =>
    nightsOver8.filter((night) => night?.asleepDuration ?? 0 >= 480)
)
