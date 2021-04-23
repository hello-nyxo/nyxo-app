import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import LessonView from '@screens/coaching/LessonView'
import CoachingWeek from '@screens/coaching/WeekScreen'
import { Onboarding } from '@screens/onboarding/Onboarding'
import { PurchaseScreen } from '@screens/onboarding/PurchaseScreen'
import Welcome from '@screens/Terveystalo/Welcome'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

const RootStack = createStackNavigator<RootStackParamList>()

const Root: FC = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="App"
      options={{ headerShown: false }}
      component={TabNavigator}
    />
    <RootStack.Screen
      name="Auth"
      options={{ headerShown: false }}
      component={AuthNavigator}
    />
    <RootStack.Screen
      name="Week"
      component={CoachingWeek}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="Lesson"
      component={LessonView}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="Purchase"
      component={PurchaseScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="Terveystalo"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="Onboarding"
      component={Onboarding}
      options={{
        headerShown: false,
        ...TransitionPresets.ModalTransition
      }}
    />
  </RootStack.Navigator>
)

export default Root
