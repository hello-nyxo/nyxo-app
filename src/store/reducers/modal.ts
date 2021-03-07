import { createSlice } from '@reduxjs/toolkit'

type State = {
  rating: boolean
  subscription: boolean
  newHabit: boolean
  editHabit: boolean
  explanations: boolean
  calendar: boolean
}

const initialState: State = {
  rating: false,
  subscription: false,
  newHabit: false,
  editHabit: false,
  explanations: false,
  calendar: false
}

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    toggleRatingModal: (state, action) => {
      state.rating = action.payload.value
    },
    toggleExplanationsModal: (state, action) => {
      state.explanations = action.payload.value
    },
    toggleCalendarModal: (state, action) => {
      state.calendar = action.payload.value
    },
    toggleEditHabitModal: (state, action) => {
      state.editHabit = action.payload.value
    },
    toggleNewHabitModal: (state, action) => {
      state.newHabit = action.payload.value
    }
  }
})

export const {
  toggleRatingModal,
  toggleExplanationsModal,
  toggleCalendarModal,
  toggleEditHabitModal,
  toggleNewHabitModal
} = modalSlice.actions

export default modalSlice.reducer
