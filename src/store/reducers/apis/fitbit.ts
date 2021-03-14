import {
  authorize,
  AuthorizeResult,
  revoke,
  refresh
} from 'react-native-app-auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/Config'
import { getKeychainParsedValue, setKeychainValue } from '@helpers/Keychain'

type State = {
  loading: 'idle' | 'pending'
  authorized: boolean
  accessTokenExpirationDate: string | undefined
  userID: string | undefined
}

const initialState: State = {
  loading: 'idle',
  authorized: false,
  accessTokenExpirationDate: undefined,
  userID: undefined
}

type Response = {
  userID: string
  accessTokenExpirationDate: string
}

type Arguments = undefined

export interface FitbitAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  tokenAdditionalParameters: {
    user_id: string
  }
}

export const authorizeFitbit = createAsyncThunk<Response, Arguments>(
  'fitbit/authorize',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorize(CONFIG.FITBIT_CONFIG)

      await setKeychainValue(
        CONFIG.FITBIT_CONFIG.bundleId,
        JSON.stringify({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken
        }),
        CONFIG.FITBIT_CONFIG.bundleId
      )

      if (typeof response?.tokenAdditionalParameters?.user_id === 'undefined') {
        return rejectWithValue(false)
      }

      return {
        userID: response?.tokenAdditionalParameters?.user_id,
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

export const revokeFitbitAccess = createAsyncThunk<boolean, Arguments>(
  'fitbit/revoke',
  async (_, { rejectWithValue }) => {
    try {
      const fitbit = await getKeychainParsedValue(CONFIG.FITBIT_CONFIG.bundleId)

      if (!fitbit) {
        await revoke(CONFIG.FITBIT_CONFIG, {
          tokenToRevoke: fitbit?.accessToken,
          includeBasicAuth: true
        })
        return false
      }

      return rejectWithValue(false)
    } catch (error) {
      return rejectWithValue(true)
    }
  }
)

export const refreshToken = createAsyncThunk<Response, Arguments>(
  'fitbit/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const fitbit = await getKeychainParsedValue(CONFIG.FITBIT_CONFIG.bundleId)

      const response = await refresh(CONFIG.FITBIT_CONFIG, {
        refreshToken: fitbit.accestoken
      })

      await setKeychainValue(
        CONFIG.FITBIT_CONFIG.bundleId,
        JSON.stringify({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken
        }),
        CONFIG.FITBIT_CONFIG.bundleId
      )

      return {}

      return rejectWithValue(false)
    } catch (error) {
      return rejectWithValue(true)
    }
  }
)

// const { refreshToken: oldToken } = ((await getKeychainParsedValue(
//   CONFIG.FITBIT_CONFIG.bundleId
// )) as unknown) as FitbitAuthorizeResult

// if (oldToken) {
//   try {
//     const response = (await refresh(CONFIG.FITBIT_CONFIG, {
//       refreshToken: oldToken
//     })) as FitbitRefreshResult

//     const {
//       accessTokenExpirationDate,
//       refreshToken,
//       accessToken,
//       // eslint-disable-next-line camelcase
//       additionalParameters: { user_id }
//     } = response

//     const key = CONFIG.FITBIT_CONFIG.bundleId
//     const value = JSON.stringify({
//       accessTokenExpirationDate,
//       refreshToken,
//       accessToken
//     })

//     await setKeychainValue(key, value, CONFIG.FITBIT_CONFIG.bundleId)

//     dispatch(
//       fitbitAuthorizeSuccess({
//         enabled: true
//       })
//     )

//     return accessToken
//   } catch (error) {
//     captureException(error)
//   }
// }

// return null

const fitbitSlice = createSlice({
  name: 'fitbitSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // authorize
    builder.addCase(authorizeFitbit.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate
      state.userID = action.payload.userID
      state.authorized = true
    })
    builder.addCase(authorizeFitbit.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(authorizeFitbit.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // revoke
    builder.addCase(revokeFitbitAccess.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
      state.userID = undefined
      state.authorized = false
    })
    builder.addCase(revokeFitbitAccess.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(revokeFitbitAccess.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
  }
})

export default fitbitSlice.reducer
