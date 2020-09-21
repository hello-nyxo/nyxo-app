import TranslatedText from 'components/TranslatedText'
import React from 'react'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { fonts } from 'styles/themes'
import DateTimeValue from './DateTimeValue'

export interface DateTimeTextProps {
  onChangeDate: Function
  onChangeDateTime: Function
  date: string
  dateTime: string
}

const DateTimeText = (props: DateTimeTextProps) => {
  const { onChangeDate, onChangeDateTime, dateTime, date } = props

  return (
    <Container>
      <DateTimeDescription>NIGHT_NOTE.DATE_TIME_TEXT</DateTimeDescription>

      <DateTimeValue
        onChangeDate={onChangeDate}
        onChangeDateTime={onChangeDateTime}
        date={date}
        dateTime={dateTime}
      />
    </Container>
  )
}

export default DateTimeText

const Container = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const DateTimeDescription = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${colors.radiantBlue};
`
