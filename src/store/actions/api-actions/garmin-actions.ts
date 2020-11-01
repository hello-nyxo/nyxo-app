/* eslint-disable camelcase */
import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { getGarminEnabled } from '@selectors/api-selectors/api-selectors'
import CONFIG from '@config/Config'
import { openAuthSessionAsync, WebBrowserResult } from 'expo-web-browser'
import { GetKeychainParsedValue, SetKeychainKeyValue } from '@helpers/Keychain'
import { formatGarminSamples } from '@helpers/sleep/garmin-helper'
import moment from 'moment'
import queryString from 'query-string'
import { Linking, Platform } from 'react-native'
import { GetState } from '@typings/GetState'
import ReduxAction, { Dispatch, Thunk } from '@typings/redux-actions'
import { GarminSleepObject } from '@typings/Sleep/Garmin'
import { GarminAuthorizeResult, ResponseBase } from '@typings/state/api-state'
import { SOURCE } from '@typings/state/sleep-source-state'
import { fetchSleepSuccess } from '../sleep/health-kit-actions'

export const GARMIN_AUTHORIZE_SUCCESS = 'GARMIN_AUTHORIZE_SUCCESS'
export const GARMIN_REVOKE_SUCCESS = 'GARMIN_REVOKE_SUCCESS'
export const GARMIN_UPDATE_TOKEN = 'GARMIN_UPDATE_TOKEN'

export const FETCH_SLEEP_GARMIN_START = 'FETCH_SLEEP_GARMIN_START'
export const FETCH_SLEEP_GARMIN_SUCCESS = 'FETCH_SLEEP_GARMIN_SUCCESS'
export const FETCH_SLEEP_GARMIN_FAILURE = 'FETCH_SLEEP_GARMIN_FAILURE'

/* ACTIONS */

export const garminAuthorizeSuccess = (payload: ResponseBase): ReduxAction => ({
  type: GARMIN_AUTHORIZE_SUCCESS,
  payload
})

export const garminRevokeSuccess = (): ReduxAction => ({
  type: GARMIN_REVOKE_SUCCESS
})

export const garminUpdateToken = (payload: ResponseBase): ReduxAction => ({
  type: GARMIN_UPDATE_TOKEN,
  payload
})

export const fetchSleepGarminStart = (): ReduxAction => ({
  type: FETCH_SLEEP_GARMIN_START
})

export const fetchSleepGarminSuccess = (): ReduxAction => ({
  type: FETCH_SLEEP_GARMIN_SUCCESS
})

export const fetchSleepGarminFailure = (): ReduxAction => ({
  type: FETCH_SLEEP_GARMIN_FAILURE
})

export const toggleGarmin = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const enabled = getGarminEnabled(getState())
    if (enabled) {
      await dispatch(revokeGarminAccess())
    } else {
      await dispatch(revokePreviousSource())
      if (Platform.OS === 'ios') {
        await dispatch(authorizeGarminIOS())
      } else if (Platform.OS === 'android') {
        await dispatch(getGarminOauthVerifierAndroid())
      }
    }
  } catch (err) {
    console.log('toggleGarmin err', err)
  }
}

export const authorizeGarminIOS = (): Thunk => async (dispatch: Dispatch) => {
  try {
    const getRequestTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.REQUEST_TOKEN_ENDPOINT
    )

    const {
      oauth_token,
      oauth_token_secret
    } = await getRequestTokenResponse.json()

    const callbackUri = 'nyxo://callback'

    const authorizationUrl = `https://connect.garmin.com/oauthConfirm?oauth_token=${oauth_token}&oauth_callback=${callbackUri}`

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

    const key = CONFIG.GARMIN_CONFIG.bundleId
    const value = JSON.stringify({
      oauthTokenSecret: oauth_token_secret,
      accessToken,
      accessTokenSecret
    })

    await SetKeychainKeyValue(key, value, CONFIG.GARMIN_CONFIG.bundleId)

    await dispatch(
      garminAuthorizeSuccess({
        enabled: true
      })
    )

    await dispatch(setMainSource(SOURCE.GARMIN))
  } catch (err) {
    console.warn('authorizeGarminIOS err', err)
  }
}

