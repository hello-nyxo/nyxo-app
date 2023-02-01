import Healthkit, {
  HKCategorySample,
  HKCategoryTypeIdentifier,
  HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {
  Button,
  RefreshControl,
  SectionList,
  SectionListRenderItem,
} from 'react-native';
import styled from 'styled-components/native';
import {SampleItem} from '../components/SampleItem';
import {SectionTitle} from '../components/SectionTitle';
import {useSleep} from '../hooks/useSleep';
import {AppParams} from '../navigation/RootStack';
import {createHeartRate, createSleep} from '../utils/healthkit';

type Props = {
  navigation: NativeStackNavigationProp<AppParams>;
};

export const Timeline = ({navigation}: Props) => {
  const sleep = useSleep();

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

  console.log(sleep.data);

  const renderItem: SectionListRenderItem<
    HKCategorySample<HKCategoryTypeIdentifier.sleepAnalysis>
  > = ({item}) => <SampleItem sample={item} navigation={navigation} />;

  return (
    <Container>
      <Button title="Request access" onPress={requestAccess} />
      <Button
        title="Create HR samples"
        onPress={() => createHeartRate(new Date().toDateString())}
      />
      <Button
        title="Create Sleep samples"
        onPress={() => createSleep(new Date().toDateString())}
      />
      <List
        refreshControl={
          <RefreshControl
            refreshing={sleep.isRefetching}
            onRefresh={() => sleep.refetch()}
          />
        }
        sections={sleep.data ?? []}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle title={title} />
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const List = styled(SectionList as new () => SectionList)`
  background-color: #f4f4f4;
`;
