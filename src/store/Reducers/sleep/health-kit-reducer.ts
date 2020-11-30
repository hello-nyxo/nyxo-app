import HealthKitState from '@typings/state/health-kit-state'
import {
  FETCH_SLEEP_HEALTH_KIT_FAILURE,
  FETCH_SLEEP_HEALTH_KIT_START,
  FETCH_SLEEP_HEALTH_KIT_SUCCESS,
  SleepActions,
  TOGGLE_USE_HEALTH_KIT,
  SET_HEALTH_KIT_STATUS
} from '@actions/sleep/types'

const initialState: HealthKitState = {
  useHealthKit: false,
  healthKitSource: null,
  healthKitAvailable: false,

  loading: false
}

const reducer = (
  state = initialState,
  action: SleepActions
): HealthKitState => {
  switch (action.type) {
    case SET_HEALTH_KIT_STATUS:
      return { ...state, healthKitAvailable: action.payload }

    case TOGGLE_USE_HEALTH_KIT:
      return { ...state, healthKitAvailable: action.payload }

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
