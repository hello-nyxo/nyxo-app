jest.mock('@sentry/react-native', () => ({
  setTagsContext: jest.fn(),
  setExtraContext: jest.fn(),
  captureBreadcrumb: jest.fn()
}))
