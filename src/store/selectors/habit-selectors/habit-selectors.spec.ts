import produce from 'immer'
import {
  Habit,
  HabitState,
  MutationType,
  UnsyncedHabit
} from '@typings/state/habit-state'
import { Period } from '@typings/state/Periods'
import {
  getActiveHabits,
  getAfternoonHabits,
  getArchivedHabits,
  getDraftEditHabit,
  getEveningHabits,
  getHabits,
  getHabitSections,
  getMergingDialogDisplayed,
  getMorningHabits
} from './habit-selectors'

const morningHabitMock: Habit = {
  id: 'local-1',
  date: new Date().toISOString(),
  days: new Map(),
  description: 'this is a description',
  period: Period.morning,
  title: 'Local 1',
  userId: 'userId',
  archived: false,
  dayStreak: 0,
  latestCompletedDate: '',
  longestDayStreak: 0
}

const afternoonHabitMock: Habit = {
  id: 'local-2',
  date: new Date().toISOString(),
  days: new Map(),
  description: 'this is a description',
  period: Period.afternoon,
  title: 'Local 2',
  userId: 'userId',
  archived: false,
  dayStreak: 0,
  latestCompletedDate: '',
  longestDayStreak: 0
}

const eveningHabitMock: Habit = {
  id: 'local-3',
  date: new Date().toISOString(),
  days: new Map(),
  description: 'this is a description',
  period: Period.evening,
  title: 'Local 3',
  userId: 'userId',
  archived: false,
  dayStreak: 0,
  latestCompletedDate: '',
  longestDayStreak: 0
}

/* eslint-disable no-param-reassign */
const subHabitMock: Habit = produce(morningHabitMock, (draft) => {
  draft.id = 'sub-local-1'
  draft.title = 'Sub local 1'
  draft.description = 'This sub local is real'
  draft.userId = null
})

const habitsMock: Map<string, Habit> = new Map()
habitsMock.set(morningHabitMock.id, morningHabitMock)
habitsMock.set(afternoonHabitMock.id, afternoonHabitMock)
habitsMock.set(eveningHabitMock.id, eveningHabitMock)

const subHabitsMock = new Map()
subHabitsMock.set(subHabitMock.id, subHabitMock)

const unsyncedHabitsMock: UnsyncedHabit[] = [
  {
    actionDate: new Date().toISOString(),
    habit: morningHabitMock,
    mutationType: MutationType.CREATE
  }
]

const habitState: HabitState = {
  habits: habitsMock,
  subHabits: subHabitsMock,
  unsyncedHabits: unsyncedHabitsMock,
  draftEditHabit: morningHabitMock,
  mergingDialogDisplayed: false
}

describe('Unit tests for Habit selectors', () => {
  it('getMergingDialogDisplayed unit test', () => {
    expect(getMergingDialogDisplayed.resultFunc(habitState)).toEqual(false)
  })

  it('getDraftEditHabit unit test', () => {
    expect(getDraftEditHabit.resultFunc(habitState)).toEqual(morningHabitMock)
  })

  it('getHabits unit test', () => {
    const expectedResult = [...habitsMock.values()]
    expect(getHabits.resultFunc(habitState)).toEqual(expectedResult)
  })

  it('getActiveHabits unit test', () => {
    const expectedResult = [...habitsMock.values()].filter(
      (habit) => !habit.archived
    )
    expect(getActiveHabits.resultFunc([...habitsMock.values()])).toEqual(
      expectedResult
    )
  })

  it('getArchivedHabits unit test', () => {
    const expectedResult = [...habitsMock.values()].filter(
      (habit) => habit.archived
    )
    expect(getArchivedHabits.resultFunc([...habitsMock.values()])).toEqual(
      expectedResult
    )
  })

  const expectedMorningResult = [...habitsMock.values()]
    .filter((habit) => !habit.archived)
    .filter((value) => value.period.toLowerCase() === Period.morning)

  it('getMorningHabits unit test', () => {
    expect(getMorningHabits.resultFunc([...habitsMock.values()])).toEqual(
      expectedMorningResult
    )
  })

  const expectedAfternoonResult = [...habitsMock.values()]
    .filter((habit) => !habit.archived)
    .filter((value) => value.period.toLowerCase() === Period.afternoon)

  it('getAfternoonHabits unit test', () => {
    expect(getAfternoonHabits.resultFunc([...habitsMock.values()])).toEqual(
      expectedAfternoonResult
    )
  })

  const expectedEveningResult = [...habitsMock.values()]
    .filter((habit) => !habit.archived)
    .filter((value) => value.period.toLowerCase() === Period.evening)

  it('getEveningHabits unit test', () => {
    expect(getEveningHabits.resultFunc([...habitsMock.values()])).toEqual(
      expectedEveningResult
    )
  })

  it('getHabitSections unit test', () => {
    const expectedResult = [
      {
        title: 'Morning',
        data: expectedMorningResult
      },
      {
        title: 'Afternoon',
        data: expectedAfternoonResult
      },
      {
        title: 'Evening',
        data: expectedEveningResult
      }
    ]
    expect(
      getHabitSections.resultFunc(
        expectedMorningResult,
        expectedAfternoonResult,
        expectedEveningResult
      )
    ).toEqual(expectedResult)
  })
})
