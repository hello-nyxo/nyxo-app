import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '@actions/auth/auth-actions'
import {
  CHANGE_USER_EMAIL,
  COMPLETE_INTRODUCTION,
  SET_INTERCOM_ID,
  SET_THEME,
  UPDATE_EMAIL,
  UPDATE_USER_FROM_CLOUD
} from '@actions/user/user-actions'
import ReduxAction from 'Types/ReduxActions'
import { UserState } from 'Types/UserState'
import { lightTheme } from '../../../styles/themes'

export const initialState: UserState = {
  syncEnabled: false,
  introduction_completed: false,
  healthkit_enabled: false,
  appTheme: lightTheme,
  loggedIn: false,
  username: '',
  quickIntroCompleted: false,
  email: '',
  intercomId: null,
  authenticated: false
}

const reducer = (
  state: UserState = initialState,
  action: ReduxAction
): UserState => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_USER_FROM_CLOUD:
      return { ...state, connectionId: payload.connectionId }

    case CHANGE_USER_EMAIL:
      return { ...state, email: payload.email }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        username: payload.username,
        authenticated: !!payload.authenticated,
        syncEnabled: true,
        username: payload.username,
        email: payload.email
      }
    }

    case LOGOUT_SUCCESS: {
      return { ...state, authenticated: false, syncEnabled: false, email: '' }
    }

    case COMPLETE_INTRODUCTION:
      return {
        ...state,
        introduction_completed: payload
      }

    case UPDATE_EMAIL:
      return { ...state, email: payload }

    case SET_THEME:
      return { ...state, appTheme: { ...state.appTheme, ...payload } }

    case SET_INTERCOM_ID:
      return { ...state, intercomId: payload }

    default:
      return state
  }
}

export default reducer
