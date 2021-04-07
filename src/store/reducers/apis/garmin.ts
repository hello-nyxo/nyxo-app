import CONFIG from '@config/config'
import { Garmin, getAccess, setAccess } from '@helpers/oauth/token'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { openAuthSessionAsync } from 'expo-web-browser'
import queryString from 'query-string'
import { Linking, Platform } from 'react-native'
import { AuthorizeResult } from 'react-native-app-auth'

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

type Response =
  | {
      userID: string
      accessTokenExpirationDate: string
    }
  | undefined

type Arguments = {
  oauth_token: string
  oauth_verifier: string
}

const GARMIN_AUTH_API = 'https://connect.garmin.com/oauthConfirm?oauth_token='

export interface GarminAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  tokenAdditionalParameters: {
    user_id: string
  }
}

interface ParsedAuthorizedResponse extends queryString.ParsedQuery {
  oauth_token: string
  oauth_verifier: string
}

interface OpenAuthSessionResponse {
  url: string
}

export const authorizeGarmin = createAsyncThunk<Response>(
  'garmin/authorize',
  async (_, { rejectWithValue }) => {
    try {
      if (Platform.OS === 'ios') {
        const getRequestTokenResponse = await fetch(
          CONFIG.GARMIN_CONFIG.REQUEST_TOKEN_ENDPOINT
        )

        const {
          oauth_token,
          oauth_token_secret
        } = await getRequestTokenResponse.json()

        const callbackUri = 'nyxo://callback'

        const authorizationUrl = `${GARMIN_AUTH_API}${oauth_token}&oauth_callback=${callbackUri}`

        const authorizedResponse = (await openAuthSessionAsync(
          authorizationUrl,
          CONFIG.GARMIN_CONFIG.redirectUrl
        )) as OpenAuthSessionResponse

        const { url: retrievedAuthorizedUrl } = authorizedResponse

        const parsedAuthorizedQueryString = queryString.parse(
          retrievedAuthorizedUrl.substring(
            retrievedAuthorizedUrl.indexOf('?'),
            retrievedAuthorizedUrl.length
          )
        ) as ParsedAuthorizedResponse

        const getAccessTokenResponse = await fetch(
          CONFIG.GARMIN_CONFIG.ACCESS_TOKEN_ENDPOINT,
          {
            method: 'POST',
            body: JSON.stringify({
              oauth_token,
              oauth_token_secret,
              oauth_verifier: parsedAuthorizedQueryString.oauth_verifier
            })
          }
        )

        const {
          oauth_token: accessToken,
          oauth_token_secret: accessTokenSecret
        } = await getAccessTokenResponse.json()

        await setAccess('garmin', {
          oauthTokenSecret: oauth_token_secret,
          accessToken,
          accessTokenSecret
        })
      } else {
        const getRequestTokenResponse = await fetch(
          CONFIG.GARMIN_CONFIG.REQUEST_TOKEN_ENDPOINT
        )

        const {
          oauth_token,
          oauth_token_secret
        } = await getRequestTokenResponse.json()

        const garmin = await getAccess<Garmin>('garmin')
        if (garmin) {
          await setAccess('garmin', {
            oauthTokenSecret: oauth_token_secret,
            accessToken: garmin.accessToken,
            accessTokenSecret: garmin.accessTokenSecret
          })

          const callbackUri = 'nyxo://garmin'
          const authorizationUrl = `${GARMIN_AUTH_API}${oauth_token}&oauth_callback=${callbackUri}`

          await Linking.openURL(authorizationUrl)
        }
      }
      return undefined
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

export const getGarminAccessToken = createAsyncThunk<Response, Arguments>(
  'garmin/authorize',
  async ({ oauth_token, oauth_verifier }, { rejectWithValue }) => {
    try {
      const garmin = await getAccess<Garmin>('garmin')
      if (garmin) {
        const getAccessTokenResponse = await fetch(
          CONFIG.GARMIN_CONFIG.ACCESS_TOKEN_ENDPOINT,
          {
            method: 'POST',
            body: JSON.stringify({
              oauth_token,
              oauth_token_secret: garmin.oauthTokenSecret,
              oauth_verifier
            })
          }
        )

        const {
          oauth_token: accessToken,
          oauth_token_secret: accessTokenSecret
        } = await getAccessTokenResponse.json()

        await setAccess<Garmin>('garmin', {
          accessToken,
          accessTokenSecret,
          oauthTokenSecret: garmin.oauthTokenSecret
        })

        return undefined
      }
      return undefined
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const garminSlice = createSlice({
  name: 'garminSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Authorize
    builder.addCase(authorizeGarmin.fulfilled, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
    builder.addCase(authorizeGarmin.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(authorizeGarmin.rejected, (state) => {
      state.loading = 'idle'
      state.authorized = true
    })
  }
})

export default garminSlice.reducer
