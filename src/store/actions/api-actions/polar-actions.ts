import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { getPolarEnabled } from '@selectors/api-selectors/api-selectors'
import CONFIG from 'config/Config'
import { GetKeychainParsedValue, SetKeychainKeyValue } from 'helpers/Keychain'
import { formatPolarSamples } from 'helpers/sleep/polar-helper'
import moment from 'moment'
import { authorize } from 'react-native-app-auth'
import { GetState } from 'Types/GetState'
import ReduxAction, { Dispatch, Thunk } from 'Types/ReduxActions'
import { PolarSleepObject } from 'Types/Sleep/Polar'
import { PolarAuthorizeResult, ResponseBase } from 'Types/State/api-state'
import { SOURCE } from 'typings/state/sleep-source-state'
import { fetchSleepSuccess } from '../sleep/health-kit-actions'

export const POLAR_AUTHORIZE_SUCCESS = 'POLAR_AUTHORIZE_SUCCESS'
export const POLAR_REVOKE_SUCCESS = 'POLAR_REVOKE_SUCCESS'
export const POLAR_UPDATE_TOKEN = 'POLAR_UPDATE_TOKEN'

export const FETCH_SLEEP_POLAR_START = 'FETCH_SLEEP_POLAR_START'
export const FETCH_SLEEP_POLAR_SUCCESS = 'FETCH_SLEEP_POLAR_SUCCESS'
export const FETCH_SLEEP_POLAR_FAILURE = 'FETCH_SLEEP_POLAR_FAILURE'

export const polarAuthorizeSuccess = (payload: ResponseBase): ReduxAction => ({
  type: POLAR_AUTHORIZE_SUCCESS,
  payload
})

export const polarRevokeSuccess = (): ReduxAction => ({
  type: POLAR_REVOKE_SUCCESS
})

export const polarUpdateToken = (payload: ResponseBase): ReduxAction => ({
  type: POLAR_UPDATE_TOKEN,
  payload
})

export const fetchSleepPolarStart = (): ReduxAction => ({
  type: FETCH_SLEEP_POLAR_START
})

export const fetchSleepPolarSuccess = (): ReduxAction => ({
  type: FETCH_SLEEP_POLAR_SUCCESS
})

export const fetchSleepPolarFailure = (): ReduxAction => ({
  type: FETCH_SLEEP_POLAR_FAILURE
})

export const togglePolar = (): Thunk => async (
  dispatch: Dispatch,
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

export const authorizePolar = (): Thunk => async (dispatch: Dispatch) => {
  try {
    const response = (await authorize(
      CONFIG.POLAR_CONFIG
    )) as PolarAuthorizeResult

    const {
      accessTokenExpirationDate,
      accessToken,
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

export const revokePolarAccess = (): Thunk => async (dispatch: Dispatch) => {
  try {
    const {
      accessToken,
      tokenAdditionalParameters: { x_user_id: userid }
    } = (await GetKeychainParsedValue(
      CONFIG.POLAR_CONFIG.bundleId
    )) as PolarAuthorizeResult

    await fetch(`https://www.polaraccesslink.com/v3/users/${userid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (err) {
    console.log('revokePolarAccess', err)
  }

  dispatch(polarRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getPolarSleep = (): Thunk => async (dispatch: Dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = (await GetKeychainParsedValue(
    CONFIG.POLAR_CONFIG.bundleId
  )) as PolarAuthorizeResult

  dispatch(fetchSleepPolarStart())

  if (accessToken) {
    try {
      if (moment(accessTokenExpirationDate).isAfter(moment())) {
        // Gonna get the last 28 days
        const polarListNightsApiCall = await fetch(
          `https://www.polaraccesslink.com/v3/users/sleep`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        const response = await polarListNightsApiCall.json()
        const sevenNightsSleepData = (<Array<PolarSleepObject>>response.nights)
          .reverse()
          .slice(7)
        const formattedResponse = formatPolarSamples(sevenNightsSleepData)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepPolarSuccess())
      } else {
        const newAccessToken = await dispatch(authorizePolar())

        const polarListNightsApiCall = await fetch(
          `https://www.polaraccesslink.com/v3/users/sleep`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          }
        )

        const response = await polarListNightsApiCall.json()
        const sevenNightsSleepData = (<Array<PolarSleepObject>>response.nights)
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
