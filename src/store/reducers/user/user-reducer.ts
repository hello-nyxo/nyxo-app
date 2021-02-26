import { UserState } from '@typings/UserState'
import { lightTheme } from '@styles/themes'
import {
  SET_INTERCOM_ID,
  SET_THEME,
  UPDATE_EMAIL,
  UserActionTypes
} from '@actions/user/types'
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AuthActionTypes
} from '@actions/auth/types'

export const initialState: UserState = {
  syncEnabled: false,
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
  action: UserActionTypes | AuthActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        username: action.payload.username,
        authenticated: !!action.payload.authenticated,
        syncEnabled: true,
        email: action.payload.email
      }
    }

    case LOGOUT_SUCCESS: {
      return { ...state, authenticated: false, syncEnabled: false, email: '' }
    }

    case UPDATE_EMAIL:
      return { ...state, email: action.payload }

    case SET_THEME:
      return { ...state, appTheme: { ...state.appTheme, ...action.payload } }

    case SET_INTERCOM_ID:
      return { ...state, intercomId: action.payload }

    default:
      return state
  }
}

export default reducer
