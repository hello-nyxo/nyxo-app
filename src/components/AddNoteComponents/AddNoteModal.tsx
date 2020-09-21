import React, { useState } from 'react'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getAddNoteModal } from 'store/Selectors/ModalSelectors'
import HabitModalTopRow from 'components/modals/HabitModal/HabitModalTopRow'
import { fonts, StyleProps } from 'styles/themes'
import { toggleAddNoteModal } from 'store/actions/modal/modal-actions'
import DateTimeText from './DateTimeText'
import { Formik } from 'formik'
import translate from 'config/i18n'
import { ScrollView } from 'react-native'
import moment from 'moment'
import NoteTagsList from './NoteTagsList'
import AddedNoteTagsList from './AddedNoteTagsList'

const numberOfLines = 15

const AddNoteModal = () => {
  const isVisible = useSelector(getAddNoteModal)
  const dispatch = useDispatch()

  const [tags, setTags] = useState<string[]>([])

  const closeModal = () => {
    dispatch(toggleAddNoteModal())
  }

  const saveModal = () => {
    dispatch(toggleAddNoteModal())
  }

  const addTag = (key: string) => {
    setTags([...tags, key])
  }

  const removeTag = (key: string) => {
    const removedTagArray = tags.filter((tag) => tag !== key)
    setTags(removedTagArray)
  }

  return (
    <Modal
      isVisible={isVisible}
      style={{
        margin: 0
      }}>
      <Formik
        initialValues={{
          note: '',
          date: moment()
            .set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
            .toISOString(),
          dateTime: moment().toISOString()
        }}
        onSubmit={saveModal}>
        {({
          handleChange,
          values: { note, date, dateTime },
          isValid,
          handleSubmit
        }) => (
          <Container>
            <HabitModalTopRow
              closeModal={closeModal}
              isValid={isValid}
              saveModal={handleSubmit}
              titleValue={'NIGHT_NOTE.ADD_NOTE_TITLE'}
            />
            <ScrollView>
              <BodyContainer>
                <DateTimeText
                  onChangeDate={handleChange('date')}
                  onChangeDateTime={handleChange('dateTime')}
                  date={date}
                  dateTime={dateTime}
                />

                <InputField
                  maxLength={1000}
                  multiline
                  numberOfLines={numberOfLines}
                  value={note}
                  onChangeText={handleChange('note')}
                  placeholder={translate('NIGHT_NOTE.ADD_NOTE_PLACEHOLDER')}
                />

                <AddedNoteTagsList
                  addedTags={tags}
                  addTag={addTag}
                  removeTag={removeTag}
                />

                <NoteTagsList addTag={addTag} removeTag={removeTag} />
              </BodyContainer>
            </ScrollView>
          </Container>
        )}
      </Formik>
    </Modal>
  )
}

export default AddNoteModal

const Container = styled.SafeAreaView<StyleProps>`
  flex-grow: 1;
  background-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
`
const BodyContainer = styled.View`
  padding: 0px 20px;
`

const InputField = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.SECONDARY_TEXT_COLOR
}))<StyleProps>`
  margin-top: 30px;
  font-family: ${fonts.domine};
  font-size: 18px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  max-height: ${18 * numberOfLines}px;
  text-align-vertical: top;
`
