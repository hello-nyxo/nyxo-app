import { OuraResponse, OuraAuthorizeResult } from 'Types/State/api-state'
import { GetState } from 'Types/GetState'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import CONFIG from 'config/Config'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { SOURCE } from 'typings/state/sleep-source-state'
import {
  getOuraToken,
  getOuraEnabled
} from 'store/Selectors/api-selectors/api-selectors'
import moment from 'moment'
import { formatOuraSamples } from 'helpers/sleep/oura-helper'
import { formatSleepData } from '@actions/sleep/sleep-data-actions'
import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'

export const OURA_AUTHORIZE_SUCCESS = 'OURA_AUTHORIZE_SUCCESS'
export const OURA_REVOKE_SUCCESS = 'OURA_REVOKE_SUCCESS'
export const OURA_UPDATE_TOKEN = 'OURA_UPDATE_TOKEN'

export const FETCH_SLEEP_OURA_START = 'FETCH_SLEEP_OURA_START'
export const FETCH_SLEEP_OURA_SUCCESS = 'FETCH_SLEEP_OURA_SUCCESS'
export const FETCH_SLEEP_OURA_FAILURE = 'FETCH_SLEEP_OURA_FAILURE'

/* ACTIONS */

export const ouraAuthorizeSuccess = (payload: OuraResponse) => ({
  type: OURA_AUTHORIZE_SUCCESS,
  payload
})

export const ouraRevokeSuccess = () => ({
  type: OURA_REVOKE_SUCCESS
})

export const ouraUpdateToken = (payload: OuraResponse) => ({
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
      dispatch(revokeOuraAccess())
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(authorizeOura())
    }
  } catch (err) {
    console.warn(err)
  }
}

export const authorizeOura = () => async (dispatch: Function) => {
  try {
    const response = (await authorize(
      CONFIG.OURA_CONFIG
    )) as OuraAuthorizeResult

    const { accessTokenExpirationDate, refreshToken, accessToken } = response

    dispatch(
      ouraAuthorizeSuccess({
        accessTokenExpirationDate,
        refreshToken,
        accessToken,
        enabled: true
      })
    )

    dispatch(setMainSource(SOURCE.OURA))
  } catch (error) {
    console.log('authorizeOura', error)
  }
}

export const refreshOuraToken = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const { refreshToken: oldToken } = getOuraToken(getState())

  if (oldToken) {
    try {
      const response = (await refresh(CONFIG.OURA_CONFIG, {
        refreshToken: oldToken
      })) as OuraAuthorizeResult

      const { accessTokenExpirationDate, refreshToken, accessToken } = response
      dispatch(
        ouraAuthorizeSuccess({
          accessTokenExpirationDate,
          refreshToken:
            refreshToken && refreshToken.length > 0 ? refreshToken : oldToken,
          accessToken,
          enabled: true
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export const revokeOuraAccess = () => async (
  dispatch: Function,
  getState: GetState
) => {
  dispatch(ouraRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getOuraSleep = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const { accessToken, accessTokenExpirationDate } = getOuraToken(getState())
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
        dispatch(formatSleepData(formattedResponse))
        dispatch(fetchSleepOuraSuccess())
      } else {
        await dispatch(refreshOuraToken())
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
        dispatch(formatSleepData(formattedResponse))
        dispatch(fetchSleepOuraSuccess())
      }
    } catch (error) {
      console.warn('error', error)
      dispatch(fetchSleepOuraFailure())
    }
  }
}
