import { createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

type State = {
  selectedDay: string
}

const initialState: State = {
  selectedDay: new Date().toISOString()
}

const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload
    }
  }
})

export const { setSelectedDay } = calendarSlice.actions

export default calendarSlice.reducer

export const getSelectedDate = createSelector(
  (state: RootState) => state.calendar.selectedDay,
  (date) => date
)
