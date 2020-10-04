import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Settings from '../../screens/settings/settings'
import SetSource from '../../screens/settings/SourceSettings'
import CloudSettings from '../../screens/settings/CloudSettings'
import NotificationSettings from '../../screens/settings/Notifications'
import ManageSubscription from '../../screens/settings/ManageSubscription'
import CoachingSettings from '../../screens/settings/CoachingSettings'
import DevelopmentMenu from '../../screens/settings/DevelopmentMenu'
import ROUTE from './Routes'
import GarminScreen from '@screens/settings/GarminScreen'
const Stack = createNativeStackNavigator()

const SettingsNavigator = () => {
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
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ headerShown: false }}
      />
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
        name="DevelopmentMenu"
        component={DevelopmentMenu}
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
