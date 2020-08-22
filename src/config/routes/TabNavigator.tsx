import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteConfig, RouteProp, ParamListBase } from '@react-navigation/native'
import * as React from 'react'
import { useSelector } from 'react-redux'
import SCTabBarIcon, { TabBarIconProps } from '../../components/TabBarIcon'
import TabBarLabel from '../../components/TabBarLabel'
import { getIntercomNotificationCount } from '../../store/Selectors/NotificationSelectors'
import CircleNavigator from './JournalNavigator'
import CoachingNavigator from './coachingNavigator'
import ProfileNavigator from './profileNavigator'
import SettingsNavigator from './settingsNavigator'
import ROUTE from './Routes'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const intercomNotifications = useSelector(getIntercomNotificationCount)

  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        tabBarLabel: ({ focused, tintColor }: TabBarIconProps) => {
          return (
            <TabBarLabel
              children={route.name}
              focused={focused}
              tintColor={tintColor}
            />
          )
        },
        tabBarIcon: ({ focused, tintColor }: TabBarIconProps) => {
          return (
            <SCTabBarIcon
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
      })}
      tabBarOptions={{
        inactiveTintColor: 'gray'
      }}>
      <Tab.Screen name={ROUTE.JOURNAL} component={CircleNavigator} />
      <Tab.Screen
        name={ROUTE.COACHING}
        component={CoachingNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route)
        })}
      />
      <Tab.Screen name={ROUTE.PROFILE} component={ProfileNavigator} />
      <Tab.Screen name={ROUTE.SETTINGS} component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

const getTabBarVisible = (route: RouteProp<ParamListBase, RouteName>) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : ROUTE.COACHING
  switch (routeName) {
    case ROUTE.COACHING:
      return true
    case ROUTE.WEEK:
      return false
    case ROUTE.LESSON:
      return false
  }
}

export default TabNavigator
