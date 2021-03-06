import ReactNativeHapticFeedback, {
  HapticFeedbackTypes
} from 'react-native-haptic-feedback'

export const useFeedback = (): {
  impact: (type: HapticFeedbackTypes) => void
} => {
  const impact = (type: HapticFeedbackTypes) => {
    ReactNativeHapticFeedback.trigger(type, {
      enableVibrateFallback: true
    })
  }

  return { impact }
}
