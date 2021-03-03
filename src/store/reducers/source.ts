import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    theme: 'light',
    followSystemTheme: true,
    accessToken: undefined
  },
  reducers: {
    toggleTheme: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  }
})

export const { toggleTheme, setAccessToken } = appSlice.actions

export default appSlice.reducer
