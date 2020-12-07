import { captureException } from '@sentry/react-native'
import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  getGenericPassword,
  Result,
  setGenericPassword,
  SharedWebCredentials,
  UserCredentials
} from 'react-native-keychain'

export const SetKeychainKeyValue = async (
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

export const GetKeychainKeyValue = async (
  service: string
): Promise<UserCredentials | false> => {
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

export const GetKeychainParsedValue = async (
  service: string
): Promise<Record<string, unknown> | string> => {
  const serviceValue = (await GetKeychainKeyValue(service)) as
    | SharedWebCredentials
    | null
    | false

  if (serviceValue) {
    return JSON.parse(serviceValue.password)
  }

  return {}
}
