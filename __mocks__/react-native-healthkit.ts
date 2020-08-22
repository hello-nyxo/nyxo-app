import { AppleHealthKit } from 'react-native-healthkit'

jest.mock('react-native-healthkit', () => ({
  Constants: {
    Permissions: {}
  },
  AppleHealthKit: {
    Constants: {
      Permissions: {}
    }
  }
}))

export default AppleHealthKit
