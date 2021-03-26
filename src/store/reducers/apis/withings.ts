import {
  authorize,
  AuthorizeResult,
  revoke,
  refresh
} from 'react-native-app-auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/config'
import { getKeychainParsedValue, setKeychainValue } from '@helpers/Keychain'

type State = {
  loading: 'idle' | 'pending'
  authorized: boolean
  accessTokenExpirationDate: string | undefined
}

const initialState: State = {
  loading: 'idle',
  authorized: false,
  accessTokenExpirationDate: undefined
}

type Response = {
  userID: string
  accessTokenExpirationDate: string
}

type Arguments = undefined

export interface WithingsAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  tokenAdditionalParameters: {
    user_id: string
  }
}

export const authorizeWithings = createAsyncThunk<Response, Arguments>(
  'withings/authorize',
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

export const revokeWithingsAccess = createAsyncThunk<boolean, Arguments>(
  'withings/revoke',
  async (_, { rejectWithValue }) => {
    try {
      const fitbit = await getKeychainParsedValue<WithingsAuthorizeResult>(
        CONFIG.FITBIT_CONFIG.bundleId
      )

      if (fitbit) {
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

export const refreshWithingsToken = createAsyncThunk<
  { accessTokenExpirationDate: string },
  Arguments
>('withings/refresh', async (_, { rejectWithValue }) => {
  try {
    const fitbit = await getKeychainParsedValue<WithingsAuthorizeResult>(
      CONFIG.FITBIT_CONFIG.bundleId
    )
    if (fitbit?.accessToken) {
      const response = await refresh(CONFIG.FITBIT_CONFIG, {
        refreshToken: fitbit?.accessToken
      })

      await setKeychainValue(
        CONFIG.FITBIT_CONFIG.bundleId,
        JSON.stringify({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken
        }),
        CONFIG.FITBIT_CONFIG.bundleId
      )

      return {
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    }
    return rejectWithValue(false)
  } catch (error) {
    return rejectWithValue(true)
  }
})

const fitbitSlice = createSlice({
  name: 'fitbitSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Authorize
    builder.addCase(authorizeWithings.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate
      state.authorized = true
    })
    builder.addCase(authorizeWithings.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(authorizeWithings.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Revoke
    builder.addCase(revokeWithingsAccess.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
      state.authorized = false
    })
    builder.addCase(revokeWithingsAccess.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(revokeWithingsAccess.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Refresh
    builder.addCase(refreshWithingsToken.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
    })
    builder.addCase(refreshWithingsToken.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(refreshWithingsToken.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = false
    })
  }
})

export default fitbitSlice.reducer
