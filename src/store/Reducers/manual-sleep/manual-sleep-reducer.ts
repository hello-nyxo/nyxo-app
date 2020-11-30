import { ManualDataState } from '@typings/state/ManualDataState'
import { manualData } from 'src/store/initial-states/manual-data-state'
import {
  ManualSleepActions,
  SET_VALUES,
  TOGGLE_EDIT_MODE
} from '@actions/manual-sleep/types'

const reducer = (
  state: ManualDataState = manualData,
  action: ManualSleepActions
): ManualDataState => {
  switch (action.type) {
    case SET_VALUES:
      return {
        ...state,
        startTime: action.payload.start,
        endTime: action.payload.end
      }

    case TOGGLE_EDIT_MODE:
      return { ...state, editMode: !state.editMode }

    default:
      return state
  }
}

export default reducer
