import { formatFitbitSamples } from '@helpers/sleep/fitbit-helper'
import { formatWithingsSamples } from '@helpers/sleep/withings-helper'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import { addNights } from './nights'

type State = {
  loading: 'idle' | 'pending'
}

const initialState: State = {
  loading: 'idle'
}

type Response = void

type Arguments = {
  startDate: string
  endDate: string
}

export const fetchWithings = createAsyncThunk<Response, Arguments>(
  'withings/fetch',
  async ({ startDate, endDate }, { rejectWithValue, dispatch }) => {
    try {
      const start = format(new Date(startDate), 'YYYY-MM-DD')
      const end = format(new Date(endDate), 'YYYY-MM-DD')
      const accessToken = undefined
      const dataFields = [
        'deepsleepduration',
        'durationtosleep',
        'durationtowakeup',
        'sleep_score',
        'snoring',
        'snoringepisodecount'
      ]

      const withingsApiCall = await fetch(
        // eslint-disable-next-line max-len
        `https://wbsapi.withings.net/v2/sleep?action=getsummary&startdateymd=${start}&enddateymd=${end}&data_fields=${dataFields.join(
          ','
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      const response = await withingsApiCall.json()
      dispatch(addNights(formatWithingsSamples(response.body.series)))
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

export const fetchFitbit = createAsyncThunk<Response, Arguments>(
  'fitbit/fetch',
  async ({ startDate, endDate }, { dispatch }) => {
    const start = format(new Date(startDate), 'YYYY-MM-DD')
    const end = format(new Date(endDate), 'YYYY-MM-DD')
    const accessToken = undefined

    const call = await fetch(
      `https://api.fitbit.com/1.2/user/${user_id}/sleep/date/${start}/${end}.json`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const { sleep } = await call.json()
    dispatch(addNights(formatFitbitSamples(sleep)))
  }
)

const sleepSlice = createSlice({
  name: 'sleepSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Withings
    builder.addCase(fetchWithings.fulfilled, (state) => {
      state.loading = 'idle'
    })
    builder.addCase(fetchWithings.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchWithings.rejected, (state) => {
      state.loading = 'idle'
    })
    // Fetch Fitbit
    builder.addCase(fetchFitbit.fulfilled, (state) => {
      state.loading = 'idle'
    })
    builder.addCase(fetchFitbit.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchFitbit.rejected, (state) => {
      state.loading = 'idle'
    })
  }
})

export default sleepSlice.reducer
