import { Dimensions } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getStatusBarHeight as statusBarHeight } from 'react-native-status-bar-height'

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
export const HEADER_MAX_HEIGHT = 300
export const HEADER_MIN_HEIGHT = 80
export const HEADER_HALF = 150
export const SMART_TOP_PADDING = `${isIphoneX() ? getStatusBarHeight() : 0}`
export const cardWidth = WIDTH - 64 + 20
export const STATUS_BAR_HEIGHT = statusBarHeight
