import { Auth, graphqlOperation, API } from 'aws-amplify'
import { updateUser } from '@graphql/mutations'
import { GetState } from '@typings/GetState'
import { ThemeProps } from '../../styles/themes'

/* ACTION TYPES */
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME'
export const CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL'
export const COMPLETE_INTRODUCTION = 'COMPLETE_INTRODUCTION'
export const SET_THEME = 'SET_THEME'
export const SET_INTERCOM_ID = 'SET_INTERCOM_ID'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_USER_FROM_CLOUD = 'UPDATE_USER_FROM_CLOUD'

export const UPDATE_USER_START = 'UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

/* ACTIONS */

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  payload: email
})

export const markIntroductionCompleted = (completed: boolean) => ({
  type: COMPLETE_INTRODUCTION,
  payload: completed
})

export const setTheme = (theme: ThemeProps) => ({
  type: SET_THEME,
  payload: theme
})

export const updateUserFromCloud = (user: any) => ({
  type: UPDATE_USER_FROM_CLOUD,
  payload: user
})

export const setIntercomId = (intercomId: string) => ({
  payload: intercomId,
  type: SET_INTERCOM_ID
})

export const updateUserStart = () => ({
  type: UPDATE_USER_START
})

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS
})

export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE
})

/* ASYNC ACTIONS */

export const updateUserDateInCloud = () => async (
  dispatch: Function,
  getState: GetState
) => {
  dispatch(updateUserStart())
  const {
    user: { intercomId }
  } = getState()
  const { username } = await Auth.currentUserInfo()
  try {
    const input = {
      id: username,
      intercomId
    }
    const response: any = await API.graphql(
      graphqlOperation(updateUser, { input })
    )
    dispatch(updateUserSuccess())
  } catch (error) {
    dispatch(updateUserFailure())
  }
}
