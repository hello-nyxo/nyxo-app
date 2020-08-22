jest.mock('react-native-app-auth', () => ({
  authorize: jest.fn(),
  register: jest.fn(),
  revoke: jest.fn(),
  refresh: jest.fn()
}))
