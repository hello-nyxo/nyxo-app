import { AppThunk } from '@typings/redux-actions'
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

export const calculateInsights = (): AppThunk => async (dispatch) => {
  dispatch(calculationStart())
  try {
    // FIXME

    dispatch(
      calculationSuccess({
        bedTimeWindow: { start: undefined, center: undefined, end: undefined }
      })
    )
  } catch (error) {
    dispatch(calculationFailure(error))
  }
}
