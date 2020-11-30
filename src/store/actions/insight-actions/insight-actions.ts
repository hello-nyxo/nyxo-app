import { getNightsAsDays } from '@selectors/night-selectors'
import { Thunk } from '@typings/redux-actions'
import {
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

export const calculateInsights = (): Thunk => async (dispatch, getState) => {
  dispatch(calculationStart())
  const nights = getNightsAsDays(getState())
  try {
    dispatch(calculationSuccess())
  } catch (error) {
    dispatch(calculationFailure(error))
  }
}
