import reducer, { initialState } from './user-reducer'

jest.mock('react-native', () => ({
  StyleSheet: {
    hairlineWidth: 10
  },

  NativeModules: {
    RNSentry: () => jest.fn()
  }
}))

jest.mock('@aws-amplify/auth', () => ({
  Auth: {
    RNAWSCognito: () => jest.fn()
  }
}))

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })
})
