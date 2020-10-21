import { getWeek } from '@selectors/SleepDataSelectors'
import { Day } from '@typings/Sleepdata'
import { GetState } from '@typings/GetState'
import moment from 'moment'
import { nearestMinutes } from '@helpers/time'
import ReduxAction, { Dispatch, Thunk } from '@typings/redux-actions'
/* ACTION TYPES */

export const CALCULATE_INSIGHT_START = 'CALCULATE_INSIGHT_START'
export const CALCULATE_INSIGHT_SUCCESS = 'CALCULATE_INSIGHT_SUCCESS'
export const CALCULATE_INSIGHT_FAILURE = 'CALCULATE_INSIGHT_FAILURE'

/* ACTIONS */

export const calculationStart = (): ReduxAction => ({
  type: CALCULATE_INSIGHT_START
})

export const calculationSuccess = (insights: Insight): ReduxAction => ({
  type: CALCULATE_INSIGHT_SUCCESS,
  payload: insights
})
export const calculationFailure = (): ReduxAction => ({
  type: CALCULATE_INSIGHT_FAILURE
})

/* ASYNC ACTIONS */

type BedTimeWindowInsight = {
  start: string | undefined
  center: string | undefined
  end: string | undefined
}
type Insight = {
  bedTimeWindow: BedTimeWindowInsight
}

export const calculateBedtimeWindow = (days: Day[]): BedTimeWindowInsight => {
  let averageBedTime = 0
  let divideBy = 0
  days.forEach((day) => {
    const dayStarted = moment(day.date) // Beginning of the day
    if (day.bedStart) {
      const bedTimeStart = moment(day.bedStart)

      const totalDifference = bedTimeStart.diff(dayStarted, 'minutes')
      // Add difference to the average time
      averageBedTime += totalDifference
      // increment divider
      divideBy += 1
    }
  })

  if (divideBy !== 0) {
    averageBedTime /= divideBy
  }

  // Remove the extra 24 hours
  if (averageBedTime > 1440) {
    averageBedTime = -1440
  }

  const bedTimeWindowCenter = nearestMinutes(
    15,
    moment().startOf('day').minutes(averageBedTime)
  ).toISOString()

  const bedTimeWindowStart = moment(bedTimeWindowCenter)
    .subtract(45, 'minutes')
    .toISOString()

  const bedTimeWindowEnd = moment(bedTimeWindowCenter)
    .add(45, 'minutes')
    .toISOString()

  const insights = {
    start: bedTimeWindowStart,
    center: bedTimeWindowCenter,
    end: bedTimeWindowEnd
  }

  return insights
}

export const calculateInsights = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch(calculationStart())
  const week = getWeek(getState())
  const insights = calculateBedtimeWindow(week)

  try {
    dispatch(calculationSuccess({ bedTimeWindow: insights }))
  } catch (error) {
    dispatch(calculationFailure())
  }
}
