import TabBarIcon from '@components/TabBarIcon'
import TabBarLabel from '@components/TabBarLabel'
import { BlurView } from 'expo-blur'
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import CoachingNavigator from './coachingNavigator'
import SleepNavigator from './SleepNavigator'
import ProfileNavigator from './profileNavigator'
import SettingsNavigator from './settingsNavigator'

const Tab = createBottomTabNavigator<RootStackParamList['App']>()

const TabBar: FC<BottomTabBarProps> = (props) => {
  const theme = useTheme()

  return (
    <View style={styles.tabBarContainer}>
      <BlurView
        intensity={100}
        tint={theme === 'dark' ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <BottomTabBar {...props} />
    </View>
  )
}

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0
        },
        tabBarLabel: ({ focused, color }) => (
          <TabBarLabel
            label={`TAB.${route.name.toUpperCase()}`}
            focused={focused}
            tintColor={color}
          />
        ),
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon
            routeName={route.name}
            focused={focused}
            tintColor={color}
          />
        )
      })}>
      <Tab.Screen name="Sleep" component={SleepNavigator} />
      <Tab.Screen name="Coaching" component={CoachingNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})
