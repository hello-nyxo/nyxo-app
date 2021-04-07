import Login from '@screens/auth/LoginScreen'
import Register from '@screens/auth/RegisterScreen'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

const Stack = createNativeStackNavigator<RootStackParamList['Auth']>()

const AuthNavigator: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Register"
      options={{ headerShown: false }}
      component={Register}
    />
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={Login}
    />
  </Stack.Navigator>
)

export default AuthNavigator
