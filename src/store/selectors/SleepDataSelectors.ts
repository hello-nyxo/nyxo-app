import { deviation, max, mean, min } from 'd3'
import { clockTimeToAngle } from 'helpers/geometry'
import Moment from 'moment'
import { createSelector } from 'reselect'
import { SleepClockState } from 'Types/SleepClockState'
import { Day, Days } from 'Types/Sleepdata'
import { State } from 'Types/State'

const getState = (state: State) => state.sleepclock
const getDays = (state: State) => state.sleepclock.days
const getToday = (state: State) => state.sleepclock.today

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

export const getTotalTrackedNights = createSelector(
  getDays,
  (daysWithNights: Day[]) =>
    daysWithNights
      ? daysWithNights.filter((day: Day) => day.night.length !== 0)
      : []
)

export const getBedTimeNights = createSelector(
  getTotalTrackedNights,
  (daysWithNights: Day[]) =>
    daysWithNights
      ? daysWithNights.filter((day: Day) => day.inBedDuration > 0)
      : []
)

export const getAsleepNights = createSelector(
  getTotalTrackedNights,
  (daysWithNights: Day[]) =>
    daysWithNights
      ? daysWithNights.filter((day: Day) => day.asleepDuration > 0)
      : []
)

export const getAverageBedTime = createSelector(
  getBedTimeNights,
  (longestNight: Day[]) =>
    longestNight.reduce((acc, n) => acc + n.inBedDuration, 0) /
    longestNight.length
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
    nightsOver8.filter((night: Day) => night.inBedDuration >= 480)
)

export const getNightsWithOver8HoursSleep = createSelector(
  getAsleepNights,
  (nightsOver8: Day[]) =>
    nightsOver8.filter((night: Day) => night.asleepDuration >= 480)
)

export const getWeek = createSelector(getDays, (daysWithNights: Day[]) =>
  daysWithNights.filter((day: Day) => day.night.length !== 0)
)

export const getAllDays = createSelector(getDays, (days: Day[]) => {
  return days
})

export const getAllDaysInMonthSections = createSelector(
  getAllDays,
  (allDays) => {
    const sections: { title: number; data: Array<Day> }[] = []

    allDays.forEach((day) => {
      const month = Moment(day.date).month()
      const existingSectionIndex = sections.findIndex(
        (section) => section.title === month
      )
      if (existingSectionIndex !== -1) {
        sections[existingSectionIndex].data = [
          ...sections[existingSectionIndex].data,
          day
        ]
      } else {
        sections.push({ title: month, data: [day] })
      }
    })

    return sections
  }
)

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
  getState,
  (state) => state.activeIndex
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
  date: Moment().startOf('day').toISOString(),
  night: [],
  unfilteredNight: [],
  bedStart: '',
  bedEnd: '',
  sleepStart: '',
  sleepEnd: '',
  asleepDuration: 60,
  inBedDuration: 60
}

export const getSday = (state: State) =>
  state.sleepclock.selectedDay ? state.sleepclock.selectedDay : dummyDay.date

const getSleepclock = (state: State) => state.sleepclock

export const getSleepTrackerName = createSelector(
  (state: State) => state.sleepclock.primarySleepTrackingSource.sourceName,
  (sourceName: string) => sourceName
)

export const getSelectedDay = createSelector(
  [getDays, getSday],
  (days, selectedDay) => {
    const fromState = days.find((day) => day.date === selectedDay)
    const day = fromState ?? { ...dummyDay, date: selectedDay }
    return day
  }
)

export const getSelectedDayInBedDuration = createSelector(
  getSelectedDay,
  (selectedDay) => (selectedDay ? selectedDay.inBedDuration : 0)
)

export const getSelectedDayAsleepDuration = createSelector(
  getSelectedDay,
  (selectedDay) => (selectedDay ? selectedDay.asleepDuration : 0)
)

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

export const getNightInAngles = createSelector(getSelectedDay, (day) => {
  if (day?.bedEnd && day?.bedStart) {
    return {
      startAngle: clockTimeToAngle(day.bedStart),
      endAngle: clockTimeToAngle(day.bedEnd)
    }
  }
  if (day?.sleepEnd && day?.sleepStart) {
    return {
      startAngle: clockTimeToAngle(day.sleepStart),
      endAngle: clockTimeToAngle(day.sleepEnd)
    }
  }
  return {
    startAngle: 0,
    endAngle: 0
  }
})
