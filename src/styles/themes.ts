import { StyleSheet } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { DefaultTheme } from 'styled-components'
import colors from './colors'

export const lightTheme: DefaultTheme = {
  mode: 'light',
  PRIMARY_BACKGROUND_COLOR: '#F1F1F1',
  SECONDARY_BACKGROUND_COLOR: '#FFFFFF',
  SECONDARY_BACKGROUND_COLOR_TRANSPARENT: 'rgba(255,255,255,0.3)',

  PRIMARY_TEXT_COLOR: '#202125',
  SECONDARY_TEXT_COLOR: '#5e6267',
  ICON_COLOR: '#f7f8fb',
  PRIMARY_BUTTON_COLOR: colors.darkBlue,
  SECONDARY_BUTTON_COLOR: colors.darkBlue,
  HAIRLINE_COLOR: '#C9C9CB',
  GRADIENT: [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0)',
    'rgba(255,255,255,1)'
  ],
  SHADOW: `1px 1px 5px rgba(32, 33, 37, 0.1)`,
  accent: colors.darkBlue,

  FONT_REGULAR: 'Montserrat-Regular',
  FONT_MEDIUM: 'Montserrat-Medium',
  FONT_BOLD: 'Montserrat-Bold',

  primaryBoneColer: '#E1E9EE',
  SecondaryBoneColor: '#F2F8FC'
}

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  PRIMARY_BACKGROUND_COLOR: 'black',
  SECONDARY_BACKGROUND_COLOR: '#161718',
  SECONDARY_BACKGROUND_COLOR_TRANSPARENT: 'rgba(51,51,51,0.3)',

  PRIMARY_TEXT_COLOR: 'white',
  SECONDARY_TEXT_COLOR: 'rgba(255,255,255,0.75)',
  ICON_COLOR: '#f7f8fb',
  PRIMARY_BUTTON_COLOR: 'white',
  SECONDARY_BUTTON_COLOR: 'white',
  HAIRLINE_COLOR: '#C9C9CB',
  GRADIENT: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
  SHADOW: ` 1px 1px 5px rgba(32, 33, 37, 0.1)`,
  accent: '#4A5AEF',

  FONT_REGULAR: 'Montserrat-Regular',
  FONT_MEDIUM: 'Montserrat-Medium',
  FONT_BOLD: 'Montserrat-Bold',

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
  bold: 'Montserrat-Bold',

  domine: 'Domine-Regular',
  domineBold: 'Domine-Bold'
}
