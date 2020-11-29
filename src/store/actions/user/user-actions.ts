import { DefaultTheme } from 'styled-components'
import {
  SET_INTERCOM_ID,
  SET_THEME,
  UPDATE_EMAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UserActionTypes
} from './types'

export const updateEmail = (email: string): UserActionTypes => ({
  type: UPDATE_EMAIL,
  payload: email
})

export const setTheme = (theme: DefaultTheme): UserActionTypes => ({
  type: SET_THEME,
  payload: theme
})

export const setIntercomId = (intercomId: string): UserActionTypes => ({
  payload: intercomId,
  type: SET_INTERCOM_ID
})

export const updateUserStart = (): UserActionTypes => ({
  type: UPDATE_USER_START
})

export const updateUserSuccess = (): UserActionTypes => ({
  type: UPDATE_USER_SUCCESS
})

export const updateUserFailure = (): UserActionTypes => ({
  type: UPDATE_USER_FAILURE
})
