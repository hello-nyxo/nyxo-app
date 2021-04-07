import { captureException } from '@sentry/react-native'
import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  getGenericPassword,
  Result,
  setGenericPassword,
  UserCredentials
} from 'react-native-keychain'

export type Token = {
  refreshToken: string
  accessToken: string
}

export const savAccessToken = async <T>(
  key: string,
  service: string,
  tokenData: T
): Promise<false | Result> => {
  try {
    return await setGenericPassword(key, JSON.stringify(tokenData), {
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      service
    })
  } catch (error) {
    captureException(error)
    return error
  }
}

export const setKeychainValue = async (
  key: string,
  value: string,
  service: string
): Promise<false | Result> => {
  try {
    return await setGenericPassword(key, value, {
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      service
    })
  } catch (error) {
    captureException(error)
    return error
  }
}

export const getKeychainKeyValue = async (
  service: string
): Promise<UserCredentials | boolean> => {
  try {
    const credential = await getGenericPassword({
      service,
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED
    })

    return credential
  } catch (error) {
    captureException(error)
    return error
  }
}

export const getKeychainParsedValue = async <T>(
  service: string
): Promise<T | undefined> => {
  try {
    const serviceValue = await getKeychainKeyValue(service)
    if (typeof serviceValue !== 'boolean' && serviceValue?.password) {
      return JSON.parse(serviceValue.password) as T
    }
    return undefined
  } catch (error) {
    return undefined
  }
}
