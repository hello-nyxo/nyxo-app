import { getFitbitSleep } from '@actions/api-actions/fitbit-actions'
import { getGarminSleep } from '@actions/api-actions/garmin-actions'
import { readGoogleFitSleep } from '@actions/api-actions/google-fit-actions'
import { getOuraSleep } from '@actions/api-actions/oura-actions'
import { getPolarSleep } from '@actions/api-actions/polar-actions'
import { getWithingsSleep } from '@actions/api-actions/withings-actions'
import { fetchSleepFromHealthKit } from '@actions/sleep/health-kit-actions'
import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { sameDay } from '@helpers/time'
import moment from 'moment'
import { GetState } from '@typings/GetState'
import ReduxAction, { Dispatch, Thunk } from '@typings/ReduxActions'
import { Day, Night } from '@typings/Sleepdata'
import { SOURCE } from '@typings/state/sleep-source-state'

/* ACTION TYPES */

export const CREATE_CALENDAR_START = 'CREATE_CALENDAR_START'

export const CREATE_NEW_CALENDAR = 'CREATE_NEW_CALENDAR'
export const PUSH_NEW_DAYS_TO_CALENDAR = 'PUSH_NEW_DAYS_TO_CALENDAR'
export const RATE_NIGHT = 'RATE_NIGHT'
export const UPDATE_DAY = 'UPDATE_DAY'
export const UPDATE_SLEEP_DATA = 'UPDATE_SLEEP_DATA'
export const SET_START_DATE = 'SET_START_DAY'
export const SET_TODAY = 'SET_TODAY'
export const SET_TODAY_AS_SELECTED = 'SET_TODAY_AS_SELECTED'
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY'
export const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX'

/* ACTIONS */

export const createNewCalendar = (days: Day[]): ReduxAction => ({
  type: CREATE_NEW_CALENDAR,
  payload: days
})

export const pushNewDaysToCalendar = (days: Day[]) => ({
  type: PUSH_NEW_DAYS_TO_CALENDAR,
  payload: days
})

export const rateDay = (rating: number) => ({
  type: RATE_NIGHT,
  payload: rating
})

export const updateDay = (day: Day) => ({
  type: UPDATE_DAY,
  payload: day
})

export const updateSleepData = (data: {
  days: Day[]
  nights: Night[]
}): ReduxAction => ({
  type: UPDATE_SLEEP_DATA,
  payload: data
})

export const setSelectedDay = (day: string): ReduxAction => ({
  type: SET_SELECTED_DAY,
  payload: day
})

export const setToday = (today: string) => ({
  type: SET_TODAY,
  payload: today
})

export const setTodayAsSelected = (today: string) => ({
  type: SET_TODAY_AS_SELECTED,
  payload: today
})

export const setStartDate = (date: string) => ({
  type: SET_START_DATE,
  payload: date
})

export const setActiveIndex = (index: number) => ({
  type: SET_ACTIVE_INDEX,
  payload: index
})

/* ASYNC ACTIONS */

export const fetchSleepData = (
  startDate: string,
  endDate: string
): Thunk => async (dispatch: Dispatch, getState: GetState) => {
  const source = getMainSource(getState())

  switch (source) {
    case SOURCE.HEALTH_KIT:
      dispatch(fetchSleepFromHealthKit(startDate, endDate))
      break
    case SOURCE.GOOGLE_FIT:
      dispatch(readGoogleFitSleep())
      break
    case SOURCE.FITBIT:
      dispatch(getFitbitSleep())
      break
    case SOURCE.OURA:
      dispatch(getOuraSleep(startDate, endDate))
      break
    case SOURCE.WITHINGS:
      dispatch(getWithingsSleep())
      break
    case SOURCE.GARMIN:
      dispatch(getGarminSleep())
      break
    case SOURCE.POLAR:
      dispatch(getPolarSleep())
      break

    default:
      break
  }
}

const createCalendarFromScratch = () => async (dispatch: Dispatch) => {
  const calendarDays = 7
  const startDate = moment().startOf('day').subtract(calendarDays, 'days')

  const calendar: Day[] = []

  for (let i = 0; i < calendarDays; i++) {
    const date = startDate.add(1, 'day')
    calendar.push({ date: date.toISOString(), night: [] })
  }

  await dispatch(createNewCalendar(calendar))
}

const createNewDaysForCalendar = (
  lastDate: momentLike,
  today: momentLike
) => async (dispatch: Function) => {
  const dayArray: Day[] = []

  while (today.isAfter(lastDate)) {
    lastDate.add(1, 'day')
    dayArray.push({ date: lastDate.toISOString(), night: [] })
  }

  await dispatch(pushNewDaysToCalendar(dayArray))
}

/*
Making a change on 26.1.2020
Calendar should always have at least seven days in it
*/

export const updateCalendar = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const today = moment()
  const todayISO = moment().toISOString()
  const {
    sleepclock: { days, current_day }
  } = getState()

  const currentDayDate: string | undefined = current_day?.date
  const calendarIsEmpty = days === undefined || days?.length === 0

  if (calendarIsEmpty) {
    await dispatch(createCalendarFromScratch())
  } else {
    const lastDate = days.sort((aDay, bDay) =>
      moment(aDay.date).diff(moment(bDay.date))
    )[0]

    const lastDateToMoment = moment(lastDate?.date)

    const todayIsAfterLastUpdatedDate = today
      .startOf('day')
      .isAfter(lastDateToMoment.startOf('day'))

    const lessThanSevenDays = days.length < 7

    if (lessThanSevenDays) {
      await dispatch(
        createNewDaysForCalendar(moment(today).subtract(7, 'days'), today)
      )
    }

    if (todayIsAfterLastUpdatedDate) {
      await dispatch(createNewDaysForCalendar(lastDateToMoment, today))
    }
  }

  if (!sameDay(currentDayDate, todayISO)) {
    await dispatch(setTodayAsSelected(todayISO))
  }
}
