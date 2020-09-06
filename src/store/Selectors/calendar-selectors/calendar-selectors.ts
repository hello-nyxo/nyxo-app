import reselect, { createSelector } from 'reselect'
import { State } from 'Types/State'

const getCalendarState = (state: State) => state.calendar

export const getSelectedDate = createSelector(
  getCalendarState,
  (calendar) => calendar.selectedDay
)
