import {
  authorize,
  AuthorizeResult,
  revoke,
  refresh
} from 'react-native-app-auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/config'
import { Platform } from 'react-native'
import { getAccess, Google, setAccess } from '@helpers/oauth/token'

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

export interface GoogleFitAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  accessToken: string
}

export const authorizeGoogleFit = createAsyncThunk<Response, Arguments>(
  'googleFit/authorize',
  async (_, { rejectWithValue }) => {
    try {
      const config =
        Platform.OS === 'android'
          ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
          : CONFIG.GOOOGLE_FIT_GONFIG_IOS

      const response = await authorize(config)

      await setAccess('google', {
        refreshToken: response.refreshToken,
        accessToken: response.accessToken
      })

      return {
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

export const revokeGoogleFitAccess = createAsyncThunk<boolean, Arguments>(
  'googleFit/revoke',
  async (_, { rejectWithValue }) => {
    try {
      const access = await getAccess<Google>('google')
      if (access) {
        const config =
          Platform.OS === 'android'
            ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
            : CONFIG.GOOOGLE_FIT_GONFIG_IOS

        if (access?.accessToken) {
          await revoke(config, {
            tokenToRevoke: access?.accessToken,
            includeBasicAuth: true
          })
          return false
        }
      }

      return rejectWithValue(false)
    } catch (error) {
      return rejectWithValue(true)
    }
  }
)

export const refreshGoogleFitToken = createAsyncThunk<
  { accessTokenExpirationDate: string },
  Arguments
>('googleFit/refresh', async (_, { rejectWithValue }) => {
  try {
    const access = await getAccess<Google>('google')
    if (access) {
      const response = await refresh(CONFIG.GOOOGLE_FIT_GONFIG_ANDROID, {
        refreshToken: access?.accessToken
      })

      await setAccess<Google>('google', {
        refreshToken: response.refreshToken,
        accessToken: response.accessToken
      })

      return {
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    }
    return rejectWithValue(false)
  } catch (error) {
    return rejectWithValue(true)
  }
})

const googleFitSlice = createSlice({
  name: 'googleFitSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Authorize
    builder.addCase(authorizeGoogleFit.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate
      state.authorized = true
    })
    builder.addCase(authorizeGoogleFit.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(authorizeGoogleFit.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Revoke
    builder.addCase(revokeGoogleFitAccess.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
      state.authorized = false
    })
    builder.addCase(revokeGoogleFitAccess.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(revokeGoogleFitAccess.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Refresh
    builder.addCase(refreshGoogleFitToken.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
    })
    builder.addCase(refreshGoogleFitToken.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(refreshGoogleFitToken.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = false
    })
  }
})

export default googleFitSlice.reducer
