import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import CoachingIntroduction from '@screens/coaching/CoachingIntroduction'
import Coaching from '@screens/coaching/CoachingView'
import ROUTE from './Routes'

const Stack = createStackNavigator()

const CoachingNavigator: FC = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name={ROUTE.COACHING}
        component={Coaching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.COACHING_INTRODUCTION}
        component={CoachingIntroduction}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CoachingNavigator
