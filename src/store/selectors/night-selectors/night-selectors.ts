import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { matchDayAndNight } from '@helpers/sleep/sleep-data-helper'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { getMainSource } from '@sleep-source-selectors/sleep-source-selectors'
import { Night, Value } from 'Types/Sleepdata'
import {
  differenceInDays,
  min,
  max,
  eachDayOfInterval,
  subDays,
  differenceInMilliseconds,
  startOfDay,
  addMilliseconds,
  addMinutes
} from 'date-fns'

const getNights = (state: State) => state.nights

const getTracker = () => 'com.ouraring.oura'

export const getNightForSelectedDate = createSelector(
  [getNights, getSelectedDate, getTracker],
  (nights, selectedDate, tracker) => {
    console.log('nights', nights, selectedDate)
    return nights
      .filter((night) => night.sourceId === tracker)
      .map((night) => {
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

export const getMonthOfNights = createSelector(getNights, (night) => night)

export const getNightsAsDays = createSelector(getNights, (nights) => {
  const firstDate = min([...nights.map((night) => new Date(night.startDate))])
  const lastDate = max([...nights.map((night) => new Date(night.endDate))])

  const days = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: new Date() // lastDate
  })

  return days.map((day) => ({
    date: day.toISOString(),
    night: nights
      .filter((night) => matchDayAndNight(night.startDate, day.toISOString()))
      .map((night) => {
        const startDifference = differenceInMilliseconds(
          new Date(night.startDate),
          startOfDay(new Date(day))
        )

        const newStartDate = addMilliseconds(
          startOfDay(new Date()),
          startDifference
        )

        const newEndDate = addMinutes(newStartDate, night.totalDuration)

        return {
          ...night,
          startDate: newStartDate.valueOf(),
          endDate: newEndDate.valueOf()
        }
      })
  }))
})

// const startDifference = moment.duration(
// 	moment(night.startDate).diff(trueDate.startOf('day'))
// )
// const newStartDate = moment().startOf('day').add(startDifference)

// const normalizeSleepData = (night: Night[]): NormalizedDay[] => {
//   const normalizedNights = day.night.map((night) => {
//     const trueDate = new Date(day.date)

//     const startDifference = moment.duration(
// 			differenceInDays(new Date(night.startDate), )

// 			moment(night.startDate).diff(trueDate.startOf('day'))
//     )
//     const newStartDate = moment().startOf('day').add(startDifference)

//     const newEndDate = moment(newStartDate).add(night.totalDuration, 'minutes')

//     return {
//       ...night,
//       startDate: newStartDate.valueOf(),
//       endDate: newEndDate.valueOf()
//     }
//   })

//   return { ...day, night: normalizedNights }

//   return normalized
// }
