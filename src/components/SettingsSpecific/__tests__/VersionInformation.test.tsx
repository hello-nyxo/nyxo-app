import React from 'react'
import 'react-native'
import 'jest-styled-components'
import VersionInformation from '../versionInformation'
import { matchComponentToSnapshot } from @helpers/snapshot'

// We mock the useNavigation hook as currently it seems the only way to
// test a screen component
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))

// Mock the getDevice function so we don't run into a TypeError
jest.mock('react-native-device-info', () => ({
  getDevice: jest.fn()
}))

describe('<VersionInformation />', () => {
  it('Should render correctly', () => {
    matchComponentToSnapshot(<VersionInformation />)
  })
})
