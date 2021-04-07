import { authorize, AuthorizeResult } from 'react-native-app-auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/config'
import { setKeychainValue } from '@helpers/Keychain'
import { setSource } from '@reducers/source'
import { RootState } from '@store/store'
import { getAccess, Polar, setAccess } from '@helpers/oauth/token'

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

export interface PolarAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  tokenAdditionalParameters: {
    userID: string
  }
}

export const authorizePolar = createAsyncThunk<Response, Arguments>(
  'polar/authorize',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setSource('polar'))
      const response = await authorize(CONFIG.POLAR_CONFIG)

      await setAccess<Polar>('polar', {
        refreshToken: response.refreshToken,
        accessToken: response.accessToken
      })
      await setKeychainValue(
        CONFIG.POLAR_CONFIG.bundleId,
        JSON.stringify({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken
        }),
        CONFIG.POLAR_CONFIG.bundleId
      )

      if (
        typeof response?.tokenAdditionalParameters?.x_user_id === 'undefined'
      ) {
        dispatch(setSource(undefined))
        return rejectWithValue(false)
      }

      return {
        userID: response?.tokenAdditionalParameters?.x_user_id,
        accessTokenExpirationDate: response.accessTokenExpirationDate
      }
    } catch (error) {
      dispatch(setSource(undefined))
      return rejectWithValue(false)
    }
  }
)

export const revokePolarAccess = createAsyncThunk<
  boolean,
  Arguments,
  { state: RootState }
>('polar/revoke', async (_, { rejectWithValue, getState }) => {
  const state = getState()

  try {
    const polar = await getAccess<Polar>('polar')
    if (polar) {
      await fetch(
        `https://www.polaraccesslink.com/v3/users/${state.polar.userID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${polar?.accessToken}`
          }
        }
      )

      return rejectWithValue(false)
    }
    return rejectWithValue(false)
  } catch (error) {
    return rejectWithValue(true)
  }
})

const polarSlice = createSlice({
  name: 'polarSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Authorize
    builder.addCase(authorizePolar.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = action.payload.accessTokenExpirationDate
      state.userID = action.payload.userID
      state.authorized = true
    })
    builder.addCase(authorizePolar.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(authorizePolar.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    // Revoke
    builder.addCase(revokePolarAccess.fulfilled, (state) => {
      state.loading = 'idle'
      state.accessTokenExpirationDate = undefined
      state.userID = undefined
      state.authorized = false
    })
    builder.addCase(revokePolarAccess.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(revokePolarAccess.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
  }
})

export default polarSlice.reducer
