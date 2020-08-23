import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import NotificationCenter from 'screens/main/NotificationCenter'
import { JournalStackParamList } from 'Types/navigation/navigation'
import Main from '../../screens/main/main'
import Habits from '../../screens/Shared/HabitView'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator<JournalStackParamList>()

const JournalNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
      <Stack.Screen
        name={ROUTE.SLEEP}
        component={Main}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTE.HABITS}
        component={Habits}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.NOTIFICATION_CENTER}
        component={NotificationCenter}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default JournalNavigator
