jest.mock('appcenter-analytics', () => ({
  trackEvent: jest.fn(),
  removeEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  configure: jest.fn()
}))
