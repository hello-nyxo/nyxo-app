import { RESET_APP } from '@actions/shared'
import {
  CREATE_NEW_CALENDAR,
  PUSH_NEW_DAYS_TO_CALENDAR,
  RATE_NIGHT,
  SET_ACTIVE_INDEX,
  SET_SELECTED_DAY,
  SET_START_DATE,
  SET_TODAY,
  SET_TODAY_AS_SELECTED,
  UPDATE_DAY,
  UPDATE_SLEEP_DATA
} from '@actions/sleep/sleep-data-actions'

import moment from 'moment'
import ReduxAction from '@typings/redux-actions'
import { sortDays } from '@helpers/sleep/sleep'
import { SleepClockState } from '@typings/SleepClockState'
import { Day } from '@typings/Sleepdata'
import { initialState } from '../InitialStates/SleepClock'

const reducer = (
  state = initialState,
  { type, payload }: ReduxAction
): SleepClockState => {
  switch (type) {
    case RESET_APP:
      return initialState

    case SET_TODAY:
      return { ...state, today: payload }

    case SET_SELECTED_DAY: {
      return { ...state, selectedDay: payload }
    }

    case SET_TODAY_AS_SELECTED: {
      return { ...state, selectedDay: payload }
    }

    case CREATE_NEW_CALENDAR:
      return { ...state, days: payload }

    case UPDATE_DAY: {
      const updatedDay = payload as Day
      const filtered = state.days.filter((day) => day.date !== updatedDay.date)
      return { ...state, days: [...filtered, updatedDay] }
    }

    case PUSH_NEW_DAYS_TO_CALENDAR: {
      const days = verifyDates([...state.days, ...payload])
      return { ...state, days: [...days] }
    }

    case UPDATE_SLEEP_DATA:
      return {
        ...state,
        sleepDataUpdated: moment().toISOString(),
        days: payload.days,
        nights: payload.nights
      }

    case SET_START_DATE:
      return { ...state, startDate: payload }

    case RATE_NIGHT: {
      const filteredDays = state.days.filter(
        (item: Day) => item.date !== state.selectedDay
      )
      const day = state.days.find(
        (item: Day) => item.date === state.selectedDay
      )
      const newDay = { ...(day as Day), rating: payload }
      const daysArray = [...filteredDays, newDay]
      const sorted = sortDays(daysArray)
      return { ...state, days: sorted }
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
