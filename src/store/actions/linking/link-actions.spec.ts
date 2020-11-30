import { State } from '@typings/State'
import { enableMapSet } from 'immer'
import { Action } from 'redux'
import configureStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { linkAccount, linkSuccess } from './linking-actions'

enableMapSet()

jest.mock('aws-amplify', () => ({
  API: jest.fn(),
  Auth: jest.fn()
}))

const middlewares = [thunk]

type S = {
  linking: State['linking']
}

type DispatchExts = ThunkDispatch<State, unknown, Action<string>>

const mockStore = configureStore<State, DispatchExts>(middlewares)

const state: S = {
  linking: {
    loading: false,
    linkCode: ''
  }
}

const store = mockStore(state)

describe('Linking actions:', () => {
  afterEach(() => {
    store.clearActions()
  })

  it('Active linking code should link and enable subscription ', async () => {
    await store.dispatch(linkAccount('123467890'))

    const expectedActions = [linkSuccess('123467890')]

    expect(store.getActions()).toEqual(expectedActions)
  })

  // it('editHabit should work', async () => {
  //   const expectedHabit = {
  //     ...localHabit1,
  //     title: 'Modified Expected Habit 1',
  //     description: 'Modified Expected Habit Description',
  //     period: Period.afternoon
  //   }

  //   await store.dispatch(
  //     editHabit(
  //       expectedHabit.title,
  //       expectedHabit.description,
  //       expectedHabit.period,
  //       expectedHabit
  //     )
  //   )

  //   const expectedUnsyncedHabit: UnsyncedHabit = {
  //     actionDate: startOfTodayString,
  //     habit: expectedHabit,
  //     mutationType: MutationType.UPDATE
  //   }

  //   const expectedActions = [
  //     updateEditedHabit(expectedHabit),
  //     addUnsyncedHabit(expectedUnsyncedHabit)
  //   ]

  //   expect(store.getActions()).toEqual(expectedActions)
  // })

  // it('updateHabitDayStreak should work', async () => {
  //   const expectedHabit = { ...localHabit1 }

  //   await store.dispatch(updateHabitDayStreak(expectedHabit, 1))

  //   expectedHabit.dayStreak = 1

  //   const expectedUnsyncedHabit: UnsyncedHabit = {
  //     actionDate: startOfTodayString,
  //     habit: expectedHabit,
  //     mutationType: MutationType.UPDATE
  //   }

  //   const expectedActions = [
  //     updateEditedHabit(expectedHabit),
  //     addUnsyncedHabit(expectedUnsyncedHabit)
  //   ]

  //   expect(store.getActions()).toEqual(expectedActions)
  // })

  // it('markTodayHabitAsCompleted should work when habit is blank', async () => {
  //   await store.dispatch(markTodayHabitAsCompleted(localHabit1))

  //   const expectedHabit: Habit = {
  //     ...localHabit1,
  //     days: new Map().set(startOfTodayString, 1),
  //     latestCompletedDate: startOfTodayString,
  //     dayStreak: 1,
  //     longestDayStreak: 1
  //   }

  //   const expectedUnsyncedHabit: UnsyncedHabit = {
  //     actionDate: startOfTodayString,
  //     habit: expectedHabit,
  //     mutationType: MutationType.UPDATE
  //   }

  //   const expectedActions = [
  //     updateEditedHabit(expectedHabit),
  //     addUnsyncedHabit(expectedUnsyncedHabit)
  //   ]

  //   expect(store.getActions()).toEqual(expectedActions)
  // })

  // it('markTodayHabitAsCompleted should work when habit has defined completion records', async () => {
  //   const habit: Habit = {
  //     ...localHabit1,
  //     days: new Map().set(startOfTodayString, 1),
  //     latestCompletedDate: startOfTodayString,
  //     dayStreak: 1,
  //     longestDayStreak: 1
  //   }

  //   await store.dispatch(markTodayHabitAsCompleted(habit))

  //   const expectedHabit: Habit = {
  //     ...localHabit1,
  //     days: new Map().set(startOfTodayString, 0),
  //     latestCompletedDate: startOfTodayString,
  //     dayStreak: 0,
  //     longestDayStreak: 1
  //   }

  //   const expectedUnsyncedHabit: UnsyncedHabit = {
  //     actionDate: startOfTodayString,
  //     habit: expectedHabit,
  //     mutationType: MutationType.UPDATE
  //   }

  //   const expectedActions = [
  //     updateEditedHabit(expectedHabit),
  //     addUnsyncedHabit(expectedUnsyncedHabit)
  //   ]

  //   expect(store.getActions()).toEqual(expectedActions)
  // })

  // it('archiveHabit should work', async () => {
  //   const expectedHabit = { ...localHabit1 }

  //   await store.dispatch(archiveHabit(expectedHabit))

  //   expectedHabit.archived = true

  //   const expectedUnsyncedHabit: UnsyncedHabit = {
  //     actionDate: startOfTodayString,
  //     habit: expectedHabit,
  //     mutationType: MutationType.UPDATE
  //   }

  //   const expectedActions = [
  //     updateEditedHabit(expectedHabit),
  //     addUnsyncedHabit(expectedUnsyncedHabit)
  //   ]

  //   expect(store.getActions()).toEqual(expectedActions)
  // })

  // it('deleteHabitById should work', async () => {
  //   const expectedHabit = { ...localHabit1 }

  //   await store.dispatch(deleteHabitById(expectedHabit))

  //   const expectedUnsyncedHabit: UnsyncedHabit = {
  //     actionDate: startOfTodayString,
  //     habit: expectedHabit,
  //     mutationType: MutationType.DELETE
  //   }

  //   const expectedActions = [
  //     removeHabit(expectedHabit.id),
  //     addUnsyncedHabit(expectedUnsyncedHabit)
  //   ]

  //   expect(store.getActions()).toEqual(expectedActions)
  // })
})
