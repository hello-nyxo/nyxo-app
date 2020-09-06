import { RESET_APP } from '@actions/shared'
import { SET_SELECTED_DATE } from '@actions/calendar-actions/calendar-actions'
import ReduxAction from 'Types/ReduxActions'

const initialState = {
  selectedDay: new Date().toISOString()
}

export type CalendarState = {
  selectedDay: string
}

const reducer = (state = initialState, action: ReduxAction): CalendarState => {
  const { type, payload } = action

  switch (type) {
    case RESET_APP:
      return initialState

    case SET_SELECTED_DATE:
      // payload: isoString
      console.log(state)
      return { ...state, selectedDay: payload }

    default:
      return state
  }
}

export default reducer
