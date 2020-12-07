import CONFIG from '@config/Config'
import { GetKeychainParsedValue, SetKeychainKeyValue } from '@helpers/Keychain'
import { captureException } from '@sentry/react-native'
import { GoogleFitResponse } from '@typings/State/api-state'
import { isAfter } from 'date-fns'
import { Platform } from 'react-native'
import { refresh } from 'react-native-app-auth'

export const GOOGLE_FIT_KEYCHAIN_SERVICE = 'service.fit.google.customized'

export const getGoogleFitToken = async (): Promise<GoogleFitResponse> => {
  const {
    accessToken,
    accessTokenExpirationDate,
    refreshToken: oldToken
  } = ((await GetKeychainParsedValue(
    GOOGLE_FIT_KEYCHAIN_SERVICE
  )) as unknown) as GoogleFitResponse

  if (isAfter(new Date(accessTokenExpirationDate), new Date())) {
    return {
      accessToken,
      accessTokenExpirationDate,
      refreshToken: oldToken,
      enabled: true
    }
  }

  try {
    const config =
      Platform.OS === 'android'
        ? CONFIG.GOOOGLE_FIT_GONFIG_ANDROID
        : CONFIG.GOOOGLE_FIT_GONFIG_IOS

    const response = await refresh(config, {
      refreshToken: oldToken as string
    })

    const {
      accessTokenExpirationDate: newExpirationDate,
      refreshToken,
      accessToken: newAccessToken
    } = response

    const value = JSON.stringify({
      accessTokenExpirationDate: newExpirationDate,
      refreshToken:
        refreshToken && newAccessToken.length > 0 ? newAccessToken : oldToken,
      accessToken
    })

    await SetKeychainKeyValue(
      GOOGLE_FIT_KEYCHAIN_SERVICE,
      value,
      GOOGLE_FIT_KEYCHAIN_SERVICE
    )

    return {
      accessToken,
      accessTokenExpirationDate,
      refreshToken: oldToken,
      enabled: true
    }
  } catch (error) {
    captureException(error)
    return error
  }
}
