import reducer, { initialState } from './user-reducer'

jest.mock('react-native', () => ({
  StyleSheet: {
    hairlineWidth: 10
  }
}))

jest.mock('react-native', () => ({
  NativeModules: {
    RNSentry: () => jest.fn()
  }
}))

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
  ifIphoneX: jest.fn(),
  isIphoneX: jest.fn()
}))


describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })
})
