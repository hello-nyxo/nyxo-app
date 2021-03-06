import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

type State = {
  theme: Theme
}

const themeSlice: CaseReducer<State, PayloadAction<string>> = createSlice({
  name: 'themeSlice',
  initialState: {
    theme: 'light',
    followSystemTheme: false
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleUseSystemTheme: (state, action) => {
      state.followSystemTheme = action.payload
    }
  }
})

export const { toggleTheme, setAccessToken } = themeSlice.actions

export default themeSlice.reducer
