import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { getOuraEnabled } from '@selectors/api-selectors/api-selectors'
import CONFIG from 'config/Config'
import { format, isAfter } from 'date-fns'
import { GetKeychainParsedValue, SetKeychainKeyValue } from 'helpers/Keychain'
import { formatOuraSamples } from 'helpers/sleep/oura-helper'
import { authorize, refresh } from 'react-native-app-auth'
import { GetState } from 'Types/GetState'
import ReduxAction, { Dispatch, Thunk } from 'Types/ReduxActions'
import { OuraAuthorizeResult, ResponseBase } from 'Types/State/api-state'
import { SOURCE } from 'typings/state/sleep-source-state'
import { fetchSleepSuccess } from '../sleep/health-kit-actions'

export const OURA_AUTHORIZE_SUCCESS = 'OURA_AUTHORIZE_SUCCESS'
export const OURA_REVOKE_SUCCESS = 'OURA_REVOKE_SUCCESS'
export const OURA_UPDATE_TOKEN = 'OURA_UPDATE_TOKEN'

export const FETCH_SLEEP_OURA_START = 'FETCH_SLEEP_OURA_START'
export const FETCH_SLEEP_OURA_SUCCESS = 'FETCH_SLEEP_OURA_SUCCESS'
export const FETCH_SLEEP_OURA_FAILURE = 'FETCH_SLEEP_OURA_FAILURE'

/* ACTIONS */

export const ouraAuthorizeSuccess = (payload: ResponseBase): ReduxAction => ({
  type: OURA_AUTHORIZE_SUCCESS,
  payload
})

export const ouraRevokeSuccess = (): ReduxAction => ({
  type: OURA_REVOKE_SUCCESS
})

export const ouraUpdateToken = (payload: ResponseBase): ReduxAction => ({
  type: OURA_UPDATE_TOKEN,
  payload
})

export const fetchSleepOuraStart = (): ReduxAction => ({
  type: FETCH_SLEEP_OURA_START
})

export const fetchSleepOuraSuccess = (): ReduxAction => ({
  type: FETCH_SLEEP_OURA_SUCCESS
})

export const fetchSleepOuraFailure = (): ReduxAction => ({
  type: FETCH_SLEEP_OURA_FAILURE
})

/* ASYNC ACTIONS */

export const toggleOura = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const enabled = getOuraEnabled(getState())
    if (enabled) {
      await dispatch(revokeOuraAccess())
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(authorizeOura())
    }
  } catch (err) {
    console.warn('toggleOura err', err)
  }
}

export const authorizeOura = (): Thunk => async (dispatch: Dispatch) => {
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

    await SetKeychainKeyValue(key, value, CONFIG.OURA_CONFIG.bundleId)

    dispatch(
      ouraAuthorizeSuccess({
        enabled: true
      })
    )

    dispatch(setMainSource(SOURCE.OURA))
  } catch (error) {
    console.warn('authorizeOura err', error)
  }
}

export const refreshOuraToken = (): Thunk => async (dispatch: Dispatch) => {
  const { refreshToken: oldToken } = (await GetKeychainParsedValue(
    CONFIG.OURA_CONFIG.bundleId
  )) as OuraAuthorizeResult

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

      await SetKeychainKeyValue(key, value, CONFIG.OURA_CONFIG.bundleId)

      dispatch(
        ouraAuthorizeSuccess({
          enabled: true
        })
      )

      return accessToken
    } catch (error) {
      console.warn('refreshOuraToken err', error)
    }
  }

  return null
}

export const revokeOuraAccess = (): Thunk => async (dispatch: Dispatch) => {
  dispatch(ouraRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getOuraSleep = (
  startDate: string,
  endDate: string
): Thunk => async (dispatch: Dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = (await GetKeychainParsedValue(
    CONFIG.OURA_CONFIG.bundleId
  )) as OuraAuthorizeResult

  dispatch(fetchSleepOuraStart())

  const start = format(new Date(startDate), 'yyyy-MM-dd')
  const end = format(new Date(endDate), 'yyyy-MM-dd')

  if (accessToken) {
    try {
      if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
        const ouraAPICall = await fetch(
          `https://api.ouraring.com/v1/sleep?start=${start}&end=${end}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const response = await ouraAPICall.json()

        const formattedResponse = formatOuraSamples(response.sleep)
        console.log('formattedResponse', formattedResponse)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepOuraSuccess())
      } else {
        const freshToken = await dispatch(refreshOuraToken())
        const ouraAPICall = await fetch(
          `https://api.ouraring.com/v1/sleep?start=${start}&end=${end}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${freshToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const response = await ouraAPICall.json()

        const formattedResponse = formatOuraSamples(response.sleep)

        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepOuraSuccess())
      }
    } catch (error) {
      console.warn('getOuraSleep error', error)
      dispatch(fetchSleepOuraFailure())
    }
  }
}
