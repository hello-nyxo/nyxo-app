import {
  HKCategorySample,
  HKCategoryTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatRelative} from 'date-fns';
import React from 'react';
import styled from 'styled-components/native';
import {useHRStatistics} from '../hooks/useHeartRate';
import {AppParams} from '../navigation/RootStack';

type Props = {
  sample: HKCategorySample<HKCategoryTypeIdentifier.sleepAnalysis>;
  navigation: NativeStackNavigationProp<AppParams>;
};

const sleepValueMap = {
  0: 'in bed',
  1: 'asleep',
  2: 'awake',
  3: 'core',
  4: 'deep',
  5: 'rem',
};

export const SampleItem = ({sample, navigation}: Props) => {
  const hr = useHRStatistics({from: sample.startDate, to: sample.endDate});

  console.log(hr.data?.maximumQuantity);

  const navigate = () => {
    navigation.navigate('Night', {
      start: sample.startDate,
      end: sample.endDate,
    });
  };

  return (
    <Container onPress={navigate}>
      <Text>{sleepValueMap[sample.value]}</Text>
      <Text>{sample.sourceRevision?.source.name}</Text>
      <Text>From: {formatRelative(sample.startDate, new Date())}</Text>
      <Text>To: {formatRelative(sample.endDate, new Date())}</Text>
      <Text>Avg HR: {hr.data?.averageQuantity?.quantity.toFixed(0)}</Text>
      <Text>Min HR: {hr.data?.minimumQuantity?.quantity}</Text>
      <Text>Max HR: {hr.data?.maximumQuantity?.quantity}</Text>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: white;
  margin: 8px;
  border-radius: 8px;
  box-shadow: 0px 3px 4px rgba(69, 69, 69, 0.08);
`;

const Text = styled.Text``;
