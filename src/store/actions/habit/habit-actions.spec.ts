import { enableMapSet } from 'immer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  Habit,
  HabitState,
  MutationType,
  UnsyncedHabit
} from '@typings/state/habit-state'
import { Period } from '@typings/state/Periods'
import { AuthState } from '@typings/state/AuthState'
import {
  addHabit,
  addUnsyncedHabit,
  archiveHabit,
  deleteHabitById,
  markTodayHabitAsCompleted,
  updateEditedHabit,
  updateHabitDayStreak,
  editHabit,
  removeHabit
} from './habit-actions'

enableMapSet()

jest.mock('aws-amplify', () => ({
  API: jest.fn()
}))

jest.mock('react-native', () => ({
  StyleSheet: {
    hairlineWidth: 10
  }
}))

const middlewares = [thunk]

const startOfTodayString = '2020-05-07T21:00:00.000Z'
const mockStore = configureStore<State>(middlewares)
const localHabit1: Habit = {
  id: 'local-habit-1',
  title: 'Local Habit 1',
  description: 'Local Habit 1',
  date: startOfTodayString,
  days: new Map(),
  period: Period.morning,
  userId: null
}

interface State {
  user: {
    username: string
    loggedIn: boolean
  }
  habitState: HabitState
  auth: AuthState
}

const state: State = {
  user: {
    username: 'User1',
    loggedIn: true
  },
  habitState: {
    habits: new Map(),
    subHabits: new Map(),
    unsyncedHabits: [],
    draftEditHabit: localHabit1,
    mergingDialogDisplayed: false
  },
  auth: {
    authenticated: true,
    loading: false
  }
}

const store = mockStore(state)

describe('Synchronous habit actions should work', () => {
  afterEach(() => {
    store.clearActions()
  })

  it('addHabit should work', async () => {
    const expectedHabit: Habit = {
      ...localHabit1,
      title: 'Expected Habit 1',
      description: 'Expected Habit Description 1',
      period: Period.morning
    }

    await store.dispatch(
      addHabit(
        expectedHabit.title,
        expectedHabit.description,
        expectedHabit.period,
        expectedHabit.id
      )
    )

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.CREATE
    }

    const expectedActions = [
      updateEditedHabit(expectedHabit),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('editHabit should work', async () => {
    const expectedHabit = {
      ...localHabit1,
      title: 'Modified Expected Habit 1',
      description: 'Modified Expected Habit Description',
      period: Period.afternoon
    }

    await store.dispatch(
      editHabit(
        expectedHabit.title,
        expectedHabit.description,
        expectedHabit.period,
        expectedHabit
      )
    )

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.UPDATE
    }

    const expectedActions = [
      updateEditedHabit(expectedHabit),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('updateHabitDayStreak should work', async () => {
    const expectedHabit = { ...localHabit1 }

    await store.dispatch(updateHabitDayStreak(expectedHabit, 1))

    expectedHabit.dayStreak = 1

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.UPDATE
    }

    const expectedActions = [
      updateEditedHabit(expectedHabit),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('markTodayHabitAsCompleted should work when habit is blank', async () => {
    await store.dispatch(markTodayHabitAsCompleted(localHabit1))

    const expectedHabit: Habit = {
      ...localHabit1,
      days: new Map().set(startOfTodayString, 1),
      latestCompletedDate: startOfTodayString,
      dayStreak: 1,
      longestDayStreak: 1
    }

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.UPDATE
    }

    const expectedActions = [
      updateEditedHabit(expectedHabit),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('markTodayHabitAsCompleted should work when habit has defined completion records', async () => {
    const testHabit: Habit = {
      ...localHabit1,
      days: new Map().set(startOfTodayString, 1),
      latestCompletedDate: startOfTodayString,
      dayStreak: 1,
      longestDayStreak: 1
    }

    await store.dispatch(markTodayHabitAsCompleted(testHabit))

    const expectedHabit: Habit = {
      ...localHabit1,
      days: new Map().set(startOfTodayString, 0),
      latestCompletedDate: startOfTodayString,
      dayStreak: 0,
      longestDayStreak: 1
    }

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.UPDATE
    }

    const expectedActions = [
      updateEditedHabit(expectedHabit),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('archiveHabit should work', async () => {
    const expectedHabit = { ...localHabit1 }

    await store.dispatch(archiveHabit(expectedHabit))

    expectedHabit.archived = true

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.UPDATE
    }

    const expectedActions = [
      updateEditedHabit(expectedHabit),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('deleteHabitById should work', async () => {
    const expectedHabit = { ...localHabit1 }

    await store.dispatch(deleteHabitById(expectedHabit))

    const expectedUnsyncedHabit: UnsyncedHabit = {
      actionDate: startOfTodayString,
      habit: expectedHabit,
      mutationType: MutationType.DELETE
    }

    const expectedActions = [
      removeHabit(expectedHabit.id),
      addUnsyncedHabit(expectedUnsyncedHabit)
    ]

    expect(store.getActions()).toEqual(expectedActions)
  })
})
