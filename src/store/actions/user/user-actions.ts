import ReduxAction from '@typings/redux-actions'
import { DefaultTheme } from 'styled-components'

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

export const updateEmail = (email: string): ReduxAction => ({
  type: UPDATE_EMAIL,
  payload: email
})

export const markIntroductionCompleted = (completed: boolean): ReduxAction => ({
  type: COMPLETE_INTRODUCTION,
  payload: completed
})

export const setTheme = (theme: DefaultTheme): ReduxAction => ({
  type: SET_THEME,
  payload: theme
})

export const setIntercomId = (intercomId: string): ReduxAction => ({
  payload: intercomId,
  type: SET_INTERCOM_ID
})

export const updateUserStart = (): ReduxAction => ({
  type: UPDATE_USER_START
})

export const updateUserSuccess = (): ReduxAction => ({
  type: UPDATE_USER_SUCCESS
})

export const updateUserFailure = (): ReduxAction => ({
  type: UPDATE_USER_FAILURE
})
