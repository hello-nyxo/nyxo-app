import { RESET_APP } from '@actions/shared'
import ReduxAction from 'Types/ReduxActions'
import { DaysState } from 'Types/State/days-state'

export const PULL_START = 'PULL_START'
export const PULL_SUCCESS = 'PULL_SUCCESS'
export const PULL_FAILURE = 'PULL_FAILURE'

export const PUSH_START = 'PUSH_START'
export const PUSH_SUCCESS = 'PUSH_SUCCESS'
export const PUSH_FAILURE = 'PUSH_FAILURE'

const initialState = {
  days: [],
  nights: [],
  loading: false
}

const reducer = (state = initialState, { type }: ReduxAction): DaysState => {
  switch (type) {
    case RESET_APP:
      return initialState

    case PULL_START:
      return { ...state, loading: true }
    default:
      return state
  }
}

export default reducer
