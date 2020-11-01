export interface NotificationState {
  intercomNotificationCount: number
  message: string | null
  type: NotificationType | null

  shouldAskForNotificationPermission?: boolean

  enabled: boolean
  lastActivated?: number // timestamp to track the last activated date if needed

  scheduledNotifications?: ScheduledNotification[]

  // Control each child notification
  customerSupportNotification?: NotificationChildState
  bedtimeApproachNotification?: NotificationChildState
  coachingNewNotification?: NotificationChildState
  habitReminderNotification: NotificationChildState
}

export type ScheduledNotification = {
  id: string
  title: string
  fireDate: string
}

export enum NotificationType {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

interface NotificationChildState {
  enabled: boolean
  lastActivated?: number // timestamp to track the last activated date if needed
}

export enum UpdateNotificationPermissionType {
  BEDTIME_APPROACH_NOTIFICATION = 'UPDATE_BEDTIME_APPROACH_NOTIFICATION_PERMISSION',
  CUSTOMER_SUPPORT_NOTIFICATION = 'UPDATE_CUSTOMER_SUPPORT_NOTIFICATION_PERMISSION',
  COACHING_NEW_NOTIFICATION = 'UPDATE_COACHING_NEW_NOTIFICATION_PERMISSION'
}

export enum NotificationPermissionType {
  BEDTIME_APPROACH_NOTIFICATION = 'ALLOW_BED_TIME_APPROACH',
  CUSTOMER_SUPPORT_NOTIFICATION = 'ALLOW_CUSTOMER_SUPPORT',
  COACHING_NEW_NOTIFICATION = 'ALLOW_COACHING_NEWS'
}
