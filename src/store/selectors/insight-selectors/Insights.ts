import { clockTimeToAngle } from '@helpers/geometry'
import { createSelector } from '@reduxjs/toolkit'
import { State } from '@typings/State'
import { InsightState } from '@typings/state/insight-state'
import { set } from 'date-fns'

const getInsights = (state: State) => state.insights

const dummyInsights: InsightState = {
  bedTimeWindow: {
    start: set(new Date(), { hours: 22, minutes: 0, seconds: 0 }).toISOString(),
    end: set(new Date(), {
      hours: 23,
      minutes: 30,
      seconds: 0
    }).toISOString(),
    center: set(new Date(), {
      hours: 22,
      minutes: 45,
      seconds: 0
    }).toISOString()
  }
}

export const getGoToSleepWindowStart = createSelector(
  getInsights,
  (insights) => {
    return (
      insights?.bedTimeWindow?.start ??
      (dummyInsights.bedTimeWindow.start as string)
    )
  }
)

export const getGoToSleepWindowCenter = createSelector(
  getInsights,
  (insights) => {
    return (
      insights?.bedTimeWindow?.center ??
      (dummyInsights.bedTimeWindow.center as string)
    )
  }
)

export const getGoToSleepWindowEnd = createSelector(getInsights, (insights) => {
  return (
    insights?.bedTimeWindow?.end ?? (dummyInsights.bedTimeWindow.end as string)
  )
})

export const getBedtimeWindowArc = createSelector(
  [getGoToSleepWindowStart, getGoToSleepWindowEnd],
  (start, end) => ({
    startAngle: clockTimeToAngle(start),
    endAngle: clockTimeToAngle(end)
  })
)
