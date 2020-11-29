export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

type RegisterAction = {
  type: typeof REGISTER_START
}

type RegisterSuccessAction = {
  type: typeof REGISTER_SUCCESS
  payload: { email: string }
}

type RegisterFailAction = {
  type: typeof REGISTER_FAILURE
  payload: string
}

type LoginAction = {
  type: typeof LOGIN_START
}

type LoginSuccessAction = {
  type: typeof LOGIN_SUCCESS
  payload: {
    username: string
    authenticated: boolean
    email: string
  }
}

type LoginFailAction = {
  type: typeof LOGIN_FAILURE
  payload: string
}

type LogoutAction = {
  type: typeof LOGOUT_START
}

type LogoutSuccessAction = {
  type: typeof LOGOUT_SUCCESS
}

type LogoutFailAction = {
  type: typeof LOGOUT_FAILURE
  payload: string
}

export type AuthActionTypes =
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LogoutFailAction
  | LogoutSuccessAction
