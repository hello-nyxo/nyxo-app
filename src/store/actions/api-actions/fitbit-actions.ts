import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { syncNightsToCloud } from '@actions/sleep/night-cloud-actions'
import { formatSleepData } from '@actions/sleep/sleep-data-actions'
import { getFitbitEnabled } from '@selectors/api-selectors/api-selectors'
import CONFIG from 'config/Config'
import { GetKeychainParsedValue, SetKeychainKeyValue } from 'helpers/Keychain'
import { formatFitbitSamples } from 'helpers/sleep/fitbit-helper'
import moment from 'moment'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import { GetState } from 'Types/GetState'
import ReduxAction, { Dispatch, Thunk } from 'Types/ReduxActions'
import {
  FitbitAuthorizeResult,
  FitbitRefreshResult,
  ResponseBase
} from 'Types/State/api-state'
import { SOURCE } from 'typings/state/sleep-source-state'

export const FITBIT_AUTHORIZE_SUCCESS = 'FITBIT_AUTHORIZE_SUCCESS'
export const FITBIT_REVOKE_SUCCESS = 'FITBIT_REVOKE_SUCCESS'
export const FITBIT_UPDATE_TOKEN = 'FITBIT_UPDATE_TOKEN'

export const FETCH_SLEEP_FITBIT_START = 'FETCH_SLEEP_FITBIT_START'
export const FETCH_SLEEP_FITBIT_SUCCESS = 'FETCH_SLEEP_FITBIT_SUCCESS'
export const FETCH_SLEEP_FITBIT_FAILURE = 'FETCH_SLEEP_FITBIT_FAILURE'

/* ACTIONS */

export const fitbitAuthorizeSuccess = (payload: ResponseBase): ReduxAction => ({
  type: FITBIT_AUTHORIZE_SUCCESS,
  payload
})

export const fitbitRevokeSuccess = (): ReduxAction => ({
  type: FITBIT_REVOKE_SUCCESS
})

export const fitbitUpdateToken = (payload: ResponseBase): ReduxAction => ({
  type: FITBIT_UPDATE_TOKEN,
  payload
})

export const fetchSleepFitbitStart = (): ReduxAction => ({
  type: FETCH_SLEEP_FITBIT_START
})

export const fetchSleepFitbitSuccess = (): ReduxAction => ({
  type: FETCH_SLEEP_FITBIT_SUCCESS
})

export const fetchSleepFitbitFailure = (): ReduxAction => ({
  type: FETCH_SLEEP_FITBIT_FAILURE
})

/* ASYNC ACTIONS */

export const toggleFitbit = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const enabled = getFitbitEnabled(getState())

  try {
    if (enabled) {
      dispatch(revokeFitbitAccess())
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(authorizeFitbit())
    }
  } catch (err) {
    console.warn('toggleFitbit err', err)
  }
}

export const authorizeFitbit = (): Thunk => async (dispatch: Dispatch) => {
  try {
    const response = (await authorize(
      CONFIG.FITBIT_CONFIG
    )) as FitbitAuthorizeResult

    const {
      accessTokenExpirationDate,
      refreshToken,
      accessToken,
      tokenAdditionalParameters: { user_id }
    } = response

    const key = CONFIG.FITBIT_CONFIG.bundleId
    const value = JSON.stringify({
      accessTokenExpirationDate,
      refreshToken,
      accessToken,
      tokenAdditionalParameters: { user_id }
    })

    await SetKeychainKeyValue(key, value, CONFIG.FITBIT_CONFIG.bundleId)

    await dispatch(
      fitbitAuthorizeSuccess({
        enabled: true
      })
    )
    await dispatch(setMainSource(SOURCE.FITBIT))
  } catch (error) {
    console.warn('authorizeFitbit err', error)
  }
}

export const refreshFitbitToken = (): Thunk => async (dispatch: Dispatch) => {
  const { refreshToken: oldToken } = (await GetKeychainParsedValue(
    CONFIG.FITBIT_CONFIG.bundleId
  )) as FitbitAuthorizeResult

  if (oldToken) {
    try {
      const response = (await refresh(CONFIG.FITBIT_CONFIG, {
        refreshToken: oldToken
      })) as FitbitRefreshResult

      const {
        accessTokenExpirationDate,
        refreshToken,
        accessToken,
        additionalParameters: { user_id }
      } = response

      const key = CONFIG.FITBIT_CONFIG.bundleId
      const value = JSON.stringify({
        accessTokenExpirationDate,
        refreshToken,
        accessToken,
        tokenAdditionalParameters: { user_id }
      })

      await SetKeychainKeyValue(key, value, CONFIG.FITBIT_CONFIG.bundleId)

      dispatch(
        fitbitAuthorizeSuccess({
          enabled: true
        })
      )

      return accessToken
    } catch (error) {
      console.warn('refreshFitbitToken err', error)
    }
  }

  return null
}

export const revokeFitbitAccess = (): Thunk => async (dispatch: Dispatch) => {
  const { accessToken } = (await GetKeychainParsedValue(
    CONFIG.FITBIT_CONFIG.bundleId
  )) as FitbitAuthorizeResult

  if (accessToken) {
    try {
      await revoke(CONFIG.FITBIT_CONFIG, {
        tokenToRevoke: accessToken,
        includeBasicAuth: true
      })

      dispatch(fitbitRevokeSuccess())
      dispatch(setMainSource(SOURCE.NO_SOURCE))
    } catch (error) {
      console.warn('revokeFitbitAccess err', error)
    }
  }
}

export const getFitbitSleep = (): Thunk => async (dispatch: Dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate,
    tokenAdditionalParameters: { user_id }
  } = (await GetKeychainParsedValue(
    CONFIG.FITBIT_CONFIG.bundleId
  )) as FitbitAuthorizeResult

  const startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')

  dispatch(fetchSleepFitbitStart())
  if (accessToken) {
    try {
      if (moment(accessTokenExpirationDate).isAfter(moment())) {
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
        await dispatch(syncNightsToCloud(formattedResponse))
        await dispatch(formatSleepData(formattedResponse))
        await dispatch(fetchSleepFitbitSuccess())
      } else {
        const accessToken = await dispatch(refreshFitbitToken())
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
        await dispatch(syncNightsToCloud(formattedResponse))
        await dispatch(formatSleepData(formattedResponse))
        await dispatch(fetchSleepFitbitSuccess())
      }
    } catch (error) {
      console.warn('getFitbitSleep err', error)
      dispatch(fetchSleepFitbitFailure())
    }
  }
}
