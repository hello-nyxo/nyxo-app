import {
  HKCategorySample,
  HKCategoryTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import React from 'react';
import {RefreshControl, SectionList, SectionListRenderItem} from 'react-native';
import styled from 'styled-components/native';
import {SampleItem} from '../components/SampleItem';
import {SectionTitle} from '../components/SectionTitle';
import {useSleep} from '../hooks/useSleep';
import {TabScreenProps} from '../types/navigation';

export const Timeline = ({navigation}: TabScreenProps<'Timeline'>) => {
  const sleep = useSleep();

  console.log(sleep.data);

  const renderItem: SectionListRenderItem<
    HKCategorySample<HKCategoryTypeIdentifier.sleepAnalysis>
  > = ({item}) => <SampleItem sample={item} navigation={navigation} />;

  return (
    <Container>
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
