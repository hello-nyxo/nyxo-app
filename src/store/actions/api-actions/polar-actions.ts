import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { getPolarEnabled } from '@selectors/api-selectors/api-selectors'
import CONFIG from '@config/Config'
import { GetKeychainParsedValue, SetKeychainKeyValue } from '@helpers/Keychain'
import { formatPolarSamples } from '@helpers/sleep/polar-helper'
import moment from 'moment'
import { authorize } from 'react-native-app-auth'
import { GetState } from '@typings/GetState'
import { AppThunk } from '@typings/redux-actions'
import { PolarSleepObject } from '@typings/Sleep/Polar'
import { PolarAuthorizeResult, ResponseBase } from '@typings/state/api-state'
import { SOURCE } from '@typings/state/sleep-source-state'
import { format } from 'date-fns'
import { fetchSleepSuccess } from '../sleep/health-kit-actions'
import {
  FETCH_SLEEP_POLAR_FAILURE,
  FETCH_SLEEP_POLAR_START,
  FETCH_SLEEP_POLAR_SUCCESS,
  POLAR_AUTHORIZE_SUCCESS,
  POLAR_REVOKE_SUCCESS,
  POLAR_UPDATE_TOKEN,
  ApiActions
} from './types'

export const polarAuthorizeSuccess = (payload: ResponseBase): ApiActions => ({
  type: POLAR_AUTHORIZE_SUCCESS,
  payload
})

export const polarRevokeSuccess = (): ApiActions => ({
  type: POLAR_REVOKE_SUCCESS
})

export const polarUpdateToken = (payload: ResponseBase): ApiActions => ({
  type: POLAR_UPDATE_TOKEN,
  payload
})

export const fetchSleepPolarStart = (): ApiActions => ({
  type: FETCH_SLEEP_POLAR_START
})

export const fetchSleepPolarSuccess = (): ApiActions => ({
  type: FETCH_SLEEP_POLAR_SUCCESS
})

export const fetchSleepPolarFailure = (): ApiActions => ({
  type: FETCH_SLEEP_POLAR_FAILURE
})

/* ASYNC ACTIONS */

const POLAR_API = 'https://www.polaraccesslink.com/v3/users/sleep/'

export const togglePolar = (): AppThunk => async (
  dispatch,
  getState: GetState
) => {
  const enabled = getPolarEnabled(getState())
  if (enabled) {
    dispatch(revokePolarAccess())
  } else {
    await dispatch(revokePreviousSource())

    await dispatch(authorizePolar())
  }
}

export const authorizePolar = (): AppThunk => async (dispatch) => {
  try {
    const response = (await authorize(
      CONFIG.POLAR_CONFIG
    )) as PolarAuthorizeResult

    const {
      accessTokenExpirationDate,
      accessToken,
      // eslint-disable-next-line camelcase
      tokenAdditionalParameters: { x_user_id }
    } = response

    const key = CONFIG.POLAR_CONFIG.bundleId
    const value = JSON.stringify({
      accessTokenExpirationDate,
      accessToken,
      tokenAdditionalParameters: { x_user_id }
    })

    await SetKeychainKeyValue(key, value, CONFIG.POLAR_CONFIG.bundleId)

    dispatch(
      polarAuthorizeSuccess({
        enabled: true
      })
    )
    dispatch(setMainSource(SOURCE.POLAR))
  } catch (error) {}
}

export const revokePolarAccess = (): AppThunk => async (dispatch) => {
  try {
    const {
      accessToken,
      tokenAdditionalParameters: { x_user_id: userid }
    } = ((await GetKeychainParsedValue(
      CONFIG.POLAR_CONFIG.bundleId
    )) as unknown) as PolarAuthorizeResult

    await fetch(`https://www.polaraccesslink.com/v3/users/${userid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (err) {}

  dispatch(polarRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getPolarSleep = (
  startDate: string,
  endDate: string
): AppThunk => async (dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = ((await GetKeychainParsedValue(
    CONFIG.POLAR_CONFIG.bundleId
  )) as unknown) as PolarAuthorizeResult

  dispatch(fetchSleepPolarStart())

  if (accessToken) {
    try {
      if (moment(accessTokenExpirationDate).isAfter(moment())) {
        // Gonna get the last 28 days
        const polarListNightsApiCall = await fetch(
          `${POLAR_API}2018-03-29T00:39:07+03:00`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        const response = await polarListNightsApiCall.json()
        const sevenNightsSleepData = (<Array<PolarSleepObject>>response?.nights)
          .reverse()
          .slice(7)
        const formattedResponse = formatPolarSamples(sevenNightsSleepData)

        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepPolarSuccess())
      } else {
        const newAccessToken = await dispatch(authorizePolar())

        const polarListNightsApiCall = await fetch(
          `${POLAR_API}${format(new Date(startDate), 'yyyy-MM-dd')}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          }
        )

        const response = await polarListNightsApiCall.json()

        const sevenNightsSleepData = (<Array<PolarSleepObject>>response?.nights)
          .reverse()
          .slice(7)

        const formattedResponse = formatPolarSamples(sevenNightsSleepData)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepPolarSuccess())
      }
    } catch (error) {
      dispatch(fetchSleepPolarFailure())
    }
  }
}
