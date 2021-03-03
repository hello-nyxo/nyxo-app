import TabBarIcon, { TabBarIconProps } from '@components/TabBarIcon'
import TabBarLabel from '@components/TabBarLabel'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import Habits from '../../screens/Shared/HabitView'
import CoachingNavigator from './coachingNavigator'
import JournalNavigator from './JournalNavigator'
import ProfileNavigator from './profileNavigator'
import ROUTE from './Routes'
import SettingsNavigator from './settingsNavigator'

const Tab = createBottomTabNavigator<TabParamList>()

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: function tabBarLabel({
          focused,
          tintColor
        }: TabBarIconProps) {
          return (
            <TabBarLabel
              label={`TAB.${route.name.toUpperCase()}`}
              focused={focused}
              tintColor={tintColor}
            />
          )
        },
        tabBarIcon: function tabBarIcon({
          focused,
          tintColor
        }: TabBarIconProps) {
          return (
            <TabBarIcon
              routeName={route.name}
              focused={focused}
              tintColor={tintColor}
            />
          )
        }
      })}>
      <Tab.Screen name={ROUTE.JOURNAL} component={JournalNavigator} />
      <Tab.Screen name={ROUTE.COACHING} component={CoachingNavigator} />
      <Tab.Screen name={ROUTE.HABITS} component={Habits} />
      <Tab.Screen name={ROUTE.PROFILE} component={ProfileNavigator} />
      <Tab.Screen name={ROUTE.SETTINGS} component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator
