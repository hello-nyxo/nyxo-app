import { OuraAuthorizeResult, ResponseBase } from 'Types/State/api-state'
import { GetState } from 'Types/GetState'
import { authorize, refresh } from 'react-native-app-auth'
import CONFIG from 'config/Config'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { SOURCE } from 'typings/state/sleep-source-state'
import { getOuraEnabled } from 'store/Selectors/api-selectors/api-selectors'
import moment from 'moment'
import { formatOuraSamples } from 'helpers/sleep/oura-helper'
import { formatSleepData } from '@actions/sleep/sleep-data-actions'
import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { syncNightsToCloud } from '@actions/sleep/night-cloud-actions'
import { SetKeychainKeyValue, GetKeychainParsedValue } from 'helpers/Keychain'

export const OURA_AUTHORIZE_SUCCESS = 'OURA_AUTHORIZE_SUCCESS'
export const OURA_REVOKE_SUCCESS = 'OURA_REVOKE_SUCCESS'
export const OURA_UPDATE_TOKEN = 'OURA_UPDATE_TOKEN'

export const FETCH_SLEEP_OURA_START = 'FETCH_SLEEP_OURA_START'
export const FETCH_SLEEP_OURA_SUCCESS = 'FETCH_SLEEP_OURA_SUCCESS'
export const FETCH_SLEEP_OURA_FAILURE = 'FETCH_SLEEP_OURA_FAILURE'

/* ACTIONS */

export const ouraAuthorizeSuccess = (payload: ResponseBase) => ({
  type: OURA_AUTHORIZE_SUCCESS,
  payload
})

export const ouraRevokeSuccess = () => ({
  type: OURA_REVOKE_SUCCESS
})

export const ouraUpdateToken = (payload: ResponseBase) => ({
  type: OURA_UPDATE_TOKEN,
  payload
})

export const fetchSleepOuraStart = () => ({
  type: FETCH_SLEEP_OURA_START
})

export const fetchSleepOuraSuccess = () => ({
  type: FETCH_SLEEP_OURA_SUCCESS
})

export const fetchSleepOuraFailure = () => ({
  type: FETCH_SLEEP_OURA_FAILURE
})

/* ASYNC ACTIONS */

export const toggleOura = () => async (
  dispatch: Function,
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

export const authorizeOura = () => async (dispatch: Function) => {
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

export const refreshOuraToken = () => async (dispatch: Function) => {
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

export const revokeOuraAccess = () => async (dispatch: Function) => {
  dispatch(ouraRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getOuraSleep = () => async (dispatch: Function) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = (await GetKeychainParsedValue(
    CONFIG.OURA_CONFIG.bundleId
  )) as OuraAuthorizeResult
  dispatch(fetchSleepOuraStart())

  const startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')

  if (accessToken) {
    try {
      if (moment(accessTokenExpirationDate).isAfter(moment())) {
        const ouraAPICall = await fetch(
          `https://api.ouraring.com/v1/sleep?start=${startDate}&end=${endDate}`,
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
        await dispatch(syncNightsToCloud(formattedResponse))
        await dispatch(formatSleepData(formattedResponse))
        await dispatch(fetchSleepOuraSuccess())
      } else {
        const accessToken = await dispatch(refreshOuraToken())
        const ouraAPICall = await fetch(
          `https://api.ouraring.com/v1/sleep?start=${startDate}&end=${endDate}`,
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
        await dispatch(syncNightsToCloud(formattedResponse))
        await dispatch(formatSleepData(formattedResponse))
        await dispatch(fetchSleepOuraSuccess())
      }
    } catch (error) {
      console.warn('getOuraSleep error', error)
      dispatch(fetchSleepOuraFailure())
    }
  }
}
