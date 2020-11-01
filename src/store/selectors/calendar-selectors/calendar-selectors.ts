import reselect, { createSelector } from 'reselect'
import { State } from '@typings/State'

const getCalendarState = (state: State) => state.calendar

export const getSelectedDate = createSelector(
  getCalendarState,
  (calendar) => calendar.selectedDay
)
