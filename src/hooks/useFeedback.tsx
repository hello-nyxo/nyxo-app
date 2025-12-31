import * as Haptics from 'expo-haptics'

export type HapticFeedbackTypes =
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError'

const hapticTypeMap: Record<HapticFeedbackTypes, () => Promise<void>> = {
  selection: () => Haptics.selectionAsync(),
  impactLight: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  impactMedium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  impactHeavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  notificationSuccess: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  notificationWarning: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  notificationError: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
}

export const useFeedback = (): {
  impact: (type: HapticFeedbackTypes) => void
} => {
  const impact = (type: HapticFeedbackTypes) => {
    const hapticFn = hapticTypeMap[type] || hapticTypeMap.impactMedium
    hapticFn().catch(() => {
      // Haptics may not be available on all devices
    })
  }

  return { impact }
}
