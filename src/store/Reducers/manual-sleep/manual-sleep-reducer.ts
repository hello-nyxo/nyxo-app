import ReduxAction from 'Types/ReduxActions'
import {
  SET_VALUES,
  TOGGLE_EDIT_MODE
} from '@actions/manual-sleep/manual-sleep-actions'
import { RESET_APP } from '@actions/shared'
import { ManualDataState } from 'Types/State/ManualDataState'

const initialState: ManualDataState = {
  editMode: false,
  startTime: { h: 0, m: 0 },
  endTime: { h: 0, m: 0 }
}

const reducer = (
  state: ManualDataState = initialState,
  { payload, type }: ReduxAction
): ManualDataState => {
  switch (type) {
    case RESET_APP:
      return initialState

    case SET_VALUES:
      return { ...state, startTime: payload.start, endTime: payload.end }

    case TOGGLE_EDIT_MODE:
      return { ...state, editMode: !state.editMode }

    default:
      return state
  }
}

export default reducer
