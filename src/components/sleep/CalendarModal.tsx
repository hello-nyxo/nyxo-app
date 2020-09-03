import React, { FC } from 'react'
import { Calendar, DateObject } from 'react-native-calendars'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import colors from 'styles/colors'

const CalendarModal: FC = () => {
  const onDayPress = ({ timeStamp }: DateObject) => {}

  return (
    <StyledModal
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      isVisible={false}
      useNativeDriver={false}
      onBackdropPress={() => {}}>
      <Container>
        <ThemedCalendar onDayPress={onDayPress} enableSwipeMonths={true} />
      </Container>
    </StyledModal>
  )
}

export default CalendarModal

const StyledModal = styled(Modal)`
  margin: 0px 0px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0px;
  justify-content: flex-end;
`

const Container = styled.View`
  justify-content: space-between;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

export const ThemedCalendar = styled(Calendar).attrs(({ theme }) => ({
  theme: {
    backgroundColor: theme.SECONDARY_BACKGROUND_COLOR,
    calendarBackground: theme.SECONDARY_BACKGROUND_COLOR,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: theme.PRIMARY_BUTTON_COLOR,
    dayTextColor: theme.SECONDARY_TEXT_COLOR,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'red',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: theme.SECONDARY_TEXT_COLOR,
    indicatorColor: 'blue',
    textDayFontFamily: theme.FONT_MEDIUM,
    textMonthFontFamily: theme.FONT_MEDIUM,
    textDayHeaderFontFamily: theme.FONT_MEDIUM,
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }
}))`
  height: 350px;
`
