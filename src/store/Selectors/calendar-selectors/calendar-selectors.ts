import reselect, { createSelector } from 'reselect'
import { State } from 'Types/State'

const getCalendarState = (state: State) => state.calendar

export const getSeletedDate = createSelector(
  getCalendarState,
  (calendar) => calendar.selectedDay
)
