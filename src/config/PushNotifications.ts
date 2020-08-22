import Firebase from 'react-native-firebase'
import translate from './i18n'

const { notifications: firebaseNotifications } = Firebase

export interface NotificationTypes {
  BEDTIME_APPROACH: Notification
  COACHING_INCOMPLETE_LESSON: Notification
  COACHING_REMIND_LESSONS_IN_WEEK: Notification
}

export interface UserInfo {
  id: string
}

export type androidImportanceType = typeof firebaseNotifications.Android.Importance.Max

export interface AndroidChannel {
  id: string
  name: string
  importance: androidImportanceType
}

export interface AndroidChannels {
  BEDTIME: AndroidChannel
  COACHING: AndroidChannel
}

export interface NotificationObject {
  id: string
  title: string
  body: string
  channelID: string
  smallIcon: string
  largeIcon: string
  userInfo: UserInfo
}

export const androidChannels: AndroidChannels = {
  BEDTIME: {
    id: 'bedtimeChannel',
    name: 'Bedtime Channel',
    importance: firebaseNotifications.Android.Importance.Max
  },
  COACHING: {
    id: 'coachingChannel',
    name: 'Coaching Channel',
    importance: firebaseNotifications.Android.Importance.Max
  }
}

export const BEDTIME_APPROACH: NotificationObject = {
  id: 'bedtimeApproach',
  title: 'Get ready for bed',
  body:
    'Your bedtime window is approaching. Your bedtime window signals you when it will be the easiest for you to fall asleep',
  channelID: androidChannels.BEDTIME.id,
  smallIcon: 'ic_stat_adb', // Need a proper small icon. This is for development only!
  largeIcon: 'ic_stat_ac_unit', // Need a proper large icon. This is for development only!
  userInfo: {
    id: 'bedtimeApproach'
  }
}

export const COACHING_INCOMPLETE_LESSON: NotificationObject = {
  id: 'coachingIncompleteLesson',
  title: translate('INCOMPLETE_LESSON_NOTIFICATION.TITLE'),
  body: translate('INCOMPLETE_LESSON_NOTIFICATION.BODY'),
  channelID: androidChannels.COACHING.id,
  smallIcon: 'ic_stat_adb',
  largeIcon: 'ic_stat_ac_unit',
  userInfo: {
    id: 'coachingIncompleteLesson'
  }
}

export const COACHING_REMIND_LESSONS_IN_WEEK: NotificationObject = {
  id: 'coachingRemindLessonsInWeek',
  title: translate('LESSONS_IN_WEEK_NOTIFICATION.TITLE'),
  body: translate('LESSONS_IN_WEEK_NOTIFICATION.BODY'),
  channelID: androidChannels.COACHING.id,
  smallIcon: 'ic_stat_adb',
  largeIcon: 'ic_stat_ac_unit',
  userInfo: {
    id: 'coachingRemindLessonsInWeek'
  }
}
