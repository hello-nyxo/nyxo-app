import ReactNativeHapticFeedback, {
  HapticFeedbackTypes
} from 'react-native-haptic-feedback'

export const useFeedback = () => {
  const impact = (type: HapticFeedbackTypes) => {
    ReactNativeHapticFeedback.trigger(type, {
      enableVibrateFallback: true
    })
  }

  return { impact }
}
