import TabBarIcon, { TabBarIconProps } from '@components/TabBarIcon'
import TabBarLabel from '@components/TabBarLabel'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { getIntercomNotificationCount } from '@selectors/NotificationSelectors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Habits from '../../screens/Shared/HabitView'
import CoachingNavigator from './coachingNavigator'
import JournalNavigator from './JournalNavigator'
import ProfileNavigator from './profileNavigator'
import ROUTE from './Routes'
import SettingsNavigator from './settingsNavigator'

const Tab = createBottomTabNavigator()

const TabNavigator: FC = () => {
  const intercomNotifications = useSelector(getIntercomNotificationCount)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, tintColor }: TabBarIconProps) => {
          return (
            <TabBarLabel
              label={`TAB.${route.name.toUpperCase()}`}
              focused={focused}
              tintColor={tintColor}
            />
          )
        },
        tabBarIcon: ({ focused, tintColor }: TabBarIconProps) => {
          return (
            <TabBarIcon
              badgeCount={
                route.name === ROUTE.SETTINGS
                  ? intercomNotifications
                  : undefined
              }
              routeName={route.name}
              focused={focused}
              tintColor={tintColor}
            />
          )
        }
      })}>
      <Tab.Screen name={ROUTE.JOURNAL} component={JournalNavigator} />
      <Tab.Screen
        name={ROUTE.COACHING}
        component={CoachingNavigator}
        // options={({ route }) => ({
        //   tabBarVisible: getTabBarVisible(route)
        // })}
      />
      <Tab.Screen name={ROUTE.HABITS} component={Habits} />
      <Tab.Screen name={ROUTE.PROFILE} component={ProfileNavigator} />
      <Tab.Screen name={ROUTE.SETTINGS} component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

const getTabBarVisible = (route: RouteProp<ParamListBase, RouteName>) => {
  // const routeName = route.state
  //   ? route.state.routes[route.state.index].name
  //   : ROUTE.COACHING
  // switch (routeName) {
  //   case ROUTE.COACHING:
  //     return true
  //   case ROUTE.WEEK:
  //     return false
  //   case ROUTE.LESSON:
  //     return false
  //   default:
  //     return true
  // }

  return true
}

export default TabNavigator
