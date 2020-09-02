import moment, { Moment } from 'moment'
import { Day } from 'Types/Sleepdata'

/* ACTION TYPES */

export const CREATE_DAYS_START = 'CREATE_DAYS_START'
export const CREATE_DAYS_SUCCESS = 'CREATE_DAYS_SUCCESS'
export const CREATE_DAYS_FAILURE = 'CREATE_DAYS_FAILURE'

/* ACTIONS */

export const createDaysStart = () => ({
  type: CREATE_DAYS_START
})

export const createDaysSuccess = (days: Day[]) => ({
  type: CREATE_DAYS_SUCCESS
})

/* ASYNC ACTIONS */

export const createCalendar = () => async (dispatch: Function) => {
  dispatch(createDaysStart)

  const calendarDays = 7
  const startDate = moment().startOf('day').subtract(calendarDays, 'days')
  const calendar: Day[] = []

  for (let i = 0; i < calendarDays; i++) {
    const date = startDate.add(1, 'day')
    calendar.push({ date: date.toISOString(), night: [] })
  }

  dispatch(createDaysSuccess(calendar))
}

const createNewDaysForCalendar = (lastDate: Moment, today: Moment) => async (
  dispatch: Function
) => {
  dispatch(createDaysStart)

  const dayArray: Day[] = []

  while (today.isAfter(lastDate)) {
    lastDate.add(1, 'day')
    dayArray.push({ date: lastDate.toISOString(), night: [] })
  }

  await dispatch(createDaysSuccess(dayArray))
}
