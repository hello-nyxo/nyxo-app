import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Coaching from '../../screens/coaching/CoachingView'
import HabitView from '../../screens/Shared/HabitView'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator()

const CoachingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE.COACHING}
        component={Coaching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.HABITS}
        component={HabitView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CoachingNavigator
