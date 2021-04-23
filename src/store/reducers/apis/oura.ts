import {
  authorize,
  AuthorizeResult,
  revoke,
  refresh
} from 'react-native-app-auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/config'
import { setKeychainValue } from '@helpers/Keychain'
import { setSource } from '@reducers/source'
import { getAccess, Oura, setAccess } from '@helpers/oauth/token'

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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setSource('oura'))

      const response = await authorize(CONFIG.OURA_CONFIG)

      await setAccess<Oura>('oura', {
        refreshToken: response.refreshToken,
        accessToken: response.accessToken
      })

      return {
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    } catch (error) {
      dispatch(setSource(undefined))
      return rejectWithValue(false)
    }
  }
)

export const revokeOuraAccess = createAsyncThunk<boolean, Arguments>(
  'oura/revoke',
  async (_, { rejectWithValue }) => {
    try {
      const oura = await getAccess<Oura>('oura')

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
    const oura = await getAccess<Oura>('oura')

    if (oura) {
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
