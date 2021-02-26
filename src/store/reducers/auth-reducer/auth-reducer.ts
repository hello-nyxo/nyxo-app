import { AuthState } from '@typings/state/AuthState'
import {
  AuthActionTypes,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS
} from '@actions/auth/types'

export const initialState: AuthState = {
  loading: false,
  authenticated: false,

  password: '',
  email: ''
}

const reducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case REGISTER_START: {
      return { ...state, loading: true }
    }

    case REGISTER_SUCCESS: {
      return { ...state, loading: false, email: action.payload.email }
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
        authenticated: action.payload.authenticated,
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
