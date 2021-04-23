import { editHabit as editHabitThunk } from '@actions/habit/habit-actions'
import { HabitSchema } from '@config/validation'
import { revertLineBreaks } from '@helpers/habits'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { toggleEditHabitModal } from '@reducers/modal'
import { getDraftEditHabit } from '@selectors/habit-selectors/habit-selectors'
import { Habit } from '@typings/state/habit-state'
import { Period } from '@typings/state/Periods'
import { Formik, FormikValues } from 'formik'
import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import HabitModalFieldSection from './HabitModalFieldSection'
import HabitModalStreak from './HabitModalStreak'
import HabitModalTimeSection from './HabitModalTimeSection'
import HabitModalTopRow from './HabitModalTopRow'
import { descriptionMaxLength, titleMaxLength } from './NewHabitModal'

const EditHabitModal = () => {
  const show = useAppSelector(({ modal }) => modal.editHabit)
  const habit = useAppSelector(getDraftEditHabit)
  const dispatch = useAppDispatch()

  if (!habit) return null

  const {
    title = '',
    description = '',
    period = Period.morning,
    dayStreak = 0,
    longestDayStreak = 0
  } = habit

  const closeModal = () => {
    dispatch(toggleEditHabitModal(false))
  }

  const submitHabitChange = ({
    title: newTitle,
    description: newDescription,
    period: newPeriod
  }: FormikValues) => {
    dispatch(
      editHabitThunk(newTitle, newDescription, newPeriod, habit as Habit)
    )
    dispatch(toggleEditHabitModal(false))
  }

  return (
    <StyledModal
      hideModalContentWhileAnimating
      isVisible={show}
      useNativeDriver>
      <Formik
        validateOnMount
        initialValues={{
          title,
          description,
          period
        }}
        validationSchema={HabitSchema}
        onSubmit={submitHabitChange}>
        {({ handleChange, handleSubmit, handleBlur, values, isValid }) => (
          <>
            <Container>
              <HabitModalTopRow
                closeModal={closeModal}
                saveModal={handleSubmit}
                isValid={isValid}
                formattedTitle={title}
              />
              <ScrollView>
                <HabitModalStreak
                  dayStreak={dayStreak}
                  longestDayStreak={longestDayStreak}
                />
                <HabitModalFieldSection
                  handleChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  indicatorText="HABIT.TITLE_FIELD_INDICATOR"
                  placeholder="HABIT.TITLE_PLACEHOLDER"
                  inputMaxLength={titleMaxLength}
                  value={values.title}
                  isTitle
                />

                <HabitModalFieldSection
                  handleChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  indicatorText="HABIT.DESCRIPTION_FIELD_INDICATOR"
                  placeholder="HABIT.DESCRIPTION_PLACEHOLDER"
                  inputMaxLength={descriptionMaxLength}
                  value={revertLineBreaks(values.description)}
                  isTitle={false}
                />

                <HabitModalTimeSection
                  period={values.period}
                  setPeriod={handleChange('period')}
                />
              </ScrollView>
            </Container>
          </>
        )}
      </Formik>
    </StyledModal>
  )
}

export default memo(EditHabitModal)

const StyledModal = styled(Modal)`
  margin: 0px 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`

const Container = styled.SafeAreaView`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex: 1;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  justify-content: space-between;
`
