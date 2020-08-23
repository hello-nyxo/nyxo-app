import React, { FC } from 'react'
import { SectionList } from 'react-native'
import { useSelector } from 'react-redux'
import {
  getActiveHabits,
  getArchivedHabits
} from 'store/Selectors/habit-selectors/habit-selectors'
import { Habit } from 'Types/State/habit-state'
import CoachingSectionHeader from '../../components/CoachingSpecific/CoachingSectionHeader'
import EmptyState from '../../components/EmptyState'
import HabitCard from '../../components/HabitCard/HabitCard'
import EditHabitModal from '../../components/modals/HabitModal/EditHabitModal'
import {
  Container,
  P,
  PageTitle,
  SafeAreaView
} from '../../components/Primitives/Primitives'

const HabitView: FC = () => {
  const activeHabits = useSelector(getActiveHabits)
  const archivedHabits = useSelector(getArchivedHabits)

  const renderItem = ({ item }: { item: Habit }) => {
    return <HabitCard key={item.id} habit={item} />
  }

  const sections = [
    { title: 'HABIT.ACTIVE', data: activeHabits },
    { title: 'HABIT.ARCHIVED', data: archivedHabits }
  ]

  const habitKeyExtractor = (item: Habit) => {
    return item.id
  }

  return (
    <SafeAreaView>
      <SectionList
        ListHeaderComponent={() => (
          <>
            <PageTitle adjustsFontSizeToFit>HABIT.HABIT_TITLE</PageTitle>
            <Container>
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
