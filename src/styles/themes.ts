import { StyleSheet } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { DefaultTheme } from 'styled-components'
import colors from './colors'

export const lightTheme: DefaultTheme = {
  mode: 'light',
  bgPrimary: '#FFFFFF',
  bgSecondary: '#FFFFFF',

  textPrimary: '#202125',
  textSecondary: '#5e6267',
  buttonPrimary: colors.darkBlue,
  buttonSecondary: colors.darkBlue,

  hairline: '#C9C9CB',
  gradient: [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0)',
    'rgba(255,255,255,1)'
  ],
  shadowPrimary: `1px 1px 5px rgba(32, 33, 37, 0.1)`,
  accent: colors.darkBlue,
  accentSecondary: colors.fallAsleep,

  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  bold: 'Montserrat-Bold',

  primaryBoneColer: '#E1E9EE',
  SecondaryBoneColor: '#F2F8FC'
}

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  bgPrimary: 'black',
  bgSecondary: '#161718',

  textPrimary: 'white',
  textSecondary: 'rgba(255,255,255,0.75)',
  buttonPrimary: 'white',
  buttonSecondary: 'white',
  hairline: '#C9C9CB',
  gradient: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
  shadowPrimary: ` 1px 1px 5px rgba(32, 33, 37, 0.1)`,

  accent: '#4A5AEF',
  accentSecondary: colors.fallAsleep,

  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  bold: 'Montserrat-Bold',

  primaryBoneColer: '#121212',
  SecondaryBoneColor: '#333333'
}

export const constants = {
  hairlineWidth: StyleSheet.hairlineWidth,
  iPhoneX: isIphoneX() ? getStatusBarHeight() : '0px'
}

export const fonts = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  bold: 'Montserrat-Bold'
}
