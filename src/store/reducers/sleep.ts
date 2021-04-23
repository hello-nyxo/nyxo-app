import CONFIG from '@config/config'
import { getAccess } from '@helpers/oauth/token'
import { formatFitbitSamples } from '@helpers/sleep/fitbit-helper'
import {
  formatGarminSample,
  formatGarminSamples
} from '@helpers/sleep/garmin-helper'
import { formatGoogleFitData } from '@helpers/sleep/google-fit-helper'
import { formatPolarSample } from '@helpers/sleep/polar-helper'
import { formatWithingsSamples } from '@helpers/sleep/withings-helper'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
import { PolarSleepObject } from '@typings/sources/Polar'
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
      const withings = await getAccess('withings')
      if (withings) {
        const start = format(new Date(startDate), 'YYYY-MM-DD')
        const end = format(new Date(endDate), 'YYYY-MM-DD')

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
              Authorization: `Bearer ${withings.accessToken}`
            }
          }
        )

        const response = await withingsApiCall.json()
        dispatch(addNights(formatWithingsSamples(response.body.series)))
        return undefined
      }
      return rejectWithValue(undefined)
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

export const fetchGarmin = createAsyncThunk<
  Response,
  Arguments,
  { state: RootState }
>(
  'fitbit/fetch',
  async ({ startDate }, { dispatch, rejectWithValue, getState }) => {
    try {
      const garmin = await getAccess('garmin')
      if (garmin) {
        const response = await fetch(CONFIG.GARMIN_CONFIG.GET_SLEEP_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({
            accessToken: garmin.accessToken,
            accessTokenSecret,
            uploadStartTimeInSeconds,
            uploadEndTimeInSeconds
          })
        })

        // garminAPICalls.forEach((res) => {
        //   if (res) {
        //     const { body } = (res as unknown) as { body: GarminSleepObject[] }
        //     body?.forEach((sleep: GarminSleepObject) =>
        //       combinedSleepData.push(sleep)
        //     )
        //   }
        // })

        const formattedResponse = formatGarminSamples(combinedSleepData)
        dispatch(addNights(formatGarminSample()))
      }
    } catch (error) {
      rejectWithValue(undefined)
    }
  }
)
export const fetchFitbit = createAsyncThunk<
  Response,
  Arguments,
  { state: RootState }
>(
  'fitbit/fetch',
  async ({ startDate, endDate }, { dispatch, rejectWithValue, getState }) => {
    try {
      const { fitbit } = getState()
      const start = format(new Date(startDate), 'YYYY-MM-DD')
      const end = format(new Date(endDate), 'YYYY-MM-DD')

      const accessToken = undefined

      const call = await fetch(
        `https://api.fitbit.com/1.2/user/${fitbit.userID}/sleep/date/${start}/${end}.json`,
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
    } catch (error) {
      rejectWithValue(undefined)
    }
  }
)

export const fetchPolar = createAsyncThunk<Response, Arguments>(
  'polar/fetch',
  async ({ startDate }, { dispatch, rejectWithValue }) => {
    try {
      const token = await getAccess('polar')

      if (token) {
        const response: PolarSleepObject = await fetch(
          `https://www.polaraccesslink.com/v3/users/sleep/${format(
            new Date(startDate),
            'yyyy-MM-dd'
          )}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        )

        dispatch(addNights(formatPolarSample(response)))
      }
    } catch (error) {
      rejectWithValue(undefined)
    }
  }
)

export const fetchGoogleFit = createAsyncThunk<Response, Arguments>(
  'google/fetch',
  async ({ startDate, endDate }, { dispatch }) => {
    const access = await getAccess('google')
    if (access) {
      const googleApiCall = await fetch(
        `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startDate}&endTime=${endDate}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const response = await googleApiCall.json()
      dispatch(addNights(formatGoogleFitData(response.session)))
    }
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
    // Fetch Google
    builder.addCase(fetchGoogleFit.fulfilled, (state) => {
      state.loading = 'idle'
    })
    builder.addCase(fetchGoogleFit.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchGoogleFit.rejected, (state) => {
      state.loading = 'idle'
    })
  }
})

export default sleepSlice.reducer
