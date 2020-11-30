export const SET_SELECTED_DATE = 'CREATE_DAYS_START'

type SetSelectedDateAction = {
  type: typeof SET_SELECTED_DATE
  payload: string
}

export type CalendarActions = SetSelectedDateAction
