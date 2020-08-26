import { editHabit as editHabitThunk } from '@actions/habit/habit-actions'
import { toggleEditHabitModal } from '@actions/modal/modal-actions'
import { HabitSchema } from 'config/Validation'
import { Formik, FormikValues } from 'formik'
import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getDraftEditHabit } from 'store/Selectors/habit-selectors/habit-selectors'
import { getEditHabitModal } from 'store/Selectors/ModalSelectors'
import styled from 'styled-components/native'
import { Habit } from 'Types/State/habit-state'
import { Period } from 'Types/State/Periods'
import { StyleProps } from '../../../styles/themes'
import HabitModalFieldSection from './HabitModalFieldSection'
import HabitModalStreak from './HabitModalStreak'
import HabitModalTimeSection from './HabitModalTimeSection'
import HabitModalTopRow from './HabitModalTopRow'
import { descriptionMaxLength, titleMaxLength } from './NewHabitModal'
import { revertLineBreaks } from 'helpers/habits'

const EditHabitModal = () => {
  const show = useSelector(getEditHabitModal)
  const habit = useSelector(getDraftEditHabit)

  if (!habit) return null

  const {
    title = '',
    description = '',
    period = Period.morning,
    dayStreak = 0,
    longestDayStreak = 0
  } = habit
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(toggleEditHabitModal())
  }

  const submitHabitChange = ({
    title: newTitle,
    description: newDescription,
    period: newPeriod
  }: FormikValues) => {
    dispatch(
      editHabitThunk(newTitle, newDescription, newPeriod, habit as Habit)
    )
    dispatch(toggleEditHabitModal())
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

const Container = styled.SafeAreaView<StyleProps>`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex: 1;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  justify-content: space-between;
`
