import { Dimensions, Platform } from 'react-native'
import Constants from 'expo-constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const φ = (1 + Math.sqrt(5)) / 2

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

// Get status bar height from expo-constants
const getStatusBarHeight = (): number => {
  return Constants.statusBarHeight || 0
}

// Check if device has a notch (modern iPhones, Android with cutouts)
const hasNotch = (): boolean => {
  const { height, width } = Dimensions.get('window')
  // iPhone X and later have specific aspect ratios
  if (Platform.OS === 'ios') {
    return (
      (height >= 812 || width >= 812) && // iPhone X, XS, 11 Pro, 12 mini, 13 mini
      Constants.statusBarHeight > 20 // Status bar is taller on notched iPhones
    )
  }
  return false
}

export const HEADER_MAX_HEIGHT = HEIGHT * (1 - 1 / φ)
export const HEADER_MIN_HEIGHT = 64 + getStatusBarHeight()
export const HEADER_DELTA = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
export const HEADER_HALF = 150
export const SMART_TOP_PADDING = `${hasNotch() ? getStatusBarHeight() : 0}`
export const cardWidth = WIDTH - 64 + 20
export const STATUS_BAR_HEIGHT = getStatusBarHeight()

// Hook for safe area aware dimensions
export const useDimensions = () => {
  const insets = useSafeAreaInsets()
  return {
    width: WIDTH,
    height: HEIGHT,
    statusBarHeight: insets.top,
    bottomInset: insets.bottom,
    hasNotch: insets.top > 20
  }
}
