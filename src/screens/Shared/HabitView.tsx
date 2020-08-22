import React, { memo } from 'react'
import { SectionList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import {
  getActiveHabits,
  getArchivedHabits
} from 'store/Selectors/habit-selectors/habit-selectors'
import { Habit } from 'Types/State/habit-state'
import GoBack, { GoBackContainer } from '../../components/Buttons/GoBack'
import CoachingSectionHeader from '../../components/CoachingSpecific/CoachingSectionHeader'
import EmptyState from '../../components/EmptyState'
import HabitCard from '../../components/HabitCard/HabitCard'
import EditHabitModal from '../../components/modals/HabitModal/EditHabitModal'
import {
  Container,
  H1,
  P,
  SafeAreaView
} from '../../components/Primitives/Primitives'
import keyExtractor from '../../helpers/KeyExtractor'

const HabitView = () => {
  const activeHabits = useSelector(getActiveHabits)
  const archivedHabits = useSelector(getArchivedHabits)

  const renderItem = ({ item }: { item: Habit }) => {
    return <HabitCard key={item.id} habit={item} />
  }

  const sections = [
    { title: 'HABIT.ACTIVE', data: activeHabits },
    { title: 'HABIT.ARCHIVED', data: archivedHabits }
  ]

  const habitKeyExtractor = (item: Habit, index: number) => {
    return item.id
  }

  return (
    <SafeAreaView>
      <SectionList
        ListHeaderComponent={() => (
          <>
            <GoBackContainer>
              <GoBack />
            </GoBackContainer>
            <Container>
              <H1 adjustsFontSizeToFit>HABIT.HABIT_TITLE</H1>
              <P>HABIT.EXPLANATION_1</P>
              <P>HABIT.EXPLANATION_2</P>
            </Container>
          </>
        )}
        renderSectionHeader={({ section: { title, data } }) => (
          <CoachingSectionHeader data={data} title={title} />
        )}
        sections={sections}
        ListEmptyComponent={<EmptyState />}
        renderItem={renderItem}
        keyExtractor={habitKeyExtractor}
      />

      <EditHabitModal />
    </SafeAreaView>
  )
}

export default HabitView
