import {
  CalendarActions,
  SET_SELECTED_DATE
} from '@actions/calendar-actions/types'

const initialState = {
  selectedDay: new Date().toISOString()
}

export type CalendarState = {
  selectedDay: string
}

const reducer = (
  state = initialState,
  action: CalendarActions
): CalendarState => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return { ...state, selectedDay: action.payload }
    default:
      return state
  }
}

export default reducer
