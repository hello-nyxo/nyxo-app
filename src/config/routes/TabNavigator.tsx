import TabBarIcon from '@components/TabBarIcon'
import TabBarLabel from '@components/TabBarLabel'
import { BlurView } from '@react-native-community/blur'
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import {
  BottomTabBarOptions,
  LabelPosition
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import CoachingNavigator from './coachingNavigator'
import SleepNavigator from './SleepNavigator'
import ProfileNavigator from './profileNavigator'
import SettingsNavigator from './settingsNavigator'

const Tab = createBottomTabNavigator<RootStackParamList['App']>()

const TabBar: FC<BottomTabBarProps<BottomTabBarOptions>> = (props) => (
  <BlurViewTabBar blurAmount={100}>
    <BottomTabBar {...props} />
  </BlurViewTabBar>
)

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      tabBarOptions={{
        tabStyle: {
          backgroundColor: 'transparent'
        },
        style: {
          backgroundColor: 'transparent'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: function tabBarLabel({
          focused,
          color
        }: {
          focused: boolean
          color: string
          position: LabelPosition
        }) {
          return (
            <TabBarLabel
              label={`TAB.${route.name.toUpperCase()}`}
              focused={focused}
              tintColor={color}
            />
          )
        },
        tabBarIcon: function tabBarIcon({
          focused,
          color
        }: {
          focused: boolean
          color: string
          size: number
        }) {
          return (
            <TabBarIcon
              routeName={route.name}
              focused={focused}
              tintColor={color}
            />
          )
        }
      })}>
      <Tab.Screen name="Sleep" component={SleepNavigator} />
      <Tab.Screen name="Coaching" component={CoachingNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const BlurViewTabBar = styled(BlurView).attrs(({ theme }) => ({
  blurType: theme.mode === 'dark' ? 'dark' : 'light',
  reducedTransparencyFallbackColor: theme.SECONDARY_BACKGROUND_COLOR
}))`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`
