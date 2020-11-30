import {
  HabitActions,
  CLEAR_SUB_HABITS,
  DELETE_HABIT,
  DRAFT_EDIT_HABIT,
  POP_UNSYNCED_HABIT,
  PUSH_UNSYNCED_HABIT,
  REPLACE_HABITS,
  REPLACE_SUB_HABITS,
  TOGGLE_MERGING_DIALOG,
  UPDATE_HABIT
} from '@actions/habit/types'
import { HabitState, UnsyncedHabit } from '@typings/state/habit-state'
import { enableMapSet, produce } from 'immer'

enableMapSet()

export const initialState: HabitState = {
  habits: new Map(),
  subHabits: new Map(),
  unsyncedHabits: [],
  mergingDialogDisplayed: false,
  loading: false
}

const reducer = produce((draft: HabitState, action: HabitActions) => {
  switch (action.type) {
    case REPLACE_HABITS: {
      draft.habits = action.payload
      break
    }

    case REPLACE_SUB_HABITS: {
      draft.subHabits = action.payload
      break
    }

    case UPDATE_HABIT:
      draft.habits.set(action.payload.id, action.payload)
      break

    case DELETE_HABIT:
      draft.habits.delete(action.payload)
      break

    case DRAFT_EDIT_HABIT:
      draft.draftEditHabit = action.payload
      break

    case PUSH_UNSYNCED_HABIT: {
      draft.unsyncedHabits = draft.unsyncedHabits.filter(
        (unsyncedHabit: UnsyncedHabit) =>
          unsyncedHabit.habit.id !== action.payload.habit.id
      )
      draft.unsyncedHabits.push(action.payload)
      break
    }

    case POP_UNSYNCED_HABIT:
      draft.unsyncedHabits = draft.unsyncedHabits.filter(
        (unsyncedHabit: UnsyncedHabit) =>
          unsyncedHabit.habit.id !== action.payload
      )
      break

    case TOGGLE_MERGING_DIALOG:
      const mergingDialogEnabled =
        action.payload || !draft.mergingDialogDisplayed

      draft.mergingDialogDisplayed = mergingDialogEnabled
      break

    case CLEAR_SUB_HABITS:
      draft.subHabits = new Map()
      break
  }
}, initialState)

export default reducer
