import {
  authorize,
  AuthorizeResult,
  revoke,
  refresh
} from 'react-native-app-auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/config'
import { setSource } from '@reducers/source'
import { getAccess, setAccess } from '@helpers/oauth/token'

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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setSource('withings'))
      const response = await authorize(CONFIG.WITHINGS_CONFIG)
      setAccess('withings', {
        refreshToken: response.refreshToken,
        accessToken: response.accessToken
      })

      if (typeof response?.tokenAdditionalParameters?.user_id === 'undefined') {
        dispatch(setSource(undefined))
        return rejectWithValue(false)
      }

      return {
        userID: response?.tokenAdditionalParameters?.user_id,
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    } catch (error) {
      dispatch(setSource(undefined))
      return rejectWithValue(false)
    }
  }
)

export const revokeWithingsAccess = createAsyncThunk<boolean, Arguments>(
  'withings/revoke',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const withings = await getAccess('withings')

      if (withings) {
        await revoke(CONFIG.FITBIT_CONFIG, {
          tokenToRevoke: withings?.accessToken,
          includeBasicAuth: true
        })
        return false
      }

      dispatch(setSource(undefined))
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
    const withings = await getAccess('withings')
    if (withings) {
      const response = await refresh(CONFIG.FITBIT_CONFIG, {
        refreshToken: withings?.accessToken
      })

      await setAccess('withings', {
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

const withingsSlice = createSlice({
  name: 'withingsSlice',
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

export default withingsSlice.reducer
