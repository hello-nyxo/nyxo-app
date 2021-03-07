import { createSlice } from '@reduxjs/toolkit'

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
