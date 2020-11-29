import { DefaultTheme } from 'styled-components'

export const CHANGE_USER_NAME = 'CHANGE_USER_NAME'
export const SET_THEME = 'SET_THEME'
export const SET_INTERCOM_ID = 'SET_INTERCOM_ID'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_USER_FROM_CLOUD = 'UPDATE_USER_FROM_CLOUD'

export const UPDATE_USER_START = 'UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

type ChangeUsernameAction = {
  type: typeof CHANGE_USER_NAME
  payload: string
}

type ChangeUserEmailAction = {
  type: typeof UPDATE_EMAIL
  payload: string
}

type SetThemeAction = {
  type: typeof SET_THEME
  payload: DefaultTheme
}

type SetIntercomIDAction = {
  type: typeof SET_INTERCOM_ID
  payload: string
}

type UpdateUserAction = {
  type: typeof UPDATE_USER_START
}

type UpdateUserSuccessAction = {
  type: typeof UPDATE_USER_SUCCESS
}

type UpdateUserFailAction = {
  type: typeof UPDATE_USER_FAILURE
}

export type UserActionTypes =
  | ChangeUsernameAction
  | ChangeUserEmailAction
  | SetThemeAction
  | SetIntercomIDAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailAction
