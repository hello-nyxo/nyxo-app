import {
  CoachingContentState,
  ContentWeek,
  ContentLesson,
  Section,
  ExampleHabit,
  ContentUpdate
} from '../../Types/CoachingContentState'
import ReduxAction from '../../Types/ReduxActions'

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
  }),

  updateWeeks: (weeks: ContentWeek[]) => {
    return { type: UPDATE_WEEKS, payload: weeks }
  },
  updateLessons: (lessons: ContentLesson[]) => {
    return { type: UPDATE_LESSONS, payload: lessons }
  },
  updateSections: (sections: Section[]) => {
    return { type: UPDATE_SECTIONS, payload: sections }
  },
  updateExampleHabits: (habits: ExampleHabit[]) => {
    return { type: UPDATE_SECTIONS, payload: habits }
  }
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

    case UPDATE_WEEKS:
      return { ...state, weeks: payload }

    case UPDATE_LESSONS:
      return { ...state, lessons: payload }

    case UPDATE_SECTIONS:
      return { ...state, sections: payload }

    case UPDATE_EXAMPLE_HABITS:
      return { ...state, habits: payload }

    default:
      return state
  }
}

export default CoachingContentReducer
