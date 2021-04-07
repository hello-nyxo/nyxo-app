import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type Source =
  | 'health-kit'
  | 'google-fit'
  | 'fitbit'
  | 'polar'
  | 'garmin'
  | 'withings'
  | 'oura'
  | undefined

type State = {
  source: Source | undefined
  subSource: SubSource | undefined

  subSources: Array<SubSource>
}

export type SubSource = {
  sourceName: string
  sourceId: string
}

const initialState: State = {
  source: undefined,
  subSource: undefined,

  subSources: []
}

const sourceSlice = createSlice({
  name: 'sourceSlice',
  initialState,
  reducers: {
    setSource: (state, action: PayloadAction<Source | undefined>) => {
      state.source = action.payload
    },
    setSubSource: (state, action: PayloadAction<SubSource | undefined>) => {
      state.subSource = action.payload
    }
  }
})

export const { setSource, setSubSource } = sourceSlice.actions

export default sourceSlice.reducer
