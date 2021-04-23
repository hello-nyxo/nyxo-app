import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    toggleEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    setSleep: (
      state,
      action: PayloadAction<{
        startTime?: { h: number; m: number }
        endTime?: { h: number; m: number }
      }>
    ) => {
      state.startTime = action.payload.startTime
      state.endTime = action.payload.endTime
    }
  }
})

export const { toggleEditMode, setSleep } = manualSleepSlice.actions

export default manualSleepSlice.reducer
