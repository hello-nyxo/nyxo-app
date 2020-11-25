import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/Auth/LoginScreen'
import Register from '@screens/Auth/RegisterScreen'
import ConfirmUser from '@screens/Auth/ConfirmUser'
import ForgotPassword from '@screens/Auth/ForgotPasswordScreen'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
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
      <Stack.Screen
        name={ROUTE.CONFIRM}
        options={{ headerShown: false }}
        component={ConfirmUser}
      />
      <Stack.Screen
        name={ROUTE.RECOVER}
        options={{ headerShown: false }}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
