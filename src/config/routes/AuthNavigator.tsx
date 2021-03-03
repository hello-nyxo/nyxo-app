import React, { FC } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import Login from '@screens/auth/LoginScreen'
import Register from '@screens/auth/RegisterScreen'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator()

const AuthNavigator: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ROUTE.REGISTER}
      options={{ headerShown: false }}
      component={Register}
    />
    <Stack.Screen
      name={ROUTE.LOGIN}
      options={{ headerShown: false }}
      component={Login}
    />

    {/* <Stack.Screen
      name={ROUTE.RECOVER}
      options={{ headerShown: false }}
      component={ForgotPassword}
    /> */}
  </Stack.Navigator>
)

export default AuthNavigator
