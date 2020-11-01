import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate } from '@actions/calendar-actions/calendar-actions'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { startOfDay } from 'date-fns'

type Calendar = {
  selectedDate: string
  selectDate: (date: Date) => void
}

const useCalendar = (): Calendar => {
  const dispatch = useDispatch()
  const selectedDate = useSelector(getSelectedDate)

  const selectDate = (date: Date) => {
    dispatch(setSelectedDate(startOfDay(date).toISOString()))
  }

  return {
    selectDate,
    selectedDate
  }
}

export default useCalendar
