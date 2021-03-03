import PushNotificationIOS, {
  PushNotificationPermissions
} from '@react-native-community/push-notification-ios'
import { Night } from '@typings/Sleepdata'
import translate from '@config/i18n'
import {
  BEDTIME_APPROACH,
  COACHING_INCOMPLETE_LESSON,
  COACHING_REMIND_LESSONS_IN_WEEK,
  NotificationObject
} from '@config/push-notifications'
import moment from 'moment'
import { Platform } from 'react-native'
import Intercom from 'react-native-intercom'
import { actionCreators } from '@reducers/NotificationReducer'
import {
  NotificationType,
  ScheduledNotification,
  UpdateNotificationPermissionType
} from '@typings/NotificationState'
import { AppThunk } from '@typings/redux-actions'
import { startOfDay } from 'date-fns'

const firebaseNotifications = undefined
const {
  setShouldAskNotificationPermission,
  newNotification,
  updateNotificationPermission,
  addScheduledNotification,
  removeScheduledNotification
} = actionCreators

export const askForPush = (): AppThunk => async (dispatch) => {
  if (Platform.OS === 'ios') {
    const permissions: PushNotificationPermissions = await PushNotificationIOS.requestPermissions(
      {
        badge: true,
        alert: true,
        sound: true
      }
    )
    if (permissions.alert) {
      await dispatch(setShouldAskNotificationPermission(false))
    }
  } else {
    // const FCMToken = await Firebase.messaging().getToken()
    await Intercom.sendTokenToIntercom(FCMToken)
    await dispatch(setShouldAskNotificationPermission(false))
  }
}

export const setNotification = (
  type: UpdateNotificationPermissionType,
  enabled: boolean
): AppThunk => (dispatch) => {
  dispatch(updateNotificationPermission(type, enabled))
}

export const createAndroidChannels = async (): Promise<void> => {
  // const bedtimeChannel = new firebaseNotifications.Android.Channel(
  //   androidChannels.BEDTIME.id,
  //   androidChannels.BEDTIME.name,
  //   androidChannels.BEDTIME.importance
  // ).setDescription('Channel for bedtime-related notifications')
  // const coachingChannel = new firebaseNotifications.Android.Channel(
  //   androidChannels.COACHING.id,
  //   androidChannels.COACHING.name,
  //   androidChannels.COACHING.importance
  // ).setDescription('Channel for coaching-related notifications')
  // const channels = [bedtimeChannel, coachingChannel]
  // await firebaseNotifications().android.createChannels(channels)
}

/* START - HANDLE BEDTIME APPROACH NOTIFICATIONS */
export const handleBedtimeApproachNotifications = (): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    nights,
    notifications: {
      bedtimeApproachNotification: { enabled: bedtimeNotificationEnabled } = {
        enabled: false
      }
    }
  } = getState()

  const today = startOfDay(new Date()).toISOString()

  const notification = {
    ...BEDTIME_APPROACH,
    title: translate('BEDTIME_NOTIFICATION.TITLE'),
    body: translate('BEDTIME_NOTIFICATION.BODY')
  }
  dispatch(cancelLocalNotifications(notification))

  if (bedtimeNotificationEnabled) {
    const notificationTime = new Date()
    const tonightIndex = ((n: Night[]) => {
      const index = n.findIndex((night) => {
        const nightDate = moment(night.startDate).toDate()
        const tonightDate = moment(today).toDate()
        return (
          nightDate.getDate() === tonightDate.getDate() &&
          nightDate.getMonth() === tonightDate.getMonth() &&
          nightDate.getFullYear() === tonightDate.getFullYear()
        )
      })
      return index
    })(nights)

    const MSBeforeNotify = 60 * 60 * 1000 // 1 hour
    const tonightStartDate = ''

    if (tonightStartDate.length > 0) {
      const startDateMS = moment(tonightStartDate).toDate().getTime()
      const notifyDateMS = startDateMS - MSBeforeNotify + 24 * 60 * 60 * 1000 // add 1 day miliseconds as sleepData's date is subtracted by 1 day
      const scheduledNotifyTime = new Date(notifyDateMS).toISOString()

      // Only send a new notification when scheduled time is ahead current time
      if (notifyDateMS > Date.now()) {
        if (Platform.OS === 'ios') {
          dispatch(scheduleIosNotification(notification, scheduledNotifyTime))
        } else if (Platform.OS === 'android') {
          dispatch(scheduleAndroidNotification(notification, notifyDateMS))
        }
      }
    }
  }
}
/* END - HANDLE BEDTIME APPROACH NOTIFICATIONS */

/* START- HANDLE COACHING NOTIFICATIONS */

export const handleCoachingUncompletedLessonNotifications = (): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    subscriptions: { isActive: coachingActivated },
    notifications: {
      coachingNewNotification: { enabled: coachingEnabled } = {
        enabled: false
      },
      scheduledNotifications
    },
    coachingContent: { lessons },
    coachingNotification: { incompleteLessons }
  } = getState()
  const notification = {
    ...COACHING_INCOMPLETE_LESSON,
    title: translate('INCOMPLETE_LESSON_NOTIFICATION.TITLE'),
    body: translate('INCOMPLETE_LESSON_NOTIFICATION.BODY')
  }

  if (coachingActivated && incompleteLessons.length > 0 && coachingEnabled) {
    const latestUncompletedLesson = incompleteLessons[0]
    const { lessonId } = latestUncompletedLesson
    const lessonDetail = lessons.find((lesson) => lesson.contentId === lessonId)
    const lessonName = lessonDetail?.lessonName // TODO GET BACK TO THIS

    if (isOldFireDateBehindToday(scheduledNotifications, notification.id)) {
      dispatch(cancelLocalNotifications(notification))

      // Scheduled hour is 12pm everyday
      const fireDate = moment()
        .set({
          hour: 12,
          minute: 0,
          second: 0,
          millisecond: 0
        })
        .add(1, 'day')

      if (Platform.OS === 'ios') {
        dispatch(cancelLocalNotifications(notification))

        dispatch(scheduleIosNotification(notification, fireDate.toISOString()))
      } else if (Platform.OS === 'android') {
        dispatch(scheduleAndroidNotification(notification, fireDate.valueOf()))
      }
    }

    /* If the saved date is ahead of today, we do not need to implement a new scheduled one meaning
     the saved one will not be replaced until current time passes the defined fire date. */
  } else {
    dispatch(cancelLocalNotifications(notification))
  }
}

