import ReduxAction from '@typings/ReduxActions'
import HealthKitState from '@typings/state/health-kit-state'
import {
  FETCH_SLEEP_HEALTH_KIT_FAILURE,
  FETCH_SLEEP_HEALTH_KIT_START,
  FETCH_SLEEP_HEALTH_KIT_SUCCESS,
  TOGGLE_HEALTH_KIT_AVAILABILITY,
  TOGGLE_USE_HEALTH_KIT
} from '@actions/sleep/health-kit-actions'

const initialState: HealthKitState = {
  useHealthKit: false,
  healthKitSource: null,
  healthKitAvailable: false,

  loading: false
}

const reducer = (
  state = initialState,
  { payload, type }: ReduxAction
): HealthKitState => {
  switch (type) {
    case TOGGLE_HEALTH_KIT_AVAILABILITY:
      return { ...state, healthKitAvailable: payload }

    case TOGGLE_USE_HEALTH_KIT:
      return { ...state, healthKitAvailable: payload }

    case FETCH_SLEEP_HEALTH_KIT_START:
      return { ...state, loading: true }

    case FETCH_SLEEP_HEALTH_KIT_SUCCESS:
      return { ...state, loading: false }

    case FETCH_SLEEP_HEALTH_KIT_FAILURE:
      return { ...state, loading: false }

    default:
      return state
  }
}

export default reducer
