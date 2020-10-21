import ReduxAction from '@typings/redux-actions'

export const TOGGLE_NEW_HABIT_MODAL = 'TOGGLE_NEW_HABIT_MODAL'
export const TOGGLE_EDIT_HABIT_MODAL = 'TOGGLE_EDIT_HABIT_MODAL'
export const TOGGLE_RATING_MODAL = 'TOGGLE_RATING_MODAL'
export const TOGGLE_EXPLANATIONS_MODAL = 'TOGGLE_EXPLANATIONS_MODAL'
export const TOGGLE_CALENDAR_MODAL = 'TOGGLE_CALENDAR_MODAL'

export const toggleNewHabitModal = (value?: boolean): ReduxAction => {
  return { type: TOGGLE_NEW_HABIT_MODAL, payload: value }
}

export const toggleEditHabitModal = (value?: boolean): ReduxAction => {
  return { type: TOGGLE_EDIT_HABIT_MODAL, payload: value }
}

export const toggleRatingModal = (): ReduxAction => {
  return { type: TOGGLE_RATING_MODAL }
}

export const toggleExplanationsModal = (value?: boolean): ReduxAction => ({
  type: TOGGLE_EXPLANATIONS_MODAL,
  payload: value
})

export const toggleCalendarModal = (): ReduxAction => ({
  type: TOGGLE_CALENDAR_MODAL
})
