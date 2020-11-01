import { createSelector } from 'reselect'
import { State } from '@typings/State'
import {
  NotificationState,
  NotificationPermissionType
} from '@typings/NotificationState'

const getNotificationState = (state: State) => state.notifications

export const getShouldAskForPermission = createSelector(
  getNotificationState,
  (askForNotifications: NotificationState) =>
    askForNotifications.shouldAskForNotificationPermission
)

export const getNotificationMessage = createSelector(
  getNotificationState,
  (notification: NotificationState) => notification.message
)

export const getNotificationType = createSelector(
  getNotificationState,
  (notification: NotificationState) => notification.type
)

export const getScheduledNotifications = createSelector(
  getNotificationState,
  (notification: NotificationState) => notification.scheduledNotifications
)

export const getIntercomNotificationCount = createSelector(
  getNotificationState,
  (state: NotificationState) => state.intercomNotificationCount
)

// Create a single selector for each NotificationRow cause we are passing the title prop
// so that memoization can work properly
export const makeGetNotificationEnabled = () =>
  createSelector(
    getNotificationState,
    (_: any, title: NotificationPermissionType) => title,
    (notification: NotificationState, title: NotificationPermissionType) => {
      if (title === NotificationPermissionType.CUSTOMER_SUPPORT_NOTIFICATION) {
        return notification.customerSupportNotification
          ? notification.customerSupportNotification.enabled
          : false
      }
      if (title === NotificationPermissionType.BEDTIME_APPROACH_NOTIFICATION) {
        return notification.bedtimeApproachNotification
          ? notification.bedtimeApproachNotification.enabled
          : false
      }
      return notification.coachingNewNotification
        ? notification.coachingNewNotification.enabled
        : false
    }
  )
