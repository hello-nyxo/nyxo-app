import { GOOGLE_FIT_KEYCHAIN_SERVICE } from '@actions/api-actions/google-fit-actions'
import CONFIG from '@config/Config'
import { GetKeychainParsedValue, SetKeychainKeyValue } from '@helpers/Keychain'
import { formatGoogleFitData } from '@helpers/sleep/google-fit-helper'
import { GoogleFitResponse } from '@typings/state/api-state'
import { isAfter, subDays } from 'date-fns'
import { Platform } from 'react-native'
import { refresh } from 'react-native-app-auth'

const GOOGLE_FIT_API = `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=`

export const readGoogleFitSleep = async (): Promise<void> => {
  const {
    accessToken,
    accessTokenExpirationDate
  } = ((await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as unknown) as GoogleFitResponse

  const startDate = subDays(new Date(), 1).toISOString()
  const endDate = new Date().toISOString()

  if (accessToken) {
    try {
      if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
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
        return await formatGoogleFitData(response.session)
      }

      const newAccessToken = await refreshGoogleFitToken()

      if (newAccessToken) {
        const googleApiCall = await fetch(
          `${GOOGLE_FIT_API}${startDate}&endTime=${endDate}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const response = await googleApiCall.json()
        return await formatGoogleFitData(response.session)
      }
    } catch (error) {
      console.warn('ERROR', error)
    }
  }
}

export const refreshGoogleFitToken = async () => {
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
      await revokeGoogleFitAccess()
      console.warn(error)
    }
  }

  return null
}

export const revokeGoogleFitAccess = async (): Promise<> => {
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
