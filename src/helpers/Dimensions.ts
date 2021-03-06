import { Dimensions } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getStatusBarHeight as statusBarHeight } from 'react-native-status-bar-height'

const φ = (1 + Math.sqrt(5)) / 2

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
export const HEADER_MAX_HEIGHT = HEIGHT * (1 - 1 / φ)
export const HEADER_MIN_HEIGHT = 64 + getStatusBarHeight(true)
export const HEADER_DELTA = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
export const HEADER_HALF = 150
export const SMART_TOP_PADDING = `${isIphoneX() ? getStatusBarHeight(true) : 0}`
export const cardWidth = WIDTH - 64 + 20
export const STATUS_BAR_HEIGHT = statusBarHeight
