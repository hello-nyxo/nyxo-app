import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { getWithingsEnabled } from '@selectors/api-selectors/api-selectors'
import { captureException } from '@sentry/react-native'
import CONFIG from '@config/Config'
import { getKeychainParsedValue, setKeychainValue } from '@helpers/Keychain'
import { formatWithingsSamples } from '@helpers/sleep/withings-helper'
import { authorize, refresh, RefreshResult } from 'react-native-app-auth'
import { AppThunk } from '@typings/redux-actions'
import { ResponseBase, WithingsAuthorizeResult } from '@typings/state/api-state'
import { SOURCE } from '@typings/state/sleep-source-state'
import { format, isAfter, subWeeks } from 'date-fns'
import {
  FETCH_SLEEP_WITHINGS_FAILURE,
  FETCH_SLEEP_WITHINGS_START,
  FETCH_SLEEP_WITHINGS_SUCCESS,
  WITHINGS_AUTHORIZE_SUCCESS,
  WITHINGS_REVOKE_SUCCESS,
  WITHINGS_UPDATE_TOKEN,
  ApiActions
} from './types'

export const withingsAuthorizeSuccess = (
  payload: ResponseBase
): ApiActions => ({
  type: WITHINGS_AUTHORIZE_SUCCESS,
  payload
})

export const withingsRevokeSuccess = (): ApiActions => ({
  type: WITHINGS_REVOKE_SUCCESS
})

export const withingsUpdateToken = (payload: ResponseBase): ApiActions => ({
  type: WITHINGS_UPDATE_TOKEN,
  payload
})

export const fetchSleepWithingsStart = (): ApiActions => ({
  type: FETCH_SLEEP_WITHINGS_START
})

export const fetchSleepWithingsSuccess = (): ApiActions => ({
  type: FETCH_SLEEP_WITHINGS_SUCCESS
})

export const fetchSleepWithingsFailure = (): ApiActions => ({
  type: FETCH_SLEEP_WITHINGS_FAILURE
})

/* ASYNC ACTIONS */

const WITHINGS_API =
  'https://wbsapi.withings.net/v2/sleep?action=getsummary&startdateymd='

export const toggleWithings = (): AppThunk => async (dispatch, getState) => {
  const enabled = getWithingsEnabled(getState())
  if (enabled) {
    dispatch(revokeWithingsAccess())
  } else {
    await dispatch(revokePreviousSource())

    await dispatch(authorizeWithings())
  }
}

export const authorizeWithings = (): AppThunk => async (dispatch) => {
  try {
    const response = (await authorize(
      CONFIG.WITHINGS_CONFIG
    )) as WithingsAuthorizeResult

    const {
      accessTokenExpirationDate,
      refreshToken,
      accessToken,
      tokenAdditionalParameters: { userid }
    } = response

    const key = CONFIG.WITHINGS_CONFIG.bundleId
    const value = JSON.stringify({
      accessTokenExpirationDate,
      refreshToken,
      accessToken,
      tokenAdditionalParameters: { userid }
    })

    await setKeychainValue(key, value, CONFIG.WITHINGS_CONFIG.bundleId)

    dispatch(
      withingsAuthorizeSuccess({
        enabled: true
      })
    )
    dispatch(setMainSource(SOURCE.WITHINGS))
  } catch (error) {
    captureException(error)
  }
}

export const refreshWithingsToken = (): AppThunk => async (dispatch) => {
  const { refreshToken: oldToken } = ((await getKeychainParsedValue(
    CONFIG.WITHINGS_CONFIG.bundleId
  )) as unknown) as WithingsAuthorizeResult

  if (oldToken) {
    try {
      const response = (await refresh(CONFIG.WITHINGS_CONFIG, {
        refreshToken: oldToken
      })) as WithingsRefreshResult

      const {
        accessTokenExpirationDate,
        refreshToken,
        accessToken,
        // eslint-disable-next-line camelcase
        additionalParameters: { userid: user_id }
      } = response

      const key = CONFIG.WITHINGS_CONFIG.bundleId
      const value = JSON.stringify({
        accessTokenExpirationDate,
        refreshToken:
          refreshToken && refreshToken.length > 0 ? refreshToken : oldToken,
        accessToken,
        additionalParameters: { userid: user_id }
      })

      await setKeychainValue(key, value, CONFIG.WITHINGS_CONFIG.bundleId)

      dispatch(
        withingsAuthorizeSuccess({
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

export const revokeWithingsAccess = (): AppThunk => async (dispatch) => {
  dispatch(withingsRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

export const getWithingsSleep = (
  startDate?: string,
  endDate?: string
): AppThunk => async (dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = ((await getKeychainParsedValue(
    CONFIG.WITHINGS_CONFIG.bundleId
  )) as unknown) as WithingsAuthorizeResult

  dispatch(fetchSleepWithingsStart())

  const start = startDate || format(subWeeks(new Date(), 1), 'YYYY-MM-DD')
  const end = endDate || format(new Date(), 'YYYY-MM-DD')

  const dataFields =
    'deepsleepduration,durationtosleep,durationtowakeup,sleep_score,snoring, snoringepisodecount'

  if (accessToken) {
    try {
      if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
        const withingsApiCall = await fetch(
          `${WITHINGS_API}${start}&enddateymd=${end}&data_fields=${dataFields}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        const response = await withingsApiCall.json()
        const formattedResponse = formatWithingsSamples(response.body.series)
        await dispatch(fetchSleepSuccess(formattedResponse))
        await dispatch(fetchSleepWithingsSuccess())
      } else {
        const newAccessToken = await dispatch(refreshWithingsToken())

        const withingsApiCall = await fetch(
          `${WITHINGS_API}${start}&enddateymd=${end}&data_fields=${dataFields}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          }
        )

        const response = await withingsApiCall.json()
        const formattedResponse = formatWithingsSamples(response.body.series)
        await dispatch(syncNightsToCloud(formattedResponse))

        await dispatch(fetchSleepWithingsSuccess())
      }
    } catch (error) {
      dispatch(fetchSleepWithingsFailure())
      captureException(error)
    }
  }
}

interface WithingsRefreshResult extends RefreshResult {
  refreshToken: string
  additionalParameters: {
    userid: string
  }
}
