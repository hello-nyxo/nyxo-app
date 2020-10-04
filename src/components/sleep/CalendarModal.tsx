import { toggleCalendarModal } from '@actions/modal/modal-actions'
import { getCalendarModal } from '@selectors/ModalSelectors'
import React, { FC, useMemo } from 'react'
import {
  Calendar,
  DateCallbackHandler,
  CalendarProps
} from 'react-native-calendars'
import Modal, { ReactNativeModal } from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { fetchSleepData } from '@actions/sleep/sleep-data-actions'
import { startOfDay, format, subDays, subYears, endOfDay } from 'date-fns'
import useCalendar from '@hooks/calendar'
import colors from '@styles/colors'

const minDate = subYears(new Date(), 3)

const CalendarModal: FC = () => {
  const isVisible = useSelector(getCalendarModal)
  const dispatch = useDispatch()
  const { selectedDate, selectDate } = useCalendar()

  const onDayPress: DateCallbackHandler = async ({ timestamp }) => {
    selectDate(new Date(timestamp))
    const startDate = startOfDay(subDays(timestamp, 1)).toISOString()
    const endDate = endOfDay(timestamp).toISOString()
    dispatch(fetchSleepData(startDate, endDate))
  }

  const toggleModal = () => {
    dispatch(toggleCalendarModal())
  }

  const { markedDates } = useMemo(
    () => ({
      markedDates: {
        [format(new Date(selectedDate), 'yyyy-MM-dd')]: {
          selected: true
        }
      }
    }),
    [selectedDate]
  )

  const getMonthData: DateCallbackHandler = ({ month, year }) => {
    console.log(
      'getMonthData',
      new Date(year, month - 1, 1).toISOString(),
      new Date(year, month, 0).toISOString()
    )
    dispatch(
      fetchSleepData(
        new Date(year, month - 1, 1).toISOString(),
        new Date(year, month - 1, 0).toISOString()
      )
    )
  }

  return (
    <StyledModal
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      isVisible={isVisible}
      useNativeDriver={false}
      onBackdropPress={toggleModal}>
      <Container>
        <ThemedCalendar
          onMonthChange={getMonthData}
          hideExtraDays
          minDate={minDate}
          markedDates={markedDates}
          showWeekNumbers
          maxDate={new Date()}
          enableSwipeMonths
          onDayPress={onDayPress}
        />
      </Container>
    </StyledModal>
  )
}

export default CalendarModal

const StyledModal = styled(Modal)<ReactNativeModal>`
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
    selectedDayBackgroundColor: theme.PRIMARY_BUTTON_COLOR,
    selectedDayTextColor: '#ffffff',
    todayTextColor: theme.PRIMARY_BUTTON_COLOR,
    dayTextColor: theme.SECONDARY_TEXT_COLOR,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: theme.PRIMARY_BUTTON_COLOR,
    disabledArrowColor: theme.SECONDARY_BACKGROUND_COLOR,
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
}))<CalendarProps>`
  height: 350px;
`
