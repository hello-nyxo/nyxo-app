import { queryCache } from 'react-query'
import AsyncStorage from '@react-native-community/async-storage'

const writeToStorage = async (queryKey: string, data: any): Promise<void> => {
  try {
    let storageData = await AsyncStorage.getItem('queries')

    storageData = {
      ...JSON.parse(storageData ?? '{}'),
      [queryKey]: data
    }
    AsyncStorage.setItem('queries', JSON.stringify(storageData))
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
