import { CreateHabitInput, ListHabitsQuery, ModelHabitFilterInput } from '@API'
import { listHabits } from '@graphql/custom/queries'
import { createHabit, deleteHabit, updateHabit } from '@graphql/mutations'
import {
  convertDaysToFitGraphQL,
  convertLineBreaks,
  convertPeriodType,
  convertRemoteHabitsToLocalHabits,
  shouldResetDayStreak
} from '@helpers/habits'
import {
  getHabits,
  getHabitsMap,
  getUnsyncedHabits
} from '@selectors/habit-selectors/habit-selectors'
import * as Sentry from '@sentry/react-native'
import { AppThunk } from '@typings/redux-actions'
import { Habit, MutationType, UnsyncedHabit } from '@typings/state/habit-state'
import { Period } from '@typings/state/Periods'
import { API, graphqlOperation } from 'aws-amplify'
import { startOfDay } from 'date-fns'
import produce from 'immer'
import 'react-native-get-random-values'
import { v4 } from 'uuid'
import {
  CLEAR_SUB_HABITS,
  DELETE_HABIT,
  DRAFT_EDIT_HABIT,
  POP_UNSYNCED_HABIT,
  PUSH_UNSYNCED_HABIT,
  REPLACE_HABITS,
  REPLACE_SUB_HABITS,
  TOGGLE_MERGING_DIALOG,
  UPDATE_HABIT,
  HabitActions
} from './types'

export const updateEditedHabit = (habit: Habit): HabitActions => ({
  type: UPDATE_HABIT,
  payload: habit
})

export const removeHabit = (id: string): HabitActions => ({
  type: DELETE_HABIT,
  payload: id
})

export const draftEditHabit = (habit: Habit): HabitActions => ({
  type: DRAFT_EDIT_HABIT,
  payload: habit
})

export const addUnsyncedHabit = (
  unsyncedHabit: UnsyncedHabit
): HabitActions => ({
  type: PUSH_UNSYNCED_HABIT,
  payload: unsyncedHabit
})

export const removeSyncedHabit = (habitId: string): HabitActions => ({
  type: POP_UNSYNCED_HABIT,
  payload: habitId
})

export const toggleMergingDialog = (toggle?: boolean): HabitActions => ({
  type: TOGGLE_MERGING_DIALOG,
  payload: toggle
})

export const replaceHabits = (habits: Map<string, Habit>): HabitActions => ({
  type: REPLACE_HABITS,
  payload: habits
})
export const clearSubHabits = (): HabitActions => ({
  type: CLEAR_SUB_HABITS
})
export const replaceSubHabits = (habits: Map<string, Habit>): HabitActions => ({
  type: REPLACE_SUB_HABITS,
  payload: habits
})

/* ASYNC ACTIONS */

export const addHabit = (
  title: string,
  description = '',
  period: Period,
  id?: string
): AppThunk => async (dispatch) => {
  const days = new Map()

  const habit: Habit = {
    id: id || v4(),
    userId: null,
    title: title.trim(),
    description: convertLineBreaks(description.trim()),
    days,
    date: startOfDay(new Date()).toISOString(),
    period
  }

  await dispatch(updateEditedHabit(habit))
  await dispatch(stashHabitToSync(habit, MutationType.CREATE))
}

export const editHabit = (
  title: string,
  description: string,
  period: Period,
  modifiedHabit: Habit
): AppThunk => async (dispatch) => {
  const updatedHabit: Habit = {
    ...modifiedHabit,
    title: title.trim(),
    description: convertLineBreaks(description.trim()),
    period
  }
  await dispatch(updateEditedHabit(updatedHabit))
  await dispatch(stashHabitToSync(updatedHabit, MutationType.UPDATE))
}

export const updateHabitDayStreak = (
  habit: Habit,
  dayStreak: number
): AppThunk => async (dispatch) => {
  const updatedHabit: Habit = { ...habit, dayStreak }
  await dispatch(updateEditedHabit(updatedHabit))
  await dispatch(stashHabitToSync(updatedHabit, MutationType.UPDATE))
}

