jest.mock('react-native-iap', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  configure: jest.fn()
}))
