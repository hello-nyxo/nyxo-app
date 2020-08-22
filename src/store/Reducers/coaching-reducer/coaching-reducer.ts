import {
  RESET_COACHING,
  COMPLETE_COACHING,
  COMPLETE_LESSON,
  COMPLETE_WEEK,
  END_COACHING,
  RESUME_COACHING,
  SELECT_LESSON,
  SELECT_WEEK,
  SET_ACTIVE_MONTH,
  SET_ACTIVE_WEEK,
  START_COACHING,
  START_WEEK
} from '@actions/coaching/coaching-actions'
import { RESET_APP } from '@actions/shared'
import moment from 'moment'
import ReduxAction from 'Types/ReduxActions'
import {
  CoachingState,
  STAGE,
  CoachingMonth,
  StateWeek
} from 'typings/state/coaching-state'
import { WEEK_STAGE } from 'store/Selectors/coaching-selectors'

const initialState: CoachingState = {
  stage: STAGE.NOT_ALLOWED,

  selectedWeek: null,
  selectedLesson: null,

  activeCoachingMonth: null,
  activeCoachingWeek: null,
  activeCoachingLesson: null,

  coachingMonths: []
}

const reducer = (state = initialState, action: ReduxAction): CoachingState => {
  const { type, payload } = action

  switch (type) {
    case RESET_APP:
      return initialState

    case RESET_COACHING:
      return initialState

    case START_COACHING:
      return {
        ...state,
        activeCoachingMonth: payload.activeMonth.id,
        coachingMonths: [...state.coachingMonths, payload.activeMonth],
        activeCoachingWeek: payload.activeWeek.slug
      }

    case END_COACHING:
      return { ...state, activeCoachingMonth: null, activeCoachingWeek: null }

    case RESUME_COACHING: {
      return { ...state, activeCoachingMonth: payload }
    }

    case SELECT_WEEK:
      return { ...state, selectedWeek: payload }

    case SELECT_LESSON:
      return { ...state, selectedLesson: payload }

    case SET_ACTIVE_WEEK:
      return { ...state, activeCoachingWeek: payload }

    case SET_ACTIVE_MONTH:
      return { ...state, activeCoachingMonth: payload }

    case COMPLETE_LESSON: {
      const { coachingMonths, activeCoachingMonth } = state
      const activeMonth = coachingMonths.find(
        (month) => month.id === activeCoachingMonth
      )
      if (typeof activeMonth === 'undefined') return { ...state }

      const months = coachingMonths.filter(
        (month) => month.id !== activeCoachingMonth
      )
      const existingLessons =
        typeof activeMonth?.lessons !== 'undefined' ? activeMonth.lessons : []

      return {
        ...state,
        coachingMonths: [
          ...months,
          {
            ...activeMonth,
            lessons: [...new Set([...existingLessons, payload])]
          }
        ]
      }
    }

    case START_WEEK: {
      const { coachingMonths, activeCoachingMonth } = state
      const activeMonth = coachingMonths.find(
        (month) => month.id === activeCoachingMonth
      )
      if (typeof activeMonth === 'undefined') return { ...state }

      return { ...state }
    }

    case COMPLETE_WEEK: {
      const { coachingMonths, activeCoachingMonth } = state
      const activeMonth = coachingMonths.find(
        (month) => month.id === activeCoachingMonth
      )
      if (typeof activeMonth === 'undefined') return { ...state }
      const months = coachingMonths.filter(
        (month) => month.id !== activeCoachingMonth
      )
      const weeks =
        typeof activeMonth?.weeks !== 'undefined' ? activeMonth.weeks : []
      const filtered = weeks.filter(
        (week) =>
          week.slug !== payload.completedWeekSlug &&
          week.slug !== payload.nextWeekSlug
      )

      const completedWeek: StateWeek = {
        slug: payload.completedWeekSlug,
        ...weeks.find((week) => week.slug === payload.completedWeekSlug),
        ended: moment().toISOString(),
        stage: WEEK_STAGE.COMPLETED
      }

      const nextWeek: StateWeek = {
        slug: payload.completedWeekSlug,
        ...weeks.find((week) => week.slug === payload.nextWeekSlug),
        stage: WEEK_STAGE.CAN_BE_STARTED
      }

      const weeksToAdd = nextWeek ? [completedWeek, nextWeek] : [completedWeek]

      return {
        ...state,
        activeCoachingWeek: null,
        coachingMonths: [
          ...months,
          { ...activeMonth, weeks: [...filtered, ...weeksToAdd] }
        ]
      }
    }

    case COMPLETE_COACHING:
      return { ...state, coachingMonths: [] }

    default:
      return state
  }
}

export default reducer
