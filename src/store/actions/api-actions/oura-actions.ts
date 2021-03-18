import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import CONFIG from '@config/Config'
import { getKeychainParsedValue, setKeychainValue } from '@helpers/Keychain'
import { formatOuraSamples } from '@helpers/sleep/oura-helper'
import { getOuraEnabled } from '@selectors/api-selectors/api-selectors'
import { captureException } from '@sentry/react-native'
import { AppThunk } from '@typings/redux-actions'
import { OuraAuthorizeResult, ResponseBase } from '@typings/state/api-state'
import { SOURCE } from '@typings/state/sleep-source-state'
import { format, isAfter } from 'date-fns'
import { authorize, refresh } from 'react-native-app-auth'
import {
  ApiActions,
  FETCH_SLEEP_OURA_FAILURE,
  FETCH_SLEEP_OURA_START,
  FETCH_SLEEP_OURA_SUCCESS,
  OURA_AUTHORIZE_SUCCESS,
  OURA_REVOKE_SUCCESS,
  OURA_UPDATE_TOKEN
} from './types'

/* ACTIONS */

export const ouraAuthorizeSuccess = (payload: ResponseBase): ApiActions => ({
  type: OURA_AUTHORIZE_SUCCESS,
  payload
})

export const ouraRevokeSuccess = (): ApiActions => ({
  type: OURA_REVOKE_SUCCESS
})

export const ouraUpdateToken = (payload: ResponseBase): ApiActions => ({
  type: OURA_UPDATE_TOKEN,
  payload
})

export const fetchSleepOuraStart = (): ApiActions => ({
  type: FETCH_SLEEP_OURA_START
})

export const fetchSleepOuraSuccess = (): ApiActions => ({
  type: FETCH_SLEEP_OURA_SUCCESS
})

export const fetchSleepOuraFailure = (): ApiActions => ({
  type: FETCH_SLEEP_OURA_FAILURE
})

/* ASYNC ACTIONS */

const OURA_API = 'https://api.ouraring.com/v1/sleep?start='

export const toggleOura = (): AppThunk => async (dispatch, getState) => {
  try {
    const enabled = getOuraEnabled(getState())
    if (enabled) {
      await dispatch(revokeOuraAccess())
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(authorizeOura())
    }
  } catch (err) {
    captureException(err)
  }
}

export const authorizeOura = (): AppThunk => async (dispatch) => {
  try {
    const response = (await authorize(
      CONFIG.OURA_CONFIG
    )) as OuraAuthorizeResult

    const { accessTokenExpirationDate, refreshToken, accessToken } = response

    const key = CONFIG.OURA_CONFIG.bundleId
    const value = JSON.stringify({
      accessTokenExpirationDate,
      refreshToken,
      accessToken
    })

    await setKeychainValue(key, value, CONFIG.OURA_CONFIG.bundleId)

    dispatch(
      ouraAuthorizeSuccess({
        enabled: true
      })
    )

    dispatch(setMainSource(SOURCE.OURA))
  } catch (error) {
    captureException(error)
  }
}

export const refreshOuraToken = (): AppThunk => async (dispatch) => {
  const { refreshToken: oldToken } = ((await getKeychainParsedValue(
    CONFIG.OURA_CONFIG.bundleId
  )) as unknown) as OuraAuthorizeResult

  if (oldToken) {
    try {
      const response = (await refresh(CONFIG.OURA_CONFIG, {
        refreshToken: oldToken
      })) as OuraAuthorizeResult

      const { accessTokenExpirationDate, refreshToken, accessToken } = response

      const key = CONFIG.OURA_CONFIG.bundleId
      const value = JSON.stringify({
        accessTokenExpirationDate,
        refreshToken:
          refreshToken && refreshToken.length > 0 ? refreshToken : oldToken,
        accessToken
      })

      await setKeychainValue(key, value, CONFIG.OURA_CONFIG.bundleId)

      dispatch(
        ouraAuthorizeSuccess({
          enabled: true
        })
      )

      return accessToken
    } catch (error) {
      captureException(error)
    }
  }

  return null
}

export const revokeOuraAccess = (): AppThunk => async (dispatch) => {
  dispatch(ouraRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getOuraSleep = (
  startDate: string,
  endDate: string
): AppThunk => async (dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = ((await getKeychainParsedValue(
    CONFIG.OURA_CONFIG.bundleId
  )) as unknown) as OuraAuthorizeResult

  dispatch(fetchSleepOuraStart())

  const start = format(new Date(startDate), 'yyyy-MM-dd')
  const end = format(new Date(endDate), 'yyyy-MM-dd')

  if (accessToken) {
    try {
      if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
        const ouraAPICall = await fetch(`${OURA_API}${start}&end=${end}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        const response = await ouraAPICall.json()

        const formattedResponse = formatOuraSamples(response.sleep)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepOuraSuccess())
      } else {
        const freshToken = await dispatch(refreshOuraToken())
        const ouraAPICall = await fetch(`${OURA_API}${start}&end=${end}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${freshToken}`,
            'Content-Type': 'application/json'
          }
        })
        const response = await ouraAPICall.json()

        const formattedResponse = formatOuraSamples(response.sleep)

        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepOuraSuccess())
      }
    } catch (error) {
      captureException(error)
      dispatch(fetchSleepOuraFailure())
    }
  }
}
