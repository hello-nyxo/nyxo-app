import { createSlice } from '@reduxjs/toolkit'

type State = {
  introductionCompleted: boolean
}

const initialState: State = {
  introductionCompleted: false
}

const onboardingSlice = createSlice({
  name: 'onboardingSlice',
  initialState,
  reducers: {
    toggleIntroductionCompleted: (state, action) => {
      state.introductionCompleted = action.payload
    }
  }
})

export const { toggleIntroductionCompleted } = onboardingSlice.actions

export default onboardingSlice.reducer
