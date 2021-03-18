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
}

const initialState: State = {
  loading: 'idle',
  authorized: false,
  accessTokenExpirationDate: undefined
}

type Response = {
  accessTokenExpirationDate: string
}

type Arguments = undefined

export type OuraAuthorizeResult = AuthorizeResult

export const authorizeOura = createAsyncThunk<Response, Arguments>(
  'oura/authorize',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorize(CONFIG.OURA_CONFIG)

      await setKeychainValue(
        CONFIG.OURA_CONFIG.bundleId,
        JSON.stringify({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken
        }),
        CONFIG.OURA_CONFIG.bundleId
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

export const revokeOuraAccess = createAsyncThunk<boolean, Arguments>(
  'oura/revoke',
  async (_, { rejectWithValue }) => {
    try {
      const oura = await getKeychainParsedValue<OuraAuthorizeResult>(
        CONFIG.OURA_CONFIG.bundleId
      )

      if (oura) {
        await revoke(CONFIG.OURA_CONFIG, {
          tokenToRevoke: oura?.accessToken,
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

export const refreshOuraToken = createAsyncThunk<
  { accessTokenExpirationDate: string },
  Arguments
>('oura/refresh', async (_, { rejectWithValue }) => {
  try {
    const oura = await getKeychainParsedValue<OuraAuthorizeResult>(
      CONFIG.OURA_CONFIG.bundleId
    )
    if (oura?.accessToken) {
      const response = await refresh(CONFIG.OURA_CONFIG, {
        refreshToken: oura?.accessToken
      })

      await setKeychainValue(
        CONFIG.OURA_CONFIG.bundleId,
        JSON.stringify({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken
        }),
        CONFIG.OURA_CONFIG.bundleId
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

const ouraSlice = createSlice({
  name: 'ouraSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Authorize
    builder.addCase(authorizeOura.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate
      state.authorized = true
    })
    builder.addCase(authorizeOura.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(authorizeOura.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Revoke
    builder.addCase(revokeOuraAccess.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
      state.authorized = false
    })
    builder.addCase(revokeOuraAccess.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(revokeOuraAccess.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Refresh
    builder.addCase(refreshOuraToken.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
    })
    builder.addCase(refreshOuraToken.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(refreshOuraToken.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = false
    })
  }
})

export default ouraSlice.reducer
