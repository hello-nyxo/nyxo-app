import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Timeline} from '../views/Timeline';
import {Night} from '../views/Night';

export type AppParams = {
  Main: undefined;
  Night: {
    start: Date;
    end: Date;
  };
};

const Stack = createNativeStackNavigator<AppParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Timeline} />
      <Stack.Screen name="Night" component={Night} />
    </Stack.Navigator>
  );
};
