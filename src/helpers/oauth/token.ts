import { captureException } from '@sentry/react-native'
import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  getGenericPassword,
  Result,
  setGenericPassword
} from 'react-native-keychain'

export type Garmin = {
  oauthTokenSecret: string | null
  accessToken: string | null
  accessTokenSecret: string | null
}
export type Google = {
  refreshToken: string | null
  accessToken: string
}
export type Polar = {
  refreshToken: string | null
  accessToken: string
}
export type Withings = {
  refreshToken: string | null
  accessToken: string
}
export type Oura = {
  refreshToken: string | null
  accessToken: string
}
export type Fitbit = {
  refreshToken: string | null
  accessToken: string
}

export const setAccess = async <T>(
  service: string,
  tokenData: T
): Promise<false | Result> => {
  try {
    return await setGenericPassword(service, JSON.stringify(tokenData), {
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      service
    })
  } catch (error) {
    captureException(error)
    return error
  }
}

export const getAccess = async <T>(service: string): Promise<T | false> => {
  try {
    const credential = await getGenericPassword({
      service,
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED
    })

    if (credential) {
      return JSON.parse(credential.password)
    }
    return credential
  } catch (error) {
    captureException(error)
    return error
  }
}
