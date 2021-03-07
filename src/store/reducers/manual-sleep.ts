import { createSlice } from '@reduxjs/toolkit'

type State = {
  editMode: boolean
  startTime?: { h: number; m: number }
  endTime?: { h: number; m: number }
}

const initialState: State = {
  editMode: false
}

const manualSleepSlice = createSlice({
  name: 'manualSleepSlice',
  initialState,
  reducers: {
    toggleEditMode: (state, action) => {
      state.editMode = action.payload
    },
    setSleep: (state, action) => {
      state.startTime = action.payload
      state.endTime = action.payload
    }
  }
})

export const { toggleEditMode, setSleep } = manualSleepSlice.actions

export default manualSleepSlice.reducer
