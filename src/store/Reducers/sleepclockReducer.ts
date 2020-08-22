import { CREATE_SUCCESS } from '@actions/sleep/sleep-to-cloud-actions'
import moment from 'moment'
import ReduxAction from 'Types/ReduxActions'
import { RESET_APP } from '../../actions/shared'
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
} from '../../actions/sleep/sleep-data-actions'
import { sortDays } from '../../helpers/sleep'
import { sameDay } from '../../helpers/time'
import { SleepClockState } from '../../Types/SleepClockState'
import { Day } from '../../Types/Sleepdata'
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
    case CREATE_SUCCESS: {
      const updated = state.days.map((day: Day) => {
        const withId = payload.days.find(({ date }: Day) => date === day.date)
        return { ...day, id: withId ? withId.id : undefined }
      })

      return { ...state, days: [...updated] }
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
        (item: Day) => item.date !== state.selectedDay.date
      )
      const newDay = { ...state.selectedDay, rating: payload }
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
