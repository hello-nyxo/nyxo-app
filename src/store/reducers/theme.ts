import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    toggleTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    toggleUseSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.followSystemTheme = action.payload
    }
  }
})

export const { toggleTheme, toggleUseSystemTheme } = themeSlice.actions

export default themeSlice.reducer
