import { NativeModules } from 'react-native'
import RNCNetInfoMock from '@react-native-community/netinfo'

import {
  REGISTER_START,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_FAILURE
} from '@actions/auth/types'
import reducer, { initialState } from './auth-reducer'

NativeModules.RNCNetInfo = RNCNetInfoMock
jest.mock('@react-native-community/netinfo', () => ({}))

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it(`should handle ${REGISTER_START}`, () => {
    expect(
      reducer(initialState, {
        type: REGISTER_START
      })
    ).toEqual({
      ...initialState,
      loading: true
    })
  })

  it(`should handle ${REGISTER_SUCCESS}`, () => {
    expect(
      reducer(initialState, {
        type: REGISTER_SUCCESS,
        payload: { email: '' }
      })
    ).toEqual({
      ...initialState,
      loading: false
    })
  })

  it(`should handle ${REGISTER_FAILURE}`, () => {
    expect(
      reducer(initialState, {
        type: REGISTER_FAILURE,
        payload: 'error'
      })
    ).toEqual({
      ...initialState,
      loading: false
    })
  })

  it(`should handle ${LOGIN_START}`, () => {
    expect(
      reducer(initialState, {
        type: LOGIN_START
      })
    ).toEqual({
      ...initialState,
      loading: true
    })
  })

  it(`should handle ${LOGIN_SUCCESS}`, () => {
    expect(
      reducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: { authenticated: true, username: '', email: '' }
      })
    ).toEqual({
      ...initialState,
      authenticated: true,
      loading: false
    })
  })

  it(`should handle ${LOGIN_FAILURE}`, () => {
    expect(
      reducer(initialState, {
        type: LOGIN_FAILURE,
        payload: 'error'
      })
    ).toEqual({
      ...initialState,
      loading: false
    })
  })
})
