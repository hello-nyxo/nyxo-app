import {
  CoachingContentState,
  ContentUpdate
} from '@typings/CoachingContentState'
import ReduxAction from '@typings/redux-actions'

export const UPDATE_CONTENT_START = 'UPDATE_CONTENT_START'
export const UPDATE_CONTENT_ERROR = 'UPDATE_CONTENT_ERROR'
export const UPDATE_CONTENT_SUCCESS = 'UPDATE_CONTENT_SUCCESS'

export const UPDATE_WEEKS = 'UPDATE_WEEKS'
export const RESET_COACHING = 'RESET_COACHING'
export const UPDATE_LESSONS = 'UPDATE_LESSONS'
export const UPDATE_SECTIONS = 'UPDATE_SECTIONS'
export const UPDATE_EXAMPLE_HABITS = 'UPDATE_EXAMPLE_HABITS'

export const actionCreators = {
  updateContentStart: () => ({
    type: UPDATE_CONTENT_START
  }),

  updateContentError: () => ({
    type: UPDATE_CONTENT_ERROR
  }),

  updateContentSuccess: (payload: ContentUpdate) => ({
    type: UPDATE_CONTENT_SUCCESS,
    payload
  })
}

const initState: CoachingContentState = {
  weeks: [],
  lessons: []
}

const CoachingContentReducer = (
  state = initState,
  action: ReduxAction
): CoachingContentState => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_CONTENT_START: {
      return { ...state, loading: true }
    }

    case UPDATE_CONTENT_SUCCESS: {
      const response: ContentUpdate = payload
      return { ...state, loading: false, ...response }
    }

    case UPDATE_CONTENT_ERROR: {
      return { ...state, loading: false }
    }

    case RESET_COACHING:
      return initState

    default:
      return state
  }
}

export default CoachingContentReducer
