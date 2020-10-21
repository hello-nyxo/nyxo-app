import {
  CALCULATE_INSIGHT_FAILURE,
  CALCULATE_INSIGHT_START,
  CALCULATE_INSIGHT_SUCCESS
} from '@actions/insight-actions/insight-actions'
import { InsightState } from '@typings/state/insight-state'
import { RESET_APP } from '@actions/shared'
import ReduxAction from '@typings/redux-actions'

const initialState: InsightState = {
  loading: false,
  bedTimeWindow: {
    start: undefined,
    center: undefined,
    end: undefined
  }
}

const reducer = (state = initialState, action: ReduxAction): InsightState => {
  const { type, payload, error } = action

  switch (type) {
    case RESET_APP:
      return initialState

    case CALCULATE_INSIGHT_START:
      return { ...state, loading: true }

    case CALCULATE_INSIGHT_SUCCESS:
      return { ...state, loading: false, bedTimeWindow: payload.bedTimeWindow }

    case CALCULATE_INSIGHT_FAILURE:
      return { ...state, loading: false }

    default:
      return state
  }
}

export default reducer
