import CONFIG from '@config/Config'
import { getKeychainParsedValue, setKeychainValue } from '@helpers/Keychain'
import { formatFitbitSamples } from '@helpers/sleep/fitbit-helper'
import { getFitbitEnabled } from '@selectors/api-selectors/api-selectors'
import { captureException } from '@sentry/react-native'
import { AppThunk } from '@typings/redux-actions'
import {
  FitbitAuthorizeResult,
  FitbitRefreshResult,
  ResponseBase
} from '@typings/state/api-state'
import { SOURCE } from '@typings/state/sleep-source-state'
import { format, isAfter, subWeeks } from 'date-fns'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import {
  ApiActions,
  FETCH_SLEEP_FITBIT_FAILURE,
  FETCH_SLEEP_FITBIT_START,
  FETCH_SLEEP_FITBIT_SUCCESS,
  FITBIT_AUTHORIZE_SUCCESS,
  FITBIT_REVOKE_SUCCESS,
  FITBIT_UPDATE_TOKEN
} from './types'

/* ACTIONS */

export const fitbitAuthorizeSuccess = (payload: ResponseBase): ApiActions => ({
  type: FITBIT_AUTHORIZE_SUCCESS,
  payload
})

export const fitbitRevokeSuccess = (): ApiActions => ({
  type: FITBIT_REVOKE_SUCCESS
})

export const fitbitUpdateToken = (payload: ResponseBase): ApiActions => ({
  type: FITBIT_UPDATE_TOKEN,
  payload
})

export const fetchSleepFitbitStart = (): ApiActions => ({
  type: FETCH_SLEEP_FITBIT_START
})

export const fetchSleepFitbitSuccess = (): ApiActions => ({
  type: FETCH_SLEEP_FITBIT_SUCCESS
})

export const fetchSleepFitbitFailure = (): ApiActions => ({
  type: FETCH_SLEEP_FITBIT_FAILURE
})

/* ASYNC ACTIONS */

export const toggleFitbit = (): AppThunk => async (dispatch, getState) => {
  const enabled = getFitbitEnabled(getState())

  try {
    if (enabled) {
      dispatch(revokeFitbitAccess())
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(authorizeFitbit())
    }
  } catch (error) {
    captureException(error)
  }
}

export const authorizeFitbit = (): AppThunk => async (dispatch) => {
  try {
    const response = (await authorize(
      CONFIG.FITBIT_CONFIG
    )) as FitbitAuthorizeResult

    const {
      accessTokenExpirationDate,
      refreshToken,
      accessToken,
      // eslint-disable-next-line camelcase
      tokenAdditionalParameters: { user_id }
    } = response

    const key = CONFIG.FITBIT_CONFIG.bundleId
    const value = JSON.stringify({
      accessTokenExpirationDate,
      refreshToken,
      accessToken,
      tokenAdditionalParameters: { user_id }
    })

    await setKeychainValue(key, value, CONFIG.FITBIT_CONFIG.bundleId)

    await dispatch(
      fitbitAuthorizeSuccess({
        enabled: true
      })
    )
    await dispatch(setMainSource(SOURCE.FITBIT))
  } catch (error) {
    captureException(error)
  }
}

export const refreshFitbitToken = (): AppThunk => async (dispatch) => {
  const { refreshToken: oldToken } = ((await getKeychainParsedValue(
    CONFIG.FITBIT_CONFIG.bundleId
  )) as unknown) as FitbitAuthorizeResult

  if (oldToken) {
    try {
      const response = (await refresh(CONFIG.FITBIT_CONFIG, {
        refreshToken: oldToken
      })) as FitbitRefreshResult

      const {
        accessTokenExpirationDate,
        refreshToken,
        accessToken,
        // eslint-disable-next-line camelcase
        additionalParameters: { user_id }
      } = response

      const key = CONFIG.FITBIT_CONFIG.bundleId
      const value = JSON.stringify({
        accessTokenExpirationDate,
        refreshToken,
        accessToken,
        tokenAdditionalParameters: { user_id }
      })

      await setKeychainValue(key, value, CONFIG.FITBIT_CONFIG.bundleId)

      dispatch(
        fitbitAuthorizeSuccess({
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

export const revokeFitbitAccess = (): AppThunk => async (dispatch) => {
  const { accessToken } = ((await getKeychainParsedValue(
    CONFIG.FITBIT_CONFIG.bundleId
  )) as unknown) as FitbitAuthorizeResult

  if (accessToken) {
    try {
      await revoke(CONFIG.FITBIT_CONFIG, {
        tokenToRevoke: accessToken,
        includeBasicAuth: true
      })

      dispatch(fitbitRevokeSuccess())
      dispatch(setMainSource(SOURCE.NO_SOURCE))
    } catch (error) {
      captureException(error)
    }
  }
}

export const getFitbitSleep = (): AppThunk => async (dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate,
    // eslint-disable-next-line camelcase
    tokenAdditionalParameters: { user_id }
  } = ((await getKeychainParsedValue(
    CONFIG.FITBIT_CONFIG.bundleId
  )) as unknown) as FitbitAuthorizeResult

  const startDate = format(subWeeks(new Date(), 1), 'YYYY-MM-DD')
  const endDate = format(new Date(), 'YYYY-MM-DD')

  dispatch(fetchSleepFitbitStart())
  if (accessToken) {
    try {
      if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
        const fitbitApiCall = await fetch(
          `https://api.fitbit.com/1.2/user/${user_id}/sleep/date/${startDate}/${endDate}.json`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const response = await fitbitApiCall.json()
        const formattedResponse = formatFitbitSamples(response.sleep)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepFitbitSuccess())
      } else {
        const freshToken = await dispatch(refreshFitbitToken())
        const fitbitApiCall = await fetch(
          `https://api.fitbit.com/1.2/user/${user_id}/sleep/date/${startDate}/${endDate}.json`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${freshToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const response = await fitbitApiCall.json()
        const formattedResponse = formatFitbitSamples(response.sleep)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepFitbitSuccess())
      }
    } catch (error) {
      captureException(error)
      dispatch(fetchSleepFitbitFailure())
    }
  }
}
