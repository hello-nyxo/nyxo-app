import Healthkit, {
  HKCategoryTypeIdentifier,
  HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import React from 'react';
import {ScrollView} from 'react-native';
import {TabScreenProps} from '../types/navigation';

export const Settings = ({}: TabScreenProps<'Settings'>) => {
  const requestAccess = () => {
    Healthkit.requestAuthorization(
      [
        HKCategoryTypeIdentifier.sleepAnalysis,
        HKQuantityTypeIdentifier.heartRate,
      ],
      [
        HKCategoryTypeIdentifier.sleepAnalysis,
        HKQuantityTypeIdentifier.heartRate,
      ],
    );
  };

  return <ScrollView />;
};
