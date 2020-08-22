import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import {
  changeGoogleFitSource,
  setMainSource,
  updateGoogleFitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import {
  fetchSleepData,
  formatSleepData
} from '@actions/sleep/sleep-data-actions'
import CONFIG from 'config/Config'
import { formatGoogleFitData } from 'helpers/sleep/google-fit-helper'
import moment from 'moment'
import { Platform } from 'react-native'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import { getGoogleFitEnabled } from 'store/Selectors/api-selectors/api-selectors'
import { getGoogleFitSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import { Dispatch, Thunk } from 'Types/ReduxActions'
import { SleepDataSource } from 'Types/SleepClockState'
import { Night } from 'Types/Sleepdata'
import { SOURCE, SUB_SOURCE } from 'typings/state/sleep-source-state'
import { GetState } from '../../Types/GetState'
import { syncNightsToCloud } from 'actions/sleep/night-cloud-actions'
import { GoogleFitResponse, ResponseBase } from '../../Types/State/api-state'
import { SetKeychainKeyValue, GetKeychainParsedValue } from 'helpers/Keychain'
/* ACTION TYPES */

export const GOOGLE_FIT_AUTHORIZE_SUCCESS = 'GOOGLE_FIT_AUTHORIZE_SUCCESS'
export const GOOGLE_FIT_REVOKE_SUCCESS = 'GOOGLE_FIT_REVOKE_SUCCESS'
export const GOOGLE_FIT_UPDATE_TOKEN = 'GOOGLE_FIT_UPDATE_TOKEN'

export const FETCH_GOOGLE_FIT_START = 'FETCH_GOOGLE_FIT_START'
export const FETCH_GOOGLE_FIT_SUCCESS = 'FETCH_GOOGLE_FIT_SUCCESS'
export const FETCH_GOOGLE_FIT_FAILURE = 'FETCH_GOOGLE_FIT_FAILURE'

export const GOOGLE_FIT_KEYCHAIN_SERVICE = 'service.fit.google.customized'
/* ACTIONS */

export const googleFitAuthorizeSuccess = (payload: ResponseBase) => ({
  type: GOOGLE_FIT_AUTHORIZE_SUCCESS,
  payload
})

export const googleFitRevokeSuccess = () => ({
  type: GOOGLE_FIT_REVOKE_SUCCESS
})

export const googleFitUpdateToken = (payload: ResponseBase) => ({
  type: GOOGLE_FIT_UPDATE_TOKEN,
  payload
})

/* ASYNC ACTIONS */

export const toggleGoogleFit = (): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const enabled = getGoogleFitEnabled(getState())

    if (enabled) {
      await dispatch(revokeGoogleFitAccess())
      await dispatch(setMainSource(SOURCE.NO_SOURCE))
    } else {
      await dispatch(revokePreviousSource())
      await dispatch(authorizeGoogleFit())
    }
  } catch (err) {
    console.warn(err)
  }
}

export const authorizeGoogleFit = () => async (dispatch: Function) => {
  const config =
    Platform.OS === 'android'
      ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
      : CONFIG.GOOOGLE_FIT_GONFIG_IOS

  try {
    const response = await authorize(config)
    const { accessTokenExpirationDate, refreshToken, accessToken } = response

    const key = GOOGLE_FIT_KEYCHAIN_SERVICE
    const value = JSON.stringify({
      accessTokenExpirationDate,
      refreshToken,
      accessToken
    })

    await SetKeychainKeyValue(key, value, GOOGLE_FIT_KEYCHAIN_SERVICE)

    dispatch(
      googleFitAuthorizeSuccess({
        enabled: true
      })
    )

    dispatch(setMainSource(SOURCE.GOOGLE_FIT))
    dispatch(readGoogleFitSleep())
  } catch (error) {
    console.warn(error)
  }
}

