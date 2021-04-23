import { CreateNightInput } from '@API'
import { createNight } from '@graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { convertNightValue } from '@helpers/sleep/sleep-data-helper'

type State = {
  loading: 'idle' | 'pending'
  lastSync: string | undefined
}

const initialState: State = {
  lastSync: undefined,
  loading: 'idle'
}

type Response = void

type Arguments = {
  nights: Array<Night>
}

export const syncNights = createAsyncThunk<Response, Arguments>(
  'nights/sync',
  async ({ nights }, { rejectWithValue, dispatch, getState }) => {
    const input: CreateNightInput = {
      id,
      sourceId,
      sourceName,
      startDate,
      endDate,
      value: convertNightValue(value),
      userId: username,
      totalDuration
    }
    const _ = await API.graphql(graphqlOperation(createNight, { input }))

    try {
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

const syncSlice = createSlice({
  name: 'syncSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(syncNights.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.lastSync = new Date().toISOString()
    })
    builder.addCase(syncNights.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(syncNights.rejected, (state) => {
      state.loading = 'idle'
    })
  }
})

export default syncSlice.reducer

// export const syncNightsToCloud = (nights: Night[]): AppThunk => async (
//     _,
//     getState
//   ) => {
//     try {
//       const username = getUsername(getState())
//       const loggedIn = getAuthState(getState())
//       if (loggedIn && username) {
//         const promises: Promise<void>[] = []
//         nights.forEach((night) => {
//           promises.push(syncNight(username, night))
//         })

//         await Promise.all(promises)
//       }
//     } catch (err) {
//       Sentry.captureException(`syncNightsToCloud ${err}`)
//     }
//   }

//   const syncNight = async (username: string, night: Night) => {
//     const {
//       id,
//       sourceId,
//       sourceName,
//       totalDuration,
//       endDate,
//       startDate,
//       value
//     } = night
//     try {
//       const input: CreateNightInput = {
//         id,
//         sourceId,
//         sourceName,
//         startDate,
//         endDate,
//         value: convertNightValue(value),
//         userId: username,
//         totalDuration
//       }

//       const _ = await API.graphql(graphqlOperation(createNight, { input }))
//     } catch (err) {
//       Sentry.captureException(`syncNightsToCloud ${err}`)
//     }
//   }
