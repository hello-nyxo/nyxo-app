import AsyncStorage from '@react-native-async-storage/async-storage'
import { queryCache } from 'react-query'

const writeToStorage = async (
  queryKey: string,
  data: unknown
): Promise<void | boolean> => {
  try {
    let storageData = await AsyncStorage.getItem('queries')

    storageData = {
      ...JSON.parse(storageData ?? '{}'),
      [queryKey]: data
    }
    AsyncStorage.setItem('queries', JSON.stringify(storageData))
    return true
  } catch (error) {
    return error
  }
}

const readFromStorage = async (key: string): Promise<void> => {
  const storageData = await AsyncStorage.getItem(key)

  if (storageData !== null) {
    const queriesWithData = JSON.parse(storageData)

    Object.keys(queriesWithData).forEach((queryKey) => {
      const data = queriesWithData[queryKey]
      const queryKeyParsed = JSON.parse(queryKey)
      queryCache.setQueryData(queryKeyParsed, data)
    })
  }
}

export { readFromStorage, writeToStorage }
