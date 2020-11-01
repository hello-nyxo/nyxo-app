import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js'
import React from 'react'
import * as ReactNative from 'react-native'

global.React = React
global.ReactNative = ReactNative

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(() => 44),
  isIphoneX: jest.fn(() => true)
}))

global.React.useCallback = (f) => f

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)

export const alert = jest.fn()
export const Alert = { alert }

export const dimensionWidth = 100
export const Dimensions = {
  get: jest.fn().mockReturnValue({ width: dimensionWidth, height: 100 })
}

export const Image = 'Image'

export const keyboardDismiss = jest.fn()
export const Keyboard = {
  dismiss: keyboardDismiss
}

export const Platform = {
  ...ReactNative.Platform,
  OS: 'ios',
  Version: 123,
  isTesting: true,
  select: (objs) => objs.ios
}

export default Object.setPrototypeOf(
  {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Platform
  },
  ReactNative
)
