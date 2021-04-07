import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import CoachingIntroduction from '@screens/coaching/CoachingIntroduction'
import Coaching from '@screens/coaching/CoachingView'
import { RootStackParamList } from '@typings/navigation/navigation'

const Stack = createStackNavigator<RootStackParamList['App']['Coaching']>()

const CoachingNavigator: FC = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="CoachingScreen"
        component={Coaching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Introduction"
        component={CoachingIntroduction}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CoachingNavigator
