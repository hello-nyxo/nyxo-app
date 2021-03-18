import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type Source =
  | 'health-kit'
  | 'google-fit'
  | 'fitbit'
  | 'polar'
  | 'garmin'
  | 'withings'
  | 'oura'

type State = {
  source: Source | undefined
  subSource: SubSource | undefined
}

export type SubSource = {
  sourceName: string
  sourceId: string
}

const initialState: State = {
  source: undefined,
  subSource: undefined
}

const sourceSlice = createSlice({
  name: 'sourceSlice',
  initialState,
  reducers: {
    setSource: (state, action: PayloadAction<Source>) => {
      state.source = action.payload
    },
    setSubSource: (state, action: PayloadAction<SubSource>) => {
      state.subSource = action.payload
    }
  }
})

export const { setSource, setSubSource } = sourceSlice.actions

export default sourceSlice.reducer