export const markTodayHabitAsCompleted = (habit: Habit): AppThunk => async (
  dispatch
) => {
  const today = startOfDay(new Date()).toISOString()
  const { days, longestDayStreak = 0 } = habit
  let { dayStreak = 0 } = habit
  let dayValue = 0

  if (days.has(today)) {
    const completedToday = days.get(today) === 1

    if (!completedToday) {
      dayStreak += 1
      dayValue = 1
    } else {
      dayStreak -= 1
      dayValue = 0
    }
  } else {
    dayStreak += 1
    dayValue = 1
  }

  const updatedDays = produce(days, (draft) => {
    draft.set(today, dayValue)
  })

  const updatedHabit: Habit = {
    ...habit,
    days: updatedDays,
    latestCompletedDate: today,
    dayStreak,
    longestDayStreak:
      longestDayStreak > dayStreak ? longestDayStreak : dayStreak
  }
  await dispatch(updateEditedHabit(updatedHabit))
  await dispatch(stashHabitToSync(updatedHabit, MutationType.UPDATE))
}

export const archiveHabit = (habit: Habit): AppThunk => async (dispatch) => {
  const updatedHabit: Habit = {
    ...habit,
    archived: habit.archived ? !habit.archived : true
  }
  await dispatch(updateEditedHabit(updatedHabit))
  await dispatch(stashHabitToSync(updatedHabit, MutationType.UPDATE))
}

export const deleteHabitById = (habit: Habit): AppThunk => async (dispatch) => {
  await dispatch(removeHabit(habit.id))
  await dispatch(stashHabitToSync(habit, MutationType.DELETE))
}

const stashHabitToSync = (
  habit: Habit,
  mutationType: MutationType
): AppThunk => async (dispatch, getState) => {
  const {
    auth: { authenticated: loggedIn }
  } = getState()
  const unsyncedHabits = getUnsyncedHabits(getState())

  if (loggedIn) {
    const inQueue = unsyncedHabits.find(
      (unsynced) => unsynced.habit.id === habit.id
    )

    const actionDate = new Date().toISOString()

    if (!inQueue) {
      await dispatch(
        addUnsyncedHabit({
          actionDate,
          habit,
          mutationType
        })
      )
    } else if (mutationType === MutationType.DELETE) {
      await dispatch(
        addUnsyncedHabit({
          actionDate,
          habit,
          mutationType
        })
      )
    } else {
      await dispatch(
        addUnsyncedHabit({
          actionDate,
          habit,
          mutationType: inQueue.mutationType
        })
      )
    }
  }
}

const syncHabit = (
  mutationType: MutationType,
  habit: Habit
): AppThunk => async (dispatch, getState) => {
  const { username } = getState()
  const loggedIn = getAuthState(getState())

  if (loggedIn) {
    const updatedHabit: CreateHabitInput = {
      id: habit.id,
      date: habit.date,
      title: habit.title,
      description: habit?.description ? habit.description : '',
      archived: habit.archived,
      dayStreak: habit.dayStreak,
      longestDayStreak: habit.longestDayStreak,
      days: convertDaysToFitGraphQL(habit.days),
      latestCompletedDate: habit.latestCompletedDate,
      period: convertPeriodType(habit.period),
      userId: username as string
    }

    try {
      switch (mutationType) {
        case MutationType.DELETE:
          await API.graphql(
            graphqlOperation(deleteHabit, { input: { id: updatedHabit.id } })
          )
          break

        case MutationType.UPDATE:
          await API.graphql(
            graphqlOperation(updateHabit, { input: updatedHabit })
          )
          break
        case MutationType.CREATE:
          await API.graphql(
            graphqlOperation(createHabit, { input: updatedHabit })
          )
          break
        default:
          break
      }

      // Remove successfully synced habit
      await dispatch(removeSyncedHabit(habit.id))
    } catch (error) {
      Sentry.captureException(error)
    }
  }
}

export const handleUnsyncedHabits = (): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    habitState: { unsyncedHabits }
  } = getState()

  try {
    const promiseArray: Promise<void>[] = []
    unsyncedHabits.forEach((unsyncedHabit: UnsyncedHabit) => {
      const { mutationType } = unsyncedHabit
      promiseArray.push(dispatch(syncHabit(mutationType, unsyncedHabit.habit)))
    })
    await Promise.all(promiseArray)
  } catch (error) {
    Sentry.captureException(error)
  }
}

