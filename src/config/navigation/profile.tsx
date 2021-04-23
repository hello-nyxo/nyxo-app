import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import ProfileScreen from '../../screens/profile/profile'

const Stack = createNativeStackNavigator<RootStackParamList['App']['Profile']>()

const ProfileNavigator: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="User"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

export default ProfileNavigator