export const refreshGoogleFitToken = () => async (dispatch: Function) => {
  const { refreshToken: oldToken } = (await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as GoogleFitResponse
  const config =
    Platform.OS === 'android'
      ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
      : CONFIG.GOOOGLE_FIT_GONFIG_IOS

  if (oldToken) {
    try {
      const response = await refresh(config, {
        refreshToken: oldToken as string
      })

      const { accessTokenExpirationDate, refreshToken, accessToken } = response

      const key = GOOGLE_FIT_KEYCHAIN_SERVICE
      const value = JSON.stringify({
        accessTokenExpirationDate,
        refreshToken:
          refreshToken && refreshToken.length > 0 ? refreshToken : oldToken,
        accessToken
      })

      await SetKeychainKeyValue(key, value, GOOGLE_FIT_KEYCHAIN_SERVICE)

      return accessToken
    } catch (error) {
      // If the refresh token is not working, handle it by revoking the current user.
      // The saved refresh token in the state tree will be guaranteed to always be the latest.
      // The refresh token is not valid in 2 major cases:
      // - The user revokes the Google Fit access
      // - The refresh token has not been used for 6 months
      await dispatch(revokeGoogleFitAccess())
      console.warn(error)
    }
  }

  return null
}

export const revokeGoogleFitAccess = (): Thunk => async (
  dispatch: Dispatch
) => {
  const { refreshToken: oldToken } = (await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as GoogleFitResponse

  const config =
    Platform.OS === 'android'
      ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
      : CONFIG.GOOOGLE_FIT_GONFIG_IOS
  if (oldToken) {
    try {
      const response = await revoke(config, {
        tokenToRevoke: oldToken
      })
      dispatch(googleFitRevokeSuccess())
    } catch (error) {
      console.warn(error)
    }
  }
  dispatch(googleFitRevokeSuccess())
}

export const readGoogleFitSleep = (): Thunk => async (dispatch: Dispatch) => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = (await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as GoogleFitResponse

  const startDate = moment().subtract(1, 'week').toISOString()
  const endDate = moment().toISOString()

  if (accessToken) {
    try {
      if (moment(accessTokenExpirationDate).isAfter(moment())) {
        const googleApiCall = await fetch(
          `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startDate}&endTime=${endDate}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const response = await googleApiCall.json()

        const formatted = await formatGoogleFitData(response.session)
        await dispatch(syncNightsToCloud(formatted))
        await dispatch(createGoogleFitSources(formatted))
        await dispatch(formatSleepData(formatted))
      } else {
        const newAccessToken = await dispatch(refreshGoogleFitToken())

        if (newAccessToken) {
          const googleApiCall = await fetch(
            `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startDate}&endTime=${endDate}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
                'Content-Type': 'application/json'
              }
            }
          )
          const response = await googleApiCall.json()
          const formatted = await formatGoogleFitData(response.session)
          await dispatch(syncNightsToCloud(formatted))
          await dispatch(createGoogleFitSources(formatted))
          await dispatch(formatSleepData(formatted))
        }
      }
    } catch (error) {
      console.warn('ERROR', error)
    }
  }
}

export const writeGoogleFitSleep = (date?: string) => async (
  dispatch: Function,
  getState: GetState
) => {
  const { accessToken } = (await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as GoogleFitResponse

  if (accessToken) {
    try {
      const formattedDate = moment(date).toISOString()
      const googleApiCall = await fetch(
        `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${formattedDate}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const response = await googleApiCall.json()
    } catch (error) {
      console.warn(error)
    }
  }
}

export const switchGoogleFitSource = (googleFitSource: SUB_SOURCE) => async (
  dispatch: Function
) => {
  dispatch(changeGoogleFitSource(googleFitSource))
  dispatch(fetchSleepData())
}

export const createGoogleFitSources = (nights: Night[]) => async (
  dispatch: Function,
  getState: Function
) => {
  const googleFitSource = getGoogleFitSource(getState())
  const sourceList: SUB_SOURCE[] = []

  nights.forEach((item: Night) => {
    const existingSource = sourceList.find(
      (source: SleepDataSource) => source.sourceId === item.sourceId
    )

    if (!existingSource) {
      sourceList.push({
        sourceName: item.sourceName,
        sourceId: item.sourceId
      })
    }
  })

  dispatch(updateGoogleFitSources(sourceList))
  const noSleepTrackersInState = !googleFitSource

  if (noSleepTrackersInState) {
    const tracker = sourceList[1] ? sourceList[1] : sourceList[0]
    dispatch(changeGoogleFitSource(tracker))
  }
}
