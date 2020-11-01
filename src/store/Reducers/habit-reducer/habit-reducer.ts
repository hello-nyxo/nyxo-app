import {
  CLEAR_SUB_HABITS,
  DELETE_HABIT,
  DRAFT_EDIT_HABIT,
  POP_UNSYNCED_HABIT,
  PUSH_UNSYNCED_HABIT,
  REPLACE_HABITS,
  REPLACE_SUB_HABITS,
  TOGGLE_MERGING_DIALOG,
  UPDATE_HABIT
} from '@actions/habit/habit-actions'
import { enableMapSet, produce } from 'immer'
import ReduxAction from '@typings/redux-actions'
import { HabitState, UnsyncedHabit } from '@typings/state/habit-state'

enableMapSet()

export const initialState: HabitState = {
  habits: new Map(),
  subHabits: new Map(),
  unsyncedHabits: [],
  mergingDialogDisplayed: false,
  loading: false
}

const reducer = produce((draft: HabitState, action: ReduxAction) => {
  const { payload, type } = action

  switch (type) {
    case REPLACE_HABITS: {
      draft.habits = payload
      break
    }

    case REPLACE_SUB_HABITS: {
      draft.subHabits = payload
      break
    }

    case UPDATE_HABIT:
      draft.habits.set(payload.id, payload)
      break

    case DELETE_HABIT:
      draft.habits.delete(payload)
      break

    case DRAFT_EDIT_HABIT:
      draft.draftEditHabit = payload
      break

    case PUSH_UNSYNCED_HABIT: {
      draft.unsyncedHabits = draft.unsyncedHabits.filter(
        (unsyncedHabit: UnsyncedHabit) =>
          unsyncedHabit.habit.id !== payload.habit.id
      )
      draft.unsyncedHabits.push(payload)
      break
    }

    case POP_UNSYNCED_HABIT:
      draft.unsyncedHabits = draft.unsyncedHabits.filter(
        (unsyncedHabit: UnsyncedHabit) => unsyncedHabit.habit.id !== payload
      )
      break

    case TOGGLE_MERGING_DIALOG:
      const mergingDialogEnabled = payload || !draft.mergingDialogDisplayed

      draft.mergingDialogDisplayed = mergingDialogEnabled
      break

    case CLEAR_SUB_HABITS:
      draft.subHabits = new Map()
      break
  }
}, initialState)

export default reducer
