import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import {
  changeGoogleFitSource,
  setMainSource,
  updateGoogleFitSources
} from '@actions/sleep-source-actions/sleep-source-actions'
import { fetchSleepSuccess } from '@actions/sleep/health-kit-actions'
import CONFIG from '@config/Config'
import { getKeychainParsedValue, setKeychainValue } from '@helpers/Keychain'
import { getGoogleFitToken } from '@helpers/oauth/google-fit'
import { formatGoogleFitData } from '@helpers/sleep/google-fit-helper'
import { getGoogleFitEnabled } from '@selectors/api-selectors/api-selectors'
import { captureException } from '@sentry/react-native'
import { AppThunk } from '@typings/redux-actions'
import { Night } from '@typings/Sleepdata'
import { GoogleFitResponse, ResponseBase } from '@typings/state/api-state'
import { SOURCE, SUB_SOURCE } from '@typings/state/sleep-source-state'
import { endOfDay, startOfDay, subWeeks } from 'date-fns'
import { Platform } from 'react-native'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import { v4 } from 'uuid'
import {
  ApiActions,
  GOOGLE_FIT_AUTHORIZE_SUCCESS,
  GOOGLE_FIT_REVOKE_SUCCESS,
  GOOGLE_FIT_UPDATE_TOKEN
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

    await setKeychainValue(key, value, GOOGLE_FIT_KEYCHAIN_SERVICE)

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
  const { refreshToken: oldToken } = ((await getKeychainParsedValue(
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

      await setKeychainValue(key, value, GOOGLE_FIT_KEYCHAIN_SERVICE)

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
  const { refreshToken: oldToken } = ((await getKeychainParsedValue(
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

    const formatted = await formatGoogleFitData(response.session)
    await dispatch(createGoogleFitSources(formatted))
    await dispatch(fetchSleepSuccess(formatted))
  } catch (error) {
    captureException(error)
    return error
  }
}

export const registerGoogleFitDevice = async (): Promise<void> => {
  const { accessToken } = await getGoogleFitToken()

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataSources'
  try {
    await fetch(url, {
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
  } catch (error) {
    captureException(error)
    return error
  }
}

export const recordGoogleFitSleep = (
  startDate: string,
  endDate: string
): AppThunk => async () => {
  const id = v4()

  const url = `https://www.googleapis.com/fitness/v1/users/me/sessions/${id}`

  const { accessToken } = await getGoogleFitToken()

  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name: 'Nyxo',
        description: 'Sleep from nyxo',
        startTimeMillis: new Date(startDate).getTime(),
        endTimeMillis: new Date(endDate).getTime(),
        version: 1,

        application: {
          detailsUrl: 'http://nyxo.app',
          name: 'Nyxo',
          version: '1.0'
        },
        activityType: 72 // Sleep
      })
    })
  } catch (error) {
    captureException(error)
    return error
  }
}

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
