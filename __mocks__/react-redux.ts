jest.mock('react-native-intercom', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  configure: jest.fn()
}))
