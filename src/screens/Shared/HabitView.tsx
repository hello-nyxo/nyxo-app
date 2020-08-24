import CoachingSectionHeader from '@components/CoachingSpecific/CoachingSectionHeader'
import EmptyState from '@components/EmptyState'
import HabitCard from '@components/HabitCard/HabitCard'
import { IconBold } from '@components/iconRegular'
import EditHabitModal from '@components/modals/HabitModal/EditHabitModal'
import {
  Container,
  P,
  PageTitle,
  SafeAreaView
} from '@components/Primitives/Primitives'
import {
  getActiveHabits,
  getArchivedHabits
} from '@selectors/habit-selectors/habit-selectors'
import TranslatedText from 'components/TranslatedText'
import React, { FC } from 'react'
import { SectionList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { fonts } from 'styles/themes'
import { Habit } from 'Types/State/habit-state'
import { toggleNewHabitModal } from '@actions/modal/modal-actions'
import NewHabitModal from 'components/modals/HabitModal/NewHabitModal'

const HabitView: FC = () => {
  const activeHabits = useSelector(getActiveHabits)
  const archivedHabits = useSelector(getArchivedHabits)
  const dispatch = useDispatch()

  const renderItem = ({ item }: { item: Habit }) => {
    return <HabitCard key={item.id} habit={item} />
  }

  const toggleModal = () => {
    dispatch(toggleNewHabitModal())
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
            <TitleRow>
              <PageTitle adjustsFontSizeToFit>HABIT.HABIT_TITLE</PageTitle>
              <NewHabitButton onPress={toggleModal}>
                <IconBold
                  width={20}
                  height={20}
                  name="circleAdd"
                  fill={colors.radiantBlue}
                />
              </NewHabitButton>
            </TitleRow>

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
      <NewHabitModal />
    </SafeAreaView>
  )
}

export default HabitView

const TitleRow = styled.View`
  padding-right: 20px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NewHabitButton = styled.TouchableOpacity`
  padding: 3px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`
