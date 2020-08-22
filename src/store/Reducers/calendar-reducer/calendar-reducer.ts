import {
  CREATE_START,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  UPDATE_START
} from '@actions/sleep/sleep-to-cloud-actions'
import { RESET_APP } from '@actions/shared'
import ReduxAction from 'Types/ReduxActions'
import { Day } from 'Types/Sleepdata'
import { DaysState } from 'Types/State/days-state'

const initialState = {
  days: [],
  nights: [],
  loading: false
}

type ServerDays = {
  id: string
  date: string
}

const reducer = (state = initialState, action: ReduxAction): DaysState => {
  const { type, payload, error } = action

  switch (type) {
    case RESET_APP:
      return initialState

    case CREATE_DAYS_START:
      return { ...state, loading: true }

    case CREATE_START:
      return { ...state, loading: true }

    case CREATE_SUCCESS:
      return { ...state, loading: false }

    case CREATE_FAILURE:
      return { ...state, loading: false }

    case UPDATE_START:
      return { ...state, loading: true }

    case UPDATE_SUCCESS:
      return { ...state, loading: false }

    case UPDATE_FAILURE:
      return { ...state, loading: false }

    default:
      return state
  }
}

export default reducer
