import { captureException } from '@sentry/react-native'
import * as SecureStore from 'expo-secure-store'

export type Token = {
  refreshToken: string
  accessToken: string
}

export type Result = {
  service: string
  storage: string
}

export type UserCredentials = {
  username: string
  password: string
  service: string
}

export const savAccessToken = async <T>(
  key: string,
  service: string,
  tokenData: T
): Promise<false | Result> => {
  try {
    const storageKey = `${service}_${key}`
    await SecureStore.setItemAsync(storageKey, JSON.stringify(tokenData))
    return { service, storage: storageKey }
  } catch (error) {
    captureException(error)
    return false
  }
}

export const setKeychainValue = async (
  key: string,
  value: string,
  service: string
): Promise<false | Result> => {
  try {
    const storageKey = `${service}_${key}`
    await SecureStore.setItemAsync(storageKey, value)
    return { service, storage: storageKey }
  } catch (error) {
    captureException(error)
    return false
  }
}

export const getKeychainKeyValue = async (
  service: string
): Promise<UserCredentials | boolean> => {
  try {
    const value = await SecureStore.getItemAsync(service)
    if (value) {
      return {
        username: service,
        password: value,
        service
      }
    }
    return false
  } catch (error) {
    captureException(error)
    return false
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
