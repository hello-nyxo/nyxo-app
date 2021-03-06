/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  setupFiles: [
    '<rootDir>/jest-setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  preset: 'react-native',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['./node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@sentry/react-native|react-native-ultimate-config|aws-amplify|aws-amplify-react-native)/)'
  ],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@helpers(.*)$': '<rootDir>/src/helpers$1',
    '^@actions(.*)$': '<rootDir>/src/store/actions$1',
    '^@typings(.*)$': '<rootDir>/src/typings$1'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  automock: false,
  coverageThreshold: {
    global: {
      branches: 90,
      lines: 95
    }
  },
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  cacheDirectory: '.jest/cache'
}
