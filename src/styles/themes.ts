import { StyleSheet } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { DefaultTheme } from 'styled-components/native'
import colors from './colors'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: string
    PRIMARY_BACKGROUND_COLOR?: string
    SECONDARY_BACKGROUND_COLOR?: string

    SECONDARY_BACKGROUND_COLOR_TRANSPARENT?: string

    PRIMARY_TEXT_COLOR?: string
    SECONDARY_TEXT_COLOR?: string
    ICON_COLOR: string
    PRIMARY_BUTTON_COLOR?: string
    SECONDARY_BUTTON_COLOR?: string
    HAIRLINE_COLOR?: string
    GRADIENT: string[]
    SHADOW: string

    FONT_REGULAR: string
    FONT_MEDIUM: string
    FONT_BOLD: string
    accent: string
  }
}

export const lightTheme: DefaultTheme = {
  mode: 'light',
  PRIMARY_BACKGROUND_COLOR: '#F6F6F9',
  SECONDARY_BACKGROUND_COLOR: '#FFFFFF',
  SECONDARY_BACKGROUND_COLOR_TRANSPARENT: 'rgba(255,255,255,0.3)',

  PRIMARY_TEXT_COLOR: '#202125',
  SECONDARY_TEXT_COLOR: '#5e6267',
  ICON_COLOR: '#f7f8fb',
  PRIMARY_BUTTON_COLOR: colors.darkBlue,
  SECONDARY_BUTTON_COLOR: colors.darkBlue,
  HAIRLINE_COLOR: '#C9C9CB',
  GRADIENT: [
    'rgba(246,246,249,0)',
    'rgba(246,246,249,0)',
    'rgba(246,246,249,1)'
  ],
  SHADOW: `1px 1px 5px rgba(32, 33, 37, 0.1)`,
  accent: colors.darkBlue,

  FONT_REGULAR: 'Montserrat-Regular',
  FONT_MEDIUM: 'Montserrat-Medium',
  FONT_BOLD: 'Montserrat-Bold'
}

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  PRIMARY_BACKGROUND_COLOR: 'black',
  SECONDARY_BACKGROUND_COLOR: '#333',
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
  FONT_BOLD: 'Montserrat-Bold'
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

export interface ThemeProps {
  mode?: string
  PRIMARY_BACKGROUND_COLOR?: string
  SECONDARY_BACKGROUND_COLOR?: string
  PRIMARY_TEXT_COLOR?: string
  SECONDARY_TEXT_COLOR?: string
  PRIMARY_BUTTON_COLOR?: string
  SECONDARY_BUTTON_COLOR?: string
  HAIRLINE_COLOR?: string
  GRADIENT: string[]
  SHADOW: string
  accent: string
}

export interface StyleProps {
  theme: ThemeProps
}