// When user signs in, handle the intention of merging or not merging habits
export const handleHabitsFromCloudWhenLoggingIn = (
  userId: string,
  merge: boolean
): AppThunk => async (dispatch, getState) => {
  const variables: {
    filter: ModelHabitFilterInput
    limit?: number
    nextToken?: string
  } = {
    filter: {
      userId: {
        eq: userId
      }
    }
  }

  try {
    const response = (await API.graphql(
      graphqlOperation(listHabits, variables)
    )) as {
      data: ListHabitsQuery
    }
    const cloudHabits = response.data.listHabits?.items
    const resultHabits = convertRemoteHabitsToLocalHabits(cloudHabits)
    const habits = getHabitsMap(getState())

    const promiseArray = []

    // If user does want to merge, we replace habitState.habits with concatenated on-cloud habits and current habitState.habits.
    if (merge) {
      habits.forEach((localHabit: Habit) => {
        // go through responsed items and merging local habits to see if there is any habits in commons
        const commonIndex = cloudHabits?.findIndex(
          (item) => item?.title?.trim() === localHabit.title.trim()
        )

        const syncingHabit: Habit = {
          ...localHabit,
          id: '',
          userId
        }

        // if the local habit is not stored in the cloud yet, we sync and merge it
        if (commonIndex === -1) {
          syncingHabit.id = v4() // Create new id for adding to cloud

          // Perform sync here
          promiseArray.push(
            dispatch(syncHabit(MutationType.CREATE, syncingHabit))
          )
        }
        // If the local habit is stored in the cloud, we update the cloud with the latest version of it (on-device/local)
        else {
          syncingHabit.id = cloudHabits[commonIndex].id // Keep the existing id

          // Perform sync here
          promiseArray.push(
            dispatch(syncHabit(MutationType.UPDATE, syncingHabit))
          )
        }

        // Perform merge here
        resultHabits.set(syncingHabit.id, syncingHabit)
      })
    }

    // Replace habitState.subHabits with old habitState.habits
    promiseArray.push(dispatch(replaceSubHabits(habits)))
    // Replace current habitState.habits with the result map
    promiseArray.push(dispatch(replaceHabits(resultHabits)))
    await Promise.all(promiseArray)
  } catch (error) {
    Sentry.captureException(error)

    await dispatch(toggleMergingDialog(false))
  }
}

// When user logs out, invoke this
export const handleHabitsWhenloggingOut = (): AppThunk => async (
  dispatch,
  getState
) => {
  await dispatch(handleUnsyncedHabits())

  const {
    habitState: { subHabits }
  } = getState()

  // Replace current habitState.habits with habitState.subHabits
  await dispatch(replaceHabits(subHabits))
}

export const handleUnsyncedHabitsThenRetrieveHabitsFromCloud = (): AppThunk => async (
  dispatch,
  getState
) => {
  const loggedIn = getAuthState(getState())

  if (loggedIn) {
    await dispatch(handleUnsyncedHabits())
    await dispatch(getHabitsFromCloud())
  }
}

// Can be used to get saved-on-cloud habits
export const getHabitsFromCloud = (): AppThunk => async (
  dispatch,
  getState
) => {
  const username = getUsername(getState())

  const variables: {
    filter: ModelHabitFilterInput
  } = {
    filter: {
      userId: {
        eq: username
      }
    }
  }

  try {
    const response = (await API.graphql(
      graphqlOperation(listHabits, { variables })
    )) as {
      data: ListHabitsQuery
    }

    const items = response.data.listHabits?.items

    const resultHabits = convertRemoteHabitsToLocalHabits(items)
    await dispatch(replaceHabits(resultHabits))
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const updateDayStreaks = (): AppThunk => async (dispatch, getState) => {
  const habits = getHabits(getState())
  habits.forEach((habit) => {
    if (shouldResetDayStreak(habit)) {
      dispatch(updateHabitDayStreak(habit, 0))
    }
  })
}
