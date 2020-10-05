import {
  FITBIT_AUTHORIZE_SUCCESS,
  FITBIT_REVOKE_SUCCESS
} from '@actions/api-actions/fitbit-actions'
import { ResponseBase } from '@typings/state/api-state'
import reducer, { initialState } from './api-reducer'

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: () => 20,
  isIphoneX: jest.fn(() => true)
}))

const fitbitMock: ResponseBase = {
  enabled: true
}

describe('Api reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it(`should handle ${FITBIT_AUTHORIZE_SUCCESS}`, () => {
    expect(
      reducer(initialState, {
        type: FITBIT_AUTHORIZE_SUCCESS,
        payload: fitbitMock
      })
    ).toEqual({
      ...initialState,
      fitbit: {
        ...fitbitMock
      }
    })
  })

  it(`should handle ${FITBIT_REVOKE_SUCCESS}`, () => {
    expect(
      reducer(
        { ...initialState, fitbit: fitbitMock },
        {
          type: FITBIT_REVOKE_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      fitbit: {
        ...fitbitMock,
        enabled: false
      }
    })
  })
})
