import ReduxAction from 'Types/ReduxActions'
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '@actions/auth/auth-actions'
import { AuthState } from 'Types/State/AuthState'

export const initialState: AuthState = {
  loading: false,
  authenticated: false,

  password: '',
  email: ''
}

const reducer = (state = initialState, action: ReduxAction): AuthState => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_START: {
      return { ...state, loading: true }
    }

    case REGISTER_SUCCESS: {
      return { ...state, loading: false, email: payload.email }
    }

    case REGISTER_FAILURE: {
      return { ...state, loading: false }
    }

    case LOGIN_START: {
      return { ...state, loading: true }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        authenticated: payload.authenticated,
        loading: false,
        email: ''
      }
    }

    case LOGIN_FAILURE: {
      return { ...state, loading: false }
    }

    case LOGOUT_START: {
      return { ...state, loading: true }
    }

    case LOGOUT_SUCCESS: {
      return { ...state, authenticated: false, loading: false }
    }

    case LOGOUT_FAILURE: {
      return { ...state, loading: false }
    }

    default:
      return state
  }
}

export default reducer
