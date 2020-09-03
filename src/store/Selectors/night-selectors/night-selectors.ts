import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { matchDayAndNight } from '@helpers/sleep/sleep-data-helper'
import { getSday } from '../SleepDataSelectors'
import { getMainSource } from '../sleep-source-selectors/sleep-source-selectors'

const getNights = (state: State) => state.nights

const getTracker = () => 'com.apple.Health'

export const getNightForSelectedDate = createSelector(
  [getNights, getSday, getTracker],
  (nights, selectedDate, tracker) => {
    return nights
      .filter((night) => night.sourceId === tracker)
      .filter((night) => matchDayAndNight(night.startDate, selectedDate))
  }
)
