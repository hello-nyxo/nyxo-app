import React from 'react'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { StyleProps } from 'styles/themes'
import { useDispatch, useSelector } from 'react-redux'
import { getDateTimeNoteModal } from 'store/Selectors/ModalSelectors'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { toggleDateTimeNoteModal } from 'store/actions/modal/modal-actions'
import { DatePicker } from 'react-native-wheel-picker-android'
import moment from 'moment'
import TranslatedText from 'components/TranslatedText'

interface Props {
  onChangeDate: Function
  onChangeDateTime: Function
  dateTime: string
}

const DateTimeModal = (props: Props) => {
  const isVisible = useSelector(getDateTimeNoteModal)
  const dispatch = useDispatch()
  const { onChangeDate, dateTime, onChangeDateTime } = props

  const onPress = () => {
    dispatch(toggleDateTimeNoteModal())
  }

  const onDateChange = (d: Date) => {
    const m = moment(d)
    onChangeDate(
      m.set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString()
    )
    onChangeDateTime(d.toISOString())
  }

  const returnToToday = () => {
    const m1 = moment()
    const m2 = moment()
    onChangeDate(
      m1
        .set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        .toISOString()
    )
    onChangeDateTime(m2.toISOString())
  }

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0, justifyContent: 'flex-end', flex: 1 }}>
      <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
        <GrayedContainer />
      </TouchableWithoutFeedback>
      <Container>
        <TouchableOpacity onPress={returnToToday}>
          <ReturnToTodayText>NIGHT_NOTE.RETURN_TO_TODAY</ReturnToTodayText>
        </TouchableOpacity>
        <DatePicker
          onDateChange={onDateChange}
          date={new Date(dateTime)}
          minuteInterval={1}
        />
      </Container>
    </Modal>
  )
}

export default DateTimeModal

const Container = styled.View<StyleProps>`
  background-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
  height: 300px;
  padding: 20px 0px;
`
const GrayedContainer = styled.View`
  flex-grow: 1;
`

const ReturnToTodayText = styled(TranslatedText)<StyleProps>`
  margin: 0px 20px 10px 20px;
  color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  font-size: 18px;
`
