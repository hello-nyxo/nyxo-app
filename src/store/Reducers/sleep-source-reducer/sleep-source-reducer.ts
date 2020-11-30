import { SleepSourceState } from '@typings/state/sleep-source-state'
import {
  SET_MAIN_SOURCE,
  CHANGE_HEALTH_KIT_SOURCE,
  UPDATE_HEALTH_KIT_SOURCES,
  CHANGE_GOOGLE_FIT_SOURCE,
  UPDATE_GOOGLE_FIT_SOURCES,
  SleepSourceActions
} from '@actions/sleep-source-actions/types'
import { SleepSources } from 'src/store/initial-states/sleep-source-state'

const reducer = (
  state = SleepSources,
  action: SleepSourceActions
): SleepSourceState => {
  switch (action.type) {
    case SET_MAIN_SOURCE:
      return { ...state, mainSource: action.payload.mainSource }

    case CHANGE_HEALTH_KIT_SOURCE:
      return { ...state, healthKitSource: action.payload.healthKitSource }

    case UPDATE_HEALTH_KIT_SOURCES:
      return { ...state, allHealthKitSources: action.payload.sources }

    case CHANGE_GOOGLE_FIT_SOURCE:
      return { ...state, googleFitSource: action.payload.googleFitSource }

    case UPDATE_GOOGLE_FIT_SOURCES:
      return { ...state, allGoogleFitSources: action.payload.sources }

    default:
      return state
  }
}

export default reducer
