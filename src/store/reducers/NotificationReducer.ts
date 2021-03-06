import {
  NotificationState,
  NotificationType,
  ScheduledNotification,
  UpdateNotificationPermissionType
} from '@typings/NotificationState'
import ReduxAction from '@typings/redux-actions'

export const NEW_NOTIFICATION = 'NEW_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'
export const UPDATE_INTERCOM_NOTIFICATION_COUNT =
  'UPDATE_INTERCOM_NOTIFICATION_COUNT'
export const SET_SHOULD_ASK_NOTIFICATION_PERMISSION =
  'SET_SHOULD_ASK_NOTIFICATION_PERMISSION'
export const ADD_SCHEDULED_NOTIFICATION = 'ADD_SCHEDULED_NOTIFICATION'
export const REMOVE_SCHEDULED_NOTIFICATION = 'REMOVE_SCHEDULED_NOTIFICATION'

export const actionCreators = {
  newNotification: (notificationContent: {
    message: string
    type: NotificationType
  }): ReduxAction => ({
    type: NEW_NOTIFICATION,
    payload: notificationContent
  }),

  clearNotification: (): ReduxAction => ({
    type: CLEAR_NOTIFICATION
  }),

  updateIntercomNotificationCount: (count: number): ReduxAction => ({
    type: UPDATE_INTERCOM_NOTIFICATION_COUNT,
    payload: count
  }),

  setShouldAskNotificationPermission: (asked: boolean): ReduxAction => ({
    type: SET_SHOULD_ASK_NOTIFICATION_PERMISSION,
    payload: asked
  }),

  addScheduledNotification: (
    notification: ScheduledNotification
  ): ReduxAction => ({
    type: ADD_SCHEDULED_NOTIFICATION,
    payload: notification
  }),

  removeScheduledNotification: (notificationId: string): ReduxAction => ({
    type: REMOVE_SCHEDULED_NOTIFICATION,
    payload: notificationId
  }),

  updateNotificationPermission: (
    type: UpdateNotificationPermissionType,
    enabled: boolean
  ): ReduxAction => ({
    type,
    payload: enabled
  })
}

const initState: NotificationState = {
  intercomNotificationCount: 0,
  shouldAskForNotificationPermission: true,
  message: null,
  type: null,
  enabled: false,
  scheduledNotifications: [],
  habitReminderNotification: {
    enabled: true
  },
  bedtimeApproachNotification: {
    enabled: true
  },
  coachingNewNotification: {
    enabled: true
  },
  customerSupportNotification: {
    enabled: true
  }
}

const NotificationReducer = (
  state = initState,
  { type, payload }: ReduxAction
): NotificationState => {
  switch (type) {
    case NEW_NOTIFICATION:
      return { ...state, message: payload.message, type: payload.type }

    case CLEAR_NOTIFICATION:
      return { ...state, message: null, type: null }

    case UPDATE_INTERCOM_NOTIFICATION_COUNT:
      return { ...state, intercomNotificationCount: payload }

    case SET_SHOULD_ASK_NOTIFICATION_PERMISSION:
      return { ...state, shouldAskForNotificationPermission: payload }

    case ADD_SCHEDULED_NOTIFICATION: {
      const scheduledNotifications = state.scheduledNotifications
        ? state.scheduledNotifications.filter(
            (scheduledNotification) => scheduledNotification.id !== payload.id
          )
        : []

      return {
        ...state,
        scheduledNotifications: [...scheduledNotifications, payload]
      }
    }

    case REMOVE_SCHEDULED_NOTIFICATION: {
      const scheduledNotifications = state.scheduledNotifications?.filter(
        (notification) => notification.id === payload
      )
      const spread = scheduledNotifications || []
      return {
        ...state,
        scheduledNotifications: [...spread]
      }
    }

    case UpdateNotificationPermissionType.BEDTIME_APPROACH_NOTIFICATION:
      // Immutate deeply the object, not recommended for large and deep objs
      return {
        ...state,
        ...{
          bedtimeApproachNotification: {
            ...state.bedtimeApproachNotification,
            ...{ enabled: payload }
          }
        }
      }

    case UpdateNotificationPermissionType.COACHING_NEW_NOTIFICATION:
      return {
        ...state,
        ...{
          coachingNewNotification: {
            ...state.coachingNewNotification,
            ...{ enabled: payload }
          }
        }
      }

    case UpdateNotificationPermissionType.CUSTOMER_SUPPORT_NOTIFICATION:
      return {
        ...state,
        ...{
          customerSupportNotification: {
            ...state.customerSupportNotification,
            ...{ enabled: payload }
          }
        }
      }

    default:
      return state
  }
}

export default NotificationReducer
