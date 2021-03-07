import { createSlice } from '@reduxjs/toolkit'

type State = {
  source:
    | 'health-kit'
    | 'google-fit'
    | 'fitbit'
    | 'garming'
    | 'withings'
    | 'oura'
    | undefined
}

const initialState: State = {
  source: undefined
}

const sourceSlice = createSlice({
  name: 'sourceSlice',
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload
    }
  }
})

export const { setSource } = sourceSlice.actions

export default sourceSlice.reducer
