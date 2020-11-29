import { nearestMinutes } from '@helpers/time'
import { Dispatch, Thunk } from '@typings/redux-actions'
import { Day } from '@typings/Sleepdata'
import moment from 'moment'
import {
  BedTimeWindowInsight,
  CALCULATE_INSIGHT_FAILURE,
  CALCULATE_INSIGHT_START,
  CALCULATE_INSIGHT_SUCCESS,
  Insight,
  InsightActionTypes
} from './types'

export const calculationStart = (): InsightActionTypes => ({
  type: CALCULATE_INSIGHT_START
})

export const calculationSuccess = (insights: Insight): InsightActionTypes => ({
  type: CALCULATE_INSIGHT_SUCCESS,
  payload: insights
})
export const calculationFailure = (error: string): InsightActionTypes => ({
  type: CALCULATE_INSIGHT_FAILURE,
  payload: error
})

/* ASYNC ACTIONS */

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

export const calculateInsights = (): Thunk => async (dispatch: Dispatch) => {
  dispatch(calculationStart())

  try {
  } catch (error) {
    dispatch(calculationFailure())
  }
}
