import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Night} from '../views/Night';
import {PathConfigMap} from '@react-navigation/native';
import {TabNavigator, tabNavigatorLinkingConfig} from './TabStack';

export type AppParams = {
  Main: undefined;
  Night: {
    start: Date;
    end: Date;
  };
};

const Stack = createNativeStackNavigator<AppParams>();

export const AppLinking: PathConfigMap<AppParams> = {
  Main: {
    screens: tabNavigatorLinkingConfig,
  },
};

export const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={TabNavigator}
      />
      <Stack.Screen name="Night" component={Night} />
    </Stack.Navigator>
  );
};
