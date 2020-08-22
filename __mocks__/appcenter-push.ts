jest.mock('appcenter-push', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  configure: jest.fn()
}))
