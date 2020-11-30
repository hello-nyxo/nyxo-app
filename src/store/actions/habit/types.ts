import { Habit } from '@typings/State/habit-state'

export const UPDATE_HABIT = 'UPDATE_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'
export const DRAFT_EDIT_HABIT = 'DRAFT_EDIT_HABIT'
export const PUSH_UNSYNCED_HABIT = 'PUSH_UNSYNCED_HABIT'
export const POP_UNSYNCED_HABIT = 'POP_UNSYNCED_HABIT'
export const TOGGLE_MERGING_DIALOG = 'TOGGLE_MERGING_DIALOG'
export const REPLACE_HABITS = 'REPLACE_HABITS'
export const REPLACE_SUB_HABITS = 'REPLACE_SUB_HABITS'
export const CLEAR_SUB_HABITS = 'CLEAR_SUB_HABITS'

type UpdateHabitAction = {
  type: typeof UPDATE_HABIT
  payload: Habit
}

type DeleteHabitAction = {
  type: typeof DELETE_HABIT
  payload: string
}

type DraftEditHabitAction = {
  type: typeof DRAFT_EDIT_HABIT
  payload: Habit
}

type PushUnsyncedHabitAction = {
  type: typeof PUSH_UNSYNCED_HABIT
  payload: string
}

type PopUnsyncedHabitAction = {
  type: typeof POP_UNSYNCED_HABIT
  payload: string
}

type ToggleMergingDialogAction = {
  type: typeof TOGGLE_MERGING_DIALOG
}

export type HabitActions =
  | UpdateHabitAction
  | DeleteHabitAction
  | DraftEditHabitAction
  | PushUnsyncedHabitAction
  | PopUnsyncedHabitAction
  | ToggleMergingDialogAction
