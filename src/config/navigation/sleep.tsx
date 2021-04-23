import Sleep from '@screens/sleep/SleepView'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

const Stack = createNativeStackNavigator<RootStackParamList['App']['Sleep']>()

const SleepNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
      <Stack.Screen
        name="Main"
        component={Sleep}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default SleepNavigator
