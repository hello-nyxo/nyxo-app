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
  } catch (err) {
    console.warn('SetKeychainKeyValue err', err)
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
  } catch (err) {
    console.warn('GetKeychainValue err', err)
  }

  return null
}

export const GetKeychainParsedValue = async (service: string) => {
  const serviceValue = (await GetKeychainKeyValue(service)) as
    | SharedWebCredentials
    | null
    | false

  if (serviceValue) {
    return JSON.parse(serviceValue.password)
  }

  return {}
}
