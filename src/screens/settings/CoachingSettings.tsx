import { resetCoaching } from '@actions/coaching/coaching-actions'
import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import React, { memo, FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import styled from 'styled-components/native'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import TextButton from '@components/Buttons/TextButton'
import {
  Container,
  H2,
  H3,
  P,
  SafeAreaView,
  ThemedRefreshControl
} from '@components/Primitives/Primitives'
import { useListCoaching } from 'hooks/coaching/useCoaching'
import { useNavigation } from '@react-navigation/core'
import { FlatList } from 'react-native'

const CoachingSettings: FC = () => {
  const { data: months, isLoading, refetch } = useListCoaching()
  const { navigate } = useNavigation()

  const renderItem = ({ item: coaching }) => (
    <CoachingMonthCard key={`${coaching?.id}`} month={coaching} />
  )

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <ThemedRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListHeaderComponent={() => (
          <>
            <GoBackContainer>
              <GoBack />
            </GoBackContainer>
            <Container>
              <H2>Coaching settings</H2>
            </Container>
          </>
        )}
        data={months}
        renderItem={renderItem}
      />
      {/* <P variables={{ coachingStage }}>CoachingResetText</P> */}
      {/* 
          <ResetButton center onPress={handleCoachingReset}>
            Reset coaching
          </ResetButton> */}

      {/* <ActiveContainer>
            {activeMonth && <H3>COACHING_SETTINGS.CURRENTLY_ACTIVE</H3>}
            {activeMonth && <CoachingMonthCard month={activeMonth} />}
          </ActiveContainer> */}

      {/* {coachingMonths && coachingMonths.length > 0 && (
            <H3>COACHING_SETTINGS.OTHER_COACHING_MONTHS</H3>
          )} */}
    </SafeAreaView>
  )
}

export default memo(CoachingSettings)
