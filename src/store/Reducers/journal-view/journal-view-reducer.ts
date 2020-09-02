import moment from 'moment'
import ReduxAction from 'Types/ReduxActions'
import { RESET_APP } from '@actions/shared'
import {
  SET_ACTIVE_INDEX,
  SET_SELECTED_DAY,
  SET_TODAY_AS_SELECTED
} from '@actions/sleep/sleep-data-actions'
import { SleepClockState } from 'Types/SleepClockState'
import { Day } from 'Types/Sleepdata'
import { sameDay } from @helpers/time'
import { initialState } from '../../InitialStates/SleepClock'

const reducer = (
  state = initialState,
  action: ReduxAction
): SleepClockState => {
  const { type, payload, error } = action

  switch (type) {
    case RESET_APP:
      return initialState

    case SET_SELECTED_DAY: {
      const selectedDay = state.days.find((d: Day) =>
        sameDay(payload.date, d.date)
      )
      const day = selectedDay || state.selectedDay

      return { ...state, selectedDay: day }
    }

    case SET_TODAY_AS_SELECTED: {
      const selectedDay = state.days.find((day: Day) =>
        sameDay(payload, day.date)
      )
      const day = selectedDay || state.selectedDay

      return { ...state, selectedDay: day }
    }

    case SET_ACTIVE_INDEX:
      return { ...state, activeIndex: payload }

    default:
      return state
  }
}

export default reducer

const verifyDates = (days: Day[]): Day[] => {
  const checkedDays: Day[] = []

  days.forEach((day) => {
    const dayNotInFuture = moment(day.date).isBefore(moment())
    const checkedDaysHasThisValue = checkedDays.find(
      (addedDay) => addedDay.date === day.date
    )

    if (dayNotInFuture && !checkedDaysHasThisValue) {
      checkedDays.push(day)
    }
  })

  return checkedDays
}
