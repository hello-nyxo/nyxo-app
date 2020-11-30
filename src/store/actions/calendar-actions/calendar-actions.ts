import { CalendarActions, SET_SELECTED_DATE } from './types'

/* ACTIONS */

export const setSelectedDate = (date: string): CalendarActions => ({
  type: SET_SELECTED_DATE,
  payload: date
})
