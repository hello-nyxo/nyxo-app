import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { matchDayAndNight } from '@helpers/sleep/sleep-data-helper'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { getMainSource } from '@sleep-source-selectors/sleep-source-selectors'
import { Night, Value } from 'Types/Sleepdata'

const getNights = (state: State) => state.nights

const getTracker = () => 'app.sleepcircle.application'

export const getNightForSelectedDate = createSelector(
  [getNights, getSelectedDate, getTracker],
  (nights, selectedDate, tracker) => {
    console.log(nights, selectedDate, tracker)
    return nights
      .filter((night) => night.sourceId === tracker)
      .map((night) => {
        console.log(night)
        return night
      })
      .filter((night) => matchDayAndNight(night.startDate, selectedDate))
  }
)

export const getInBedDuration = createSelector(
  [getNightForSelectedDate],
  (nights: Night[]) =>
    nights
      .filter((night) => night.value === Value.InBed)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalDuration,
        0
      )
)

export const getAsleepDuration = createSelector(
  [getNightForSelectedDate],
  (nights: Night[]) =>
    nights
      .filter((night) => night.value === Value.Asleep)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalDuration,
        0
      )
)
