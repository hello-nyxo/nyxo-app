import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { getSelectedDay } from './SleepDataSelectors'

export const getCurrentDaySuggestOtherSource = createSelector(
  getSelectedDay,
  (day) => {
    const otherSourcesExist = day.unfilteredNight
      ? day.unfilteredNight.length !== 0
      : false
    if (day.night.length === 0 && otherSourcesExist) {
      return 'MAYBE_CHANGE_SOURCE'
    } else if (day.night.length === 0 && !otherSourcesExist) {
      return 'ADD_DATA_MANUALLY'
    } else if (day.night.length !== 0 && !day.rating) {
      return 'MAYBE_ADD_RATING'
    }
  }
)
