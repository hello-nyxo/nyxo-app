import { startOfDay } from 'date-fns'
import { setSelectedDay } from '@reducers/calendar'
import { useAppDispatch, useAppSelector } from './redux'

type Calendar = {
  selectedDate: string
  selectDate: (date: Date) => void
}

const useCalendar = (): Calendar => {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector((state) => state.calendar.selectedDay)

  const selectDate = (date: Date) => {
    dispatch(setSelectedDay(startOfDay(date).toISOString()))
  }

  return {
    selectDate,
    selectedDate
  }
}

export default useCalendar
