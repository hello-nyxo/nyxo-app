import { createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

type State = {
  theme: Theme
  followSystemTheme: boolean
}

const initialState: State = {
  theme: 'light',
  followSystemTheme: false
}

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleUseSystemTheme: (state, action) => {
      state.followSystemTheme = action.payload
    }
  }
})

export const { toggleTheme, toggleUseSystemTheme } = themeSlice.actions

export default themeSlice.reducer
