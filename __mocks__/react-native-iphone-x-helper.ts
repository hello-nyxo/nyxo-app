jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
  ifIphoneX: jest.fn(),
  isIphoneX: jest.fn()
}))
