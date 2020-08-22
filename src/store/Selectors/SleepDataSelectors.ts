import { deviation, min, max, mean } from 'd3'
import Moment from 'moment'
import { createSelector } from 'reselect'
import { SleepClockState } from '../../Types/SleepClockState'
import { Day } from '../../Types/Sleepdata'
import { State } from '../../Types/State'

const getState = (state: State) => state.sleepclock
const getDays = (state: State) => state.sleepclock.days
const getToday = (state: State) => state.sleepclock.today
const activeIndex = (state: State) => state.sleepclock.activeIndex

export const getInsights = createSelector(
  getState,
  (state: SleepClockState) => state.insights
)

export const getNights = createSelector(
  getState,
  (state: SleepClockState) => state.nights
)

export const getHealthKitEnabled = createSelector(
  getState,
  (state: SleepClockState) => state.healthKitEnabled
)

export const getSelectedDayRating = createSelector(
  getState,
  (state: SleepClockState) => state.selectedDay.rating
)

export const getTotalTrackedNights = createSelector(getDays, (days: Day[]) =>
  days ? days.filter((day: Day) => day.night.length !== 0) : []
)

export const getBedTimeNights = createSelector(
  getTotalTrackedNights,
  (days: Day[]) =>
    days ? days.filter((day: Day) => day.inBedDuration > 0) : []
)

export const getAsleepNights = createSelector(
  getTotalTrackedNights,
  (days: Day[]) =>
    days ? days.filter((day: Day) => day?.asleepDuration > 0) : []
)

export const getAverageBedTime = createSelector(
  getBedTimeNights,
  (longestNight: Day[]) =>
    longestNight.reduce(
      (currentValue, night) =>
        currentValue + night?.inBedDuration ? night?.inBedDuration : 0,
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
  (shortestNight: Day[]) =>
    min(shortestNight, (item: Day) => item.inBedDuration)
)

export const getShortestSleepTime = createSelector(
  getAsleepNights,
  (shortestNight: Day[]) =>
    min(shortestNight, (item: Day) => item.asleepDuration)
)

export const getLongestBedTime = createSelector(getBedTimeNights, (days) =>
  max(days, (day) => day.inBedDuration)
)

export const getLongestSleepTime = createSelector(
  getAsleepNights,
  (longestNight: Day[]) => max(longestNight, (item: Day) => item.asleepDuration)
)

export const getNightsWithOver8HoursBedTime = createSelector(
  getBedTimeNights,
  (days: Day[]) => days.filter((day: Day) => day.inBedDuration >= 480)
)

export const getNightsWithOver8HoursSleep = createSelector(
  getAsleepNights,
  (days: Day[]) => days.filter((day: Day) => day.asleepDuration >= 480)
)

export const getWeek = createSelector(getDays, (days: Day[]) =>
  days.filter((day: Day) => day.night.length !== 0)
)

export const getAllDays = createSelector(getDays, (days: Day[]) => {
  return days
})

export const getWeekSelector = createSelector(
  [getDays, getToday],
  (days, today) => {
    if (!days) return []

    const periodEnd = Moment(today).endOf('day')
    const periodStart = Moment(periodEnd).subtract(7, 'days').startOf('day')

    const filteredDays = days.filter((d: Day) =>
      Moment(d.date).isBetween(periodStart, periodEnd)
    )

    return filteredDays
  }
)

export const getActiveIndex = createSelector(
  activeIndex,
  (index: number | null) => index
)

export const getWakeUpTime = createSelector(
  [getDays, getToday],
  (days, today) => {
    if (!days) return null
    const periodEnd = Moment(today).endOf('day')
    const periodStart = Moment(today).startOf('day')

    const filteredDays = days.find((d: Day) =>
      Moment(d.date).isBetween(periodStart, periodEnd)
    )

    return filteredDays
  }
)

export const getAllReversedSelector = createSelector(
  [getAllDays],
  (daysReversed: Day[]) => (daysReversed ? daysReversed.slice(0).reverse() : [])
)

export const getWeekReversedSelector = createSelector(
  [getWeekSelector],
  (daysReversed: Day[]) => (daysReversed ? daysReversed.slice(0).reverse() : [])
)

export const getSources = createSelector(
  [getState],
  (state: SleepClockState) => state.sleepTrackingSources
)

export const getPrimarySource = createSelector(
  [getState],
  (state: SleepClockState) => state.primarySleepTrackingSource
)

const dummyDay: Day = {
  date: Moment().toISOString(),
  night: [],
  unfilteredNight: [],
  bedStart: '',
  bedEnd: '',
  sleepStart: '',
  sleepEnd: '',
  asleepDuration: 60,
  inBedDuration: 60
}

const getSday = (state: State) =>
  state.sleepclock.selectedDay ? state.sleepclock.selectedDay : dummyDay

const getSleepclock = (state: State) => state.sleepclock

export const getSleepTrackerName = createSelector(
  (state: State) => state.sleepclock.primarySleepTrackingSource.sourceName,
  (sourceName: string) => sourceName
)

export const getSelectedDay = createSelector(
  (state: State) => state.sleepclock.selectedDay,
  (selectedDay) => selectedDay
)

export const getSelectedDayInBedDuration = createSelector(
  getSday,
  (selectedDay) => selectedDay.inBedDuration
)

export const getSelectedDayAsleepDuration = createSelector(
  getSday,
  (selectedDay) => selectedDay.asleepDuration
)

// export const getSelectedDayEfficiency = createSelector(
//   getSday,
//   selectedDay =>( selectedDay.asleepDuration / selectedDay.inBedDuration)
// );

export const getSleepDataUpdated = createSelector(
  getSleepclock,
  (updated) => updated.sleepDataUpdated
)

export const getSelectedItem = createSelector(
  getSleepclock,
  (sleepclock) => sleepclock.selectedItem
)

export const getStartDate = createSelector(
  getSleepclock,
  (sleepclock: SleepClockState) => sleepclock.startDate
)
