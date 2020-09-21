import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { ModalState } from 'Types/ModalState'

const getModalState = (state: State) => state.modals

export const getRatingModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.ratingModal
)

export const getSubscriptionModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.buySubscriptionModal
)

export const getNewHabitModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.newHabitModal
)

export const getEditHabitModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.editHabitModal
)

export const getExplanationsModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.explanationsModal
)

export const getAddNoteModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.addNoteModal
)

export const getDateTimeNoteModal = createSelector(
  getModalState,
  (modalState: ModalState) => modalState.dateTimeNoteModal
)
