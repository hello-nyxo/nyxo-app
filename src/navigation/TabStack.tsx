import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PathConfigMap} from '@react-navigation/native';
import {Settings} from '../views/Settings';
import {Timeline} from '../views/Timeline';

export type TabStack = {
  Timeline: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabStack>();

export const tabNavigatorLinkingConfig: PathConfigMap<TabStack> = {};

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontFamily: 'Space Grotesk Light',
        fontSize: 20,
      },
      tabBarLabelStyle: {
        fontFamily: 'Space Grotesk SemiBold',
      },
    }}>
    <Tab.Screen name="Timeline" component={Timeline} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
