import { createSelector } from 'reselect'
import { InsightState } from 'Types/State/insight-state'
import { State } from 'Types/State'

const getInsights = (state: State) => state.insights

const dummyDate = new Date().toISOString()
const dummyInsights: InsightState = {
  bedTimeWindow: {
    start: dummyDate,
    center: dummyDate,
    end: dummyDate
  }
}

export const getGoToSleepWindowStart = createSelector(
  getInsights,
  (insights) => {
    if (!insights || !insights.bedTimeWindow?.start) {
      return dummyInsights.bedTimeWindow.start
    }
    return insights.bedTimeWindow?.start
  }
)

export const getGoToSleepWindowCenter = createSelector(
  getInsights,
  (insights) => {
    if (!insights || !insights.bedTimeWindow.center) {
      return dummyInsights.bedTimeWindow.center
    }
    return insights.bedTimeWindow?.center
  }
)

export const getGoToSleepWindowEnd = createSelector(getInsights, (insights) => {
  if (!insights || !insights?.bedTimeWindow?.end) {
    return dummyInsights.bedTimeWindow.end
  }
  return insights.bedTimeWindow.end
})
