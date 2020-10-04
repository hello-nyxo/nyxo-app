import ReduxAction from '@typings/ReduxActions'
import { SleepSourceState } from '@typings/state/sleep-source-state'
import {
  SET_MAIN_SOURCE,
  CHANGE_HEALTH_KIT_SOURCE,
  UPDATE_HEALTH_KIT_SOURCES,
  CHANGE_GOOGLE_FIT_SOURCE,
  UPDATE_GOOGLE_FIT_SOURCES
} from '@actions/sleep-source-actions/sleep-source-actions'

const initialState: SleepSourceState = {}

const reducer = (
  state = initialState,
  action: ReduxAction
): SleepSourceState => {
  const { type, payload } = action

  switch (type) {
    case SET_MAIN_SOURCE:
      return { ...state, mainSource: payload.mainSource }

    case CHANGE_HEALTH_KIT_SOURCE:
      return { ...state, healthKitSource: payload.healthKitSource }

    case UPDATE_HEALTH_KIT_SOURCES:
      return { ...state, allHealthKitSources: payload.sources }

    case CHANGE_GOOGLE_FIT_SOURCE:
      return { ...state, googleFitSource: payload.googleFitSource }

    case UPDATE_GOOGLE_FIT_SOURCES:
      return { ...state, allGoogleFitSources: payload.sources }

    default:
      return state
  }
}

export default reducer
