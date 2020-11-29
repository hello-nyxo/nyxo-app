import { State } from '@typings/State'
import { createSelector } from 'reselect'

const getCalendarState = (state: State) => state.calendar

export const getSelectedDate = createSelector(
  getCalendarState,
  (calendar) => calendar.selectedDay
)
