import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CloudSettings from '@screens/settings/CloudSettings'
import CoachingSettings from '@screens/settings/CoachingSettings'
import GarminScreen from '@screens/settings/GarminScreen'
import ManageSubscription from '@screens/settings/ManageSubscription'
import NotificationSettings from '@screens/settings/Notifications'
import Settings from '@screens/settings/settings'
import SetSource from '@screens/settings/SourceSettings'
import React, { FC } from 'react'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator()

const SettingsNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.SOURCE_SETTINGS}
        component={SetSource}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CloudSettings"
        component={CloudSettings}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="CoachingSettings"
        component={CoachingSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageSubscription"
        component={ManageSubscription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Garmin"
        component={GarminScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default SettingsNavigator