export const getGarminOauthVerifierAndroid = (): Thunk => async (
  dispatch: Dispatch
) => {
  try {
    const getRequestTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.REQUEST_TOKEN_ENDPOINT
    )

    const {
      oauth_token,
      oauth_token_secret
    } = await getRequestTokenResponse.json()

    const { accessToken, accessTokenSecret } = (await GetKeychainParsedValue(
      CONFIG.GARMIN_CONFIG.bundleId
    )) as GarminAuthorizeResult

    const key = CONFIG.GARMIN_CONFIG.bundleId
    const value = JSON.stringify({
      oauthTokenSecret: oauth_token_secret,
      accessToken,
      accessTokenSecret
    })

    await SetKeychainKeyValue(key, value, CONFIG.GARMIN_CONFIG.bundleId)

    const callbackUri = 'nyxo://garmin'

    const authorizationUrl = `https://connect.garmin.com/oauthConfirm?oauth_token=${oauth_token}&oauth_callback=${callbackUri}`

    await Linking.openURL(authorizationUrl)
  } catch (err) {
    console.warn('getOauthVerifierAndroid err', err)
  }
}

export const getGarminAccessTokenAndroid = (
  oauth_token: string,
  oauth_verifier: string
): Thunk => async (dispatch: Dispatch) => {
  try {
    const {
      oauthTokenSecret: oauth_token_secret
    } = (await GetKeychainParsedValue(
      CONFIG.GARMIN_CONFIG.bundleId
    )) as GarminAuthorizeResult

    const getAccessTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.ACCESS_TOKEN_ENDPOINT,
      {
        method: 'POST',
        body: JSON.stringify({
          oauth_token,
          oauth_token_secret,
          oauth_verifier
        })
      }
    )

    const {
      oauth_token: accessToken,
      oauth_token_secret: accessTokenSecret
    } = await getAccessTokenResponse.json()

    const key = CONFIG.GARMIN_CONFIG.bundleId
    const value = JSON.stringify({
      accessToken,
      accessTokenSecret,
      oauthTokenSecret: oauth_token_secret
    })

    await SetKeychainKeyValue(key, value, CONFIG.GARMIN_CONFIG.bundleId)

    await dispatch(
      garminAuthorizeSuccess({
        enabled: true
      })
    )

    await dispatch(setMainSource(SOURCE.GARMIN))
  } catch (err) {
    console.log('getAccessTokenAndroid err', err)
  }
}

export const getGarminSleep = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const { accessToken, accessTokenSecret } = (await GetKeychainParsedValue(
    CONFIG.GARMIN_CONFIG.bundleId
  )) as GarminAuthorizeResult

  dispatch(fetchSleepGarminStart())

  if (accessToken && accessTokenSecret) {
    try {
      const garminAPICalls = await Promise.all(
        getRecent7DaysSleepApiCalls(accessToken, accessTokenSecret)
      )

      const combinedSleepData: GarminSleepObject[] = []

      garminAPICalls.forEach((res: Response | undefined) => {
        if (res) {
          const { body } = res as any // Don't know how to properly cast this
          body.forEach((sleep: GarminSleepObject) =>
            combinedSleepData.push(sleep)
          )
        }
      })

      const formattedResponse = formatGarminSamples(combinedSleepData)
      await dispatch(fetchSleepSuccess(formattedResponse))
      await dispatch(fetchSleepGarminSuccess())
    } catch (err) {
      console.warn('getGarminSleep error', err)
      dispatch(fetchSleepGarminFailure())
    }
  }
}

export const revokeGarminAccess = (): Thunk => async (dispatch: Dispatch) => {
  dispatch(garminRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

const generateSleepApiCall = (
  accessToken: string,
  accessTokenSecret: string,
  uploadStartTimeInSeconds: number,
  uploadEndTimeInSeconds: number
) => {
  return fetch(CONFIG.GARMIN_CONFIG.GET_SLEEP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      accessTokenSecret,
      uploadStartTimeInSeconds,
      uploadEndTimeInSeconds
    })
  }).catch((err) => {
    console.warn('getGarminSleep for loop err', err)
    return undefined
  })
}

const getRecent7DaysSleepApiCalls = (
  accessToken: string,
  accessTokenSecret: string
) => {
  const promiseArray = []

  for (let i = 7; i >= 1; i -= 1) {
    const uploadStartTimeInSeconds = moment()
      .subtract(i, 'days')
      .set({ hour: 16, minute: 0, second: 0, millisecond: 0 }) // set the start & end time of sleep record
      .unix()

    const uploadEndTimeInSeconds = moment()
      .subtract(i - 1, 'days')
      .set({ hour: 16, minute: 0, second: 0, millisecond: 0 })
      .unix()

    promiseArray.push(
      generateSleepApiCall(
        accessToken,
        accessTokenSecret,
        uploadStartTimeInSeconds,
        uploadEndTimeInSeconds
      )
    )
  }

  return promiseArray
}

interface ParsedAuthorizedResponse extends queryString.ParsedQuery {
  oauth_token: string
  oauth_verifier: string
}

interface OpenAuthSessionResponse extends WebBrowserResult {
  url: string
}
