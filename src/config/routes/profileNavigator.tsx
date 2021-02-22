import React, { FC } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import ProfileScreen from '../../screens/profile/profile'

const Stack = createNativeStackNavigator()

const ProfileNavigator: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

export default ProfileNavigator
