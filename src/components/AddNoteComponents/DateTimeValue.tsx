import React, { useState } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { fonts, StyleProps } from 'styles/themes'
import { useDispatch } from 'react-redux'
import { toggleDateTimeNoteModal } from 'store/actions/modal/modal-actions'
import DateTimeModal from './DateTimeModal'
import { ReturnNightNoteDateFormat } from 'helpers/sleep/night-note-helper'
import { DateTimeTextProps } from './DateTimeText'

const DateTimeValue = (props: DateTimeTextProps) => {
  const dispatch = useDispatch()
  const onPress = () => {
    dispatch(toggleDateTimeNoteModal())
  }

  const { dateTime, onChangeDate, onChangeDateTime } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <ValueText>{ReturnNightNoteDateFormat(dateTime)}</ValueText>
      </Container>

      <DateTimeModal
        onChangeDate={onChangeDate}
        dateTime={dateTime}
        onChangeDateTime={onChangeDateTime}
      />
    </TouchableOpacity>
  )
}

export default DateTimeValue

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`
const ValueText = styled.Text<StyleProps>`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${(props) => props.theme.SECONDARY_TEXT_COLOR};
`
