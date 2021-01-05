import { Week } from '@components/app-clip/Week'
import { Welcome } from '@components/app-clip/Welcome'
import React, { FC } from 'react'
import { View } from 'react-native'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

enableScreens()
const Stack = createNativeStackNavigator()

export const AppClip: FC = () => {
  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: 'red' }}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Week" component={Week} />
      </Stack.Navigator>
    </View>
  )
}
