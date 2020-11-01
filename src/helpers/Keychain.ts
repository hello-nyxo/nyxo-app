import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  getGenericPassword,
  setGenericPassword,
  SharedWebCredentials
} from 'react-native-keychain'

export const SetKeychainKeyValue = async (
  key: string,
  value: string,
  service: string
): Promise<void> => {
  try {
    await setGenericPassword(key, value, {
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      service
    })
  } catch (error) {
    console.warn('SetKeychainKeyValue err', error)
  }
}

export const GetKeychainKeyValue = async (
  service: string
): Promise<SharedWebCredentials | null | false> => {
  try {
    const credential = await getGenericPassword({
      service,
      accessControl: ACCESS_CONTROL.USER_PRESENCE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED
    })

    return credential
  } catch (error) {
    console.warn('GetKeychainValue err', error)
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
