import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import firebase from 'react-native-firebase'
import { NotificationOpen } from 'react-native-firebase/notifications'
import {
  COACHING_INCOMPLETE_LESSON,
  COACHING_REMIND_LESSONS_IN_WEEK
} from '../config/PushNotifications'

function useNotificationEventHandlers() {
  const navigation = useNavigation()

  const handler = (notificationResponse: any) => {
    let notificationId = ''
    if (Platform.OS === 'android') {
      notificationId = (<NotificationOpen>notificationResponse).notification
        .notificationId
    } else if (Platform.OS === 'ios') {
      notificationId = notificationResponse.notification.data.id
    }

    handleNavigation(notificationId)
  }

  // Navigate to the notified lesson or week when opening the notification
  const handleNavigation = (notificationId: string) => {
    if (notificationId === COACHING_REMIND_LESSONS_IN_WEEK.id) {
      navigation.navigate('Coaching')
    } else if (notificationId === COACHING_INCOMPLETE_LESSON.id) {
      navigation.navigate('Coaching')
      // navigation.navigate("LessonView", {}); TODO DISABLING FOR NOW BECAUSE THIS WOULD BREAK THE NAVIGATION
    }
  }

  useEffect(() => {
    const notificationListener = firebase
      .notifications()
      .onNotificationOpened(handler)

    PushNotificationIOS.addEventListener('localNotification', handler)

    return () => {
      notificationListener()
      PushNotificationIOS.removeEventListener('localNotification', handler)
    }
  }, [])
}

export default useNotificationEventHandlers