export const handleCoachingLessonsInWeekNotifications = (): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    notifications: {
      coachingNewNotification: { enabled: coachingEnabled } = {
        enabled: false
      },
      scheduledNotifications
    },
    coachingContent: { weeks },
    coachingState: { ongoingWeek, weeks: stateWeeks, currentWeekStarted },
    subscriptions: { isActive: coachingActivated }
  } = getState()

  const notification = {
    ...COACHING_REMIND_LESSONS_IN_WEEK,
    title: translate('LESSONS_IN_WEEK_NOTIFICATION.TITLE'),
    body: translate('LESSONS_IN_WEEK_NOTIFICATION.BODY')
  }

  if (coachingEnabled && coachingActivated) {
    if (ongoingWeek && currentWeekStarted) {
      const stateWeek = stateWeeks.find(
        (week) => week.contentId === ongoingWeek
      )
      const contentWeek = weeks.find((week) => week.contentId === ongoingWeek)

      if (stateWeek && contentWeek) {
        const enoughLessons = stateWeek.lessons
          ? stateWeek.lessons.filter((lesson) => lesson.completed).length ===
            contentWeek.lessons.length
          : false

        if (!enoughLessons) {
          if (
            isOldFireDateBehindToday(scheduledNotifications, notification.id)
          ) {
            dispatch(cancelLocalNotifications(notification))

            // Every 10am
            const fireDate = moment()
              .set({
                hour: 10,
                minute: 0,
                second: 0,
                millisecond: 0
              })
              .add(1, 'day')

            if (Platform.OS === 'ios') {
              dispatch(
                scheduleIosNotification(notification, fireDate.toISOString())
              )
            } else if (Platform.OS === 'android') {
              dispatch(
                scheduleAndroidNotification(notification, fireDate.valueOf())
              )
            }
          }

          /* If the saved date is ahead of today, we do not need to implement a new scheduled one meaning
     the saved one will not be replaced until current time passes the defined fire date. */
        }
      }
    } else {
      dispatch(cancelLocalNotifications(notification))
    }
  } else {
    dispatch(cancelLocalNotifications(notification))
  }
}
/* END- HANDLE COACHING NOTIFICATIONS */

const isOldFireDateBehindToday = (
  scheduledNotifications: ScheduledNotification[] | undefined,
  notificationId: string
) => {
  // index of the notification in scheduledNotifications. -1 means none
  const index = scheduledNotifications
    ? scheduledNotifications.findIndex(
        (scheduledNotification) => scheduledNotification.id === notificationId
      )
    : -1

  // The fire date of the found scheduled noti. undefined means no noti found
  const oldFireDate =
    scheduledNotifications && index > -1
      ? scheduledNotifications[index].fireDate
      : undefined

  // To check if the saved fire date is behind today. undefined value means no noti => set to true
  // to add a new scheduled noti when true
  return oldFireDate
    ? moment(oldFireDate).valueOf() - moment().valueOf() < 0
    : true
}

export const cancelLocalNotifications = (
  notification: NotificationObject
) => async (dispatch) => {
  const { userInfo, id } = notification

  if (Platform.OS === 'ios') {
    PushNotificationIOS.cancelLocalNotifications(userInfo)
  } else if (Platform.OS === 'android') {
    await firebaseNotifications().cancelNotification(id)
  }

  dispatch(removeScheduledNotification(id))
}

const scheduleAndroidNotification = (
  notification: NotificationObject,
  fireDate: number
) => async (dispatch) => {
  const { id, title, body, channelID, smallIcon, largeIcon } = notification

  const notificationObject = new firebaseNotifications.Notification()
    .setNotificationId(id)
    .setTitle(title)
    .setBody(body)
    .android.setChannelId(channelID)
    .android.setSmallIcon(smallIcon)
    .android.setLargeIcon(largeIcon)

  await firebaseNotifications().scheduleNotification(notificationObject, {
    fireDate
  })

  dispatch(
    addScheduledNotification({
      id,
      title,
      fireDate: moment(fireDate).toISOString()
    })
  )
}

const scheduleIosNotification = (
  notification: NotificationObject,
  fireDate: string
): AppThunk => async (dispatch) => {
  const { title, body, userInfo, id } = notification
  PushNotificationIOS.scheduleLocalNotification({
    userInfo,
    alertTitle: title,
    alertBody: body,
    fireDate
  })

  dispatch(addScheduledNotification({ id, title, fireDate }))
}

/* ERROR HANDLING */

type errorObject = {
  message: string
}

export const sendError = (error: errorObject) => async (dispatch) => {
  if (error.message) {
    await dispatch(
      newNotification({
        message: error.message,
        type: NotificationType.ERROR
      })
    )
  } else {
    await dispatch(
      newNotification({
        message: JSON.stringify(error),
        type: NotificationType.ERROR
      })
    )
  }
}
