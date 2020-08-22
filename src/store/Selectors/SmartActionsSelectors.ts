import { createSelector } from 'reselect'
import { State } from '../../Types/State'

const getState = (state: State) => state.sleepclock

export const getSelectedDay = createSelector(
  getState,
  (state) => state.selectedDay
)

export const getCurrentDaySuggestOtherSource = createSelector(
  getSelectedDay,
  (day) => {
    const otherSourcesExist = day.unfilteredNight
      ? day.unfilteredNight.length !== 0
      : false
    if (day.night.length === 0 && otherSourcesExist) {
      return 'MAYBE_CHANGE_SOURCE'
    }
    if (day.night.length === 0 && !otherSourcesExist) {
      return 'ADD_DATA_MANUALLY'
    }
    if (day.night.length !== 0 && !day.rating) {
      return 'MAYBE_ADD_RATING'
    }
    return 'ALL_GOOD'
  }
)
