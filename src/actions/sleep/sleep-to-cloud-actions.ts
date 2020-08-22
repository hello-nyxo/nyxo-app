import API from '@aws-amplify/api'
import { graphqlOperation } from 'aws-amplify'
import { getAllDays } from 'store/Selectors/SleepDataSelectors'
import { getUsername } from 'store/Selectors/UserSelectors'
import { GetState } from 'Types/GetState'
import { v4 } from 'uuid'
import { ListSleepDatasQuery, UpdateSleepDataInput } from '../../API'
import { createSleepData, updateSleepData } from '../../graphql/mutations'
import { listSleepDatas } from '../../graphql/queries'
import { Day } from '../../Types/Sleepdata'

/* ACTION TYPES */

export const PULL_START = 'PULL_START'
export const PULL_SUCCESS = 'PULL_SUCCESS'
export const PULL_FAILURE = 'PULL_FAILURE'

export const CREATE_START = 'CREATE_START'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_FAILURE = 'CREATE_FAILURE'

export const UPDATE_START = 'UPDATE_START'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

/* ACTIONS  */

const pullStart = () => ({
  type: PULL_START
})

const pullSuccess = () => ({
  type: PULL_SUCCESS
})

const pullFailure = () => ({
  type: PULL_FAILURE
})

// Create Sleep Data

const createStart = () => ({
  type: CREATE_START
})

const createSuccess = (days: UpdateSleepDataInput[]) => ({
  type: CREATE_SUCCESS,
  payload: { days }
})

const createFailure = () => ({
  type: CREATE_FAILURE
})

// Update Sleep Data

const updateStart = () => ({
  type: UPDATE_START
})

const updateSuccess = () => ({
  type: UPDATE_SUCCESS
})

const updateFailure = () => ({
  type: UPDATE_FAILURE
})

/* AYSNC ACTIONS */

export const pullSleepFromCloud = () => async (
  dispatch: Function,
  getState: GetState
) => {
  dispatch(pullStart())
  const days = getAllDays(getState())
  const daysToCreate: Day[] = []
  const daysToUpdate: Day[] = []
  try {
    const response = (await API.graphql(
      graphqlOperation(listSleepDatas, {})
    )) as {
      data: ListSleepDatasQuery
    }

    days.forEach((day) => {
      const exists = response.data.listSleepDatas?.items?.find(
        (d) => d?.date === day.date
      )
      exists ? daysToUpdate.push(day) : daysToCreate.push(day)
    })

    dispatch(createSleep(daysToCreate))
    dispatch(updateSleep(daysToUpdate))
  } catch (error) {
    console.warn(error)
    dispatch(pullFailure())
  }
}

export const createSleep = (days: Day[]) => async (
  dispatch: Function,
  getState: GetState
) => {
  const createPromises: Promise<any>[] = []
  const username = getUsername(getState())
  try {
    const withIds: UpdateSleepDataInput[] = days.map((day) => ({
      id: v4(),
      userId: username,
      rating: day.rating,
      night: day.night,
      date: day.date
    }))

    withIds.forEach((day) => {
      createPromises.push(
        API.graphql(graphqlOperation(createSleepData, { input: day })) as any
      )
    })

    await Promise.all(createPromises)
    dispatch(createSuccess(withIds))
  } catch (error) {
    console.warn(error)
    dispatch(createFailure())
  }
}

export const updateSleep = (days: Day[]) => async (dispatch: Function) => {
  const updatePromises: Promise<any>[] = []

  try {
    days.forEach((day) => {
      const input: UpdateSleepDataInput = {
        id: day.id as string,
        rating: day.rating,
        night: day.night
      }

      updatePromises.push(
        API.graphql(graphqlOperation(updateSleepData, { input })) as any
      )
    })

    await Promise.all(updatePromises)
  } catch (error) {
    console.warn(error)
    dispatch(updateFailure())
  }
}
