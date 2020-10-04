import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { RootStackParamList } from '@typings/navigation/navigation'
import LessonView from '../../screens/coaching/LessonView'
import PurchaseView from '../../screens/coaching/PurchaseView'
import CoachingWeek from '../../screens/coaching/WeekView'
import Welcome from '../../screens/Terveystalo/Welcome'
import AuthNavigator from './AuthNavigator'
import ROUTE from './Routes'
import TabNavigator from './TabNavigator'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const Root = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ROUTE.APP}
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <RootStack.Screen
        name={ROUTE.AUTH}
        options={{ headerShown: false }}
        component={AuthNavigator}
      />
      <RootStack.Screen
        name={ROUTE.WEEK}
        component={CoachingWeek}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.LESSON}
        component={LessonView}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.PURCHASE}
        component={PurchaseView}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.TERVEYSTALO}
        component={Welcome}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  )
}

export default Root
