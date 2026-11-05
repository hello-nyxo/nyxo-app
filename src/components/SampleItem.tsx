import {
  HKCategorySample,
  HKCategoryTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import {H3} from 'tamagui';
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
      <Title>Sleep</Title>
      <H3>{sleepValueMap[sample.value]}</H3>
      {/* <Paragraph>{sample.sourceRevision?.source.name}</Paragraph>
      <Paragraph>
        From: {formatRelative(sample.startDate, new Date())}
      </Paragraph>
      <Paragraph>To: {formatRelative(sample.endDate, new Date())}</Paragraph>
      <Paragraph>
        Avg HR: {hr.data?.averageQuantity?.quantity.toFixed(0)}
      </Paragraph>
      <Paragraph>Min HR: {hr.data?.minimumQuantity?.quantity}</Paragraph>
      <Paragraph>Max HR: {hr.data?.maximumQuantity?.quantity}</Paragraph> */}
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

const Title = styled.Text`
  font-family: 'Inter';
`;
