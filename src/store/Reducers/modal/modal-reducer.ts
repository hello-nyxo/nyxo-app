import { RATE_NIGHT } from '@actions/sleep/sleep-data-actions'
import { ModalState } from '@typings/ModalState'
import ReduxAction from '@typings/ReduxActions'

import {
  TOGGLE_EDIT_HABIT_MODAL,
  TOGGLE_NEW_HABIT_MODAL,
  TOGGLE_RATING_MODAL,
  TOGGLE_EXPLANATIONS_MODAL,
  TOGGLE_CALENDAR_MODAL
} from '@actions/modal/modal-actions'

export const initialState: ModalState = {
  newHabitModal: false,
  editHabitModal: false,
  ratingModal: false,
  buySubscriptionModal: false,
  explanationsModal: false,
  calendarModal: false
}

const ModalReducer = (
  state = initialState,
  action: ReduxAction
): ModalState => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_RATING_MODAL:
      return { ...state, ratingModal: !state.ratingModal }

    case RATE_NIGHT:
      return { ...state, ratingModal: !state.ratingModal }

    case TOGGLE_EXPLANATIONS_MODAL: {
      const showHide = payload || !state.explanationsModal
      return { ...state, explanationsModal: showHide }
    }
    case TOGGLE_EDIT_HABIT_MODAL:
      return { ...state, editHabitModal: !state.editHabitModal }

    case TOGGLE_NEW_HABIT_MODAL:
      return { ...state, newHabitModal: !state.newHabitModal }

    case TOGGLE_CALENDAR_MODAL:
      return { ...state, calendarModal: !state.calendarModal }

    default:
      return state
  }
}

export default ModalReducer
