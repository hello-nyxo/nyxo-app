import { InsightState } from '@typings/state/insight-state'
import {
  InsightActionTypes,
  CALCULATE_INSIGHT_FAILURE,
  CALCULATE_INSIGHT_START,
  CALCULATE_INSIGHT_SUCCESS
} from '@actions/insight-actions/types'

const initialState: InsightState = {
  loading: false,
  bedTimeWindow: {
    start: undefined,
    center: undefined,
    end: undefined
  }
}

const reducer = (
  state = initialState,
  action: InsightActionTypes
): InsightState => {
  switch (action.type) {
    case CALCULATE_INSIGHT_START:
      return { ...state, loading: true }

    case CALCULATE_INSIGHT_SUCCESS:
      return {
        ...state,
        loading: false,
        bedTimeWindow: action.payload.bedTimeWindow
      }

    case CALCULATE_INSIGHT_FAILURE:
      return { ...state, loading: false }

    default:
      return state
  }
}

export default reducer
