import { createSelector } from '@reduxjs/toolkit'
import { State } from '@typings/State'
import { Habit, HabitState } from '@typings/state/habit-state'
import { Period } from '@typings/state/Periods'

const getHabitState = (state: State) => state.habitState

export const getMergingDialogDisplayed = createSelector(
  getHabitState,
  (habitState: HabitState) => habitState?.mergingDialogDisplayed
)

export const getDraftEditHabit = createSelector(
  getHabitState,
  (habitState: HabitState) => habitState?.draftEditHabit
)

export const getHabits = createSelector(
  getHabitState,
  (habitState: HabitState) => {
    return [...habitState?.habits.values()]
  }
)

export const getHabitsMap = createSelector(
  getHabitState,
  (habitState: HabitState) => {
    return habitState?.habits
  }
)

export const getActiveHabits = createSelector(
  getHabits,
  (habits: Array<Habit>) =>
    habits.filter((habitValue: Habit) => !habitValue.archived)
)

export const getUnsyncedHabits = createSelector(
  getHabitState,
  (state) => state.unsyncedHabits
)

export const getArchivedHabits = createSelector(
  getHabits,
  (habits: Array<Habit>) =>
    habits.filter((habitValue: Habit) => habitValue.archived)
)

export const getMorningHabits = createSelector(
  getActiveHabits,
  (habitValues: Array<Habit>) =>
    habitValues.filter(
      (habitValue: Habit) => habitValue.period.toLowerCase() === Period.morning
    )
)

export const getAfternoonHabits = createSelector(
  getActiveHabits,
  (habitValues: Array<Habit>) =>
    habitValues.filter(
      (habitValue: Habit) =>
        habitValue.period.toLowerCase() === Period.afternoon
    )
)

export const getEveningHabits = createSelector(
  getActiveHabits,
  (habitValues: Array<Habit>) =>
    habitValues.filter(
      (habitValue: Habit) => habitValue.period.toLowerCase() === Period.evening
    )
)

export const getHabitSections = createSelector(
  getMorningHabits,
  getAfternoonHabits,
  getEveningHabits,
  (morningHabits, afternoonHabits, eveningHabits) => [
    { title: 'Morning', data: morningHabits },
    { title: 'Afternoon', data: afternoonHabits },
    { title: 'Evening', data: eveningHabits }
  ]
)
