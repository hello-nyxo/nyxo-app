import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import {
  changeGoogleFitSource,
  setMainSource,
  updateGoogleFitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import { fetchSleepSuccess } from '@actions/sleep/health-kit-actions'
import { syncNightsToCloud } from '@actions/sleep/night-cloud-actions'
import CONFIG from '@config/Config'
import { GetKeychainParsedValue, SetKeychainKeyValue } from '@helpers/Keychain'
import { formatGoogleFitData } from '@helpers/sleep/google-fit-helper'
import { getGoogleFitEnabled } from '@selectors/api-selectors/api-selectors'
import { getGoogleFitSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { captureException } from '@sentry/react-native'
import { AppThunk } from '@typings/redux-actions'
import { Night } from '@typings/Sleepdata'
import { GoogleFitResponse, ResponseBase } from '@typings/state/api-state'
import { SOURCE, SUB_SOURCE } from '@typings/state/sleep-source-state'
import { endOfDay, startOfDay, subHours, subWeeks } from 'date-fns'
import { Platform } from 'react-native'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import { getGoogleFitToken } from '@helpers/oauth/google-fit'
import {
  GOOGLE_FIT_AUTHORIZE_SUCCESS,
  GOOGLE_FIT_REVOKE_SUCCESS,
  GOOGLE_FIT_UPDATE_TOKEN,
  ApiActions
} from './types'

export const GOOGLE_FIT_KEYCHAIN_SERVICE = 'service.fit.google.customized'
const GOOGLE_FIT_API =
  'https://www.googleapis.com/fitness/v1/users/me/sessions?startTime='

/* ACTIONS */

export const googleFitAuthorizeSuccess = (
  payload: ResponseBase
): ApiActions => ({
  type: GOOGLE_FIT_AUTHORIZE_SUCCESS,
  payload
})

export const googleFitRevokeSuccess = (): ApiActions => ({
  type: GOOGLE_FIT_REVOKE_SUCCESS
})

export const googleFitUpdateToken = (payload: ResponseBase): ApiActions => ({
  type: GOOGLE_FIT_UPDATE_TOKEN,
  payload
})

/* ASYNC ACTIONS */

export const toggleGoogleFit = (): AppThunk => async (dispatch, getState) => {
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
    captureException(err)
  }
}

export const authorizeGoogleFit = (): AppThunk => async (dispatch) => {
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
    dispatch(
      readGoogleFitSleep(
        new Date().toISOString(),
        subWeeks(new Date(), 1).toISOString()
      )
    )
  } catch (error) {
    captureException(error)
  }
}

export const refreshGoogleFitToken = (): AppThunk<
  Promise<string | null>
> => async (dispatch): Promise<string | null> => {
  const { refreshToken: oldToken } = ((await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as unknown) as GoogleFitResponse

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
      captureException(error)
    }
  }

  return null
}

export const revokeGoogleFitAccess = (): AppThunk => async (dispatch) => {
  const { refreshToken: oldToken } = ((await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as unknown) as GoogleFitResponse

  const config =
    Platform.OS === 'android'
      ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
      : CONFIG.GOOOGLE_FIT_GONFIG_IOS
  if (oldToken) {
    try {
      await revoke(config, {
        tokenToRevoke: oldToken
      })
      dispatch(googleFitRevokeSuccess())
    } catch (error) {
      captureException(error)
    }
  }
  dispatch(googleFitRevokeSuccess())
}

export const readGoogleFitSleep = (
  startDate: string = startOfDay(new Date()).toISOString(),
  endDate: string = endOfDay(new Date()).toISOString()
): AppThunk => async (dispatch) => {
  const { accessToken } = await getGoogleFitToken()

  try {
    const googleApiCall = await fetch(
      `${GOOGLE_FIT_API}${startDate}&endTime=${endDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const response = await googleApiCall.json()

    console.log(response)
    const formatted = await formatGoogleFitData(response.session)
    await dispatch(syncNightsToCloud(formatted))
    await dispatch(createGoogleFitSources(formatted))
    await dispatch(fetchSleepSuccess(formatted))
  } catch (error) {
    captureException(error)
    console.warn(error)
  }
}

export const registerGoogleFitDevice = async () => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = ((await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as unknown) as GoogleFitResponse

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataSources'
  try {
    const call = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataStreamName: 'Nyxo',
        type: 'raw',
        dataType: {
          name: 'com.google.sleep.segment'
        },
        application: {
          detailsUrl: 'http://nyxo.app',
          name: 'Nyxo',
          version: '1'
        }
      })
    })
    const response = await call.json()

    console.log(response)
  } catch (error) {
    console.warn(error)
  }
}

export const recordGoogleFitSleep = (nights: Night[]): AppThunk => async (
  dispatch
) => {
  const url = 'https://www.googleapis.com/fitness/v1/users/me/sessions/test1'

  const {
    accessToken,
    accessTokenExpirationDate
  } = ((await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as unknown) as GoogleFitResponse

  try {
    const call = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'test1',
        name: 'sleep',
        description: 'Sleep from nyxo',
        startTimeMillis: subHours(new Date(), 3).getTime(),
        endTimeMillis: new Date().getTime(),
        version: 1,

        application: {
          detailsUrl: 'http://nyxo.app',
          name: 'Nyxo',
          version: '1.0'
        },
        activityType: 72 // Sleep
      })
    })
    const response = await call.json()

    console.log(response)
  } catch (error) {
    console.warn(error)
  }

  // const {
  //   accessToken,
  //   accessTokenExpirationDate
  // } = ((await GetKeychainParsedValue(
  //   GOOGLE_FIT_KEYCHAIN_SERVICE
  // )) as unknown) as GoogleFitResponse
  // if (accessToken) {
  // 	try {
  //     if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
  // 			const googleApiCall = await fetch(
  //         `${GOOGLE_FIT_API}${startDate}&endTime=${endDate}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       )
  // 		}
  // }
  // }
}

export const recordDataSource = () => {}

export const createGoogleFitSources = (nights: Night[]): AppThunk => async (
  dispatch,
  getState
) => {
  const googleFitSource = getGoogleFitSource(getState())

  const sourceList: SUB_SOURCE[] = [
    { sourceName: 'Nyxo', sourceId: 'app.sleepcircle.application' }
  ]

  nights.forEach((item: Night) => {
    const existingSource = sourceList.find(
      (source) => source.sourceId === item.sourceId
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
