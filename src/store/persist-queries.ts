import { queryCache } from 'react-query'
import AsyncStorage from '@react-native-community/async-storage'

// Persist to wherever using the super-secret object
const writeToStorage = async (queryKey: string, data: any): Promise<void> => {
  let storageData = await AsyncStorage.getItem('queries')

  storageData = {
    ...JSON.parse(storageData ?? '{}'),
    [queryKey]: data
  }
  AsyncStorage.setItem('queries', JSON.stringify(storageData))
}

// Hydrate from localStorage

const readFromStorage = async (): Promise<void> => {
  const storageData = await AsyncStorage.getItem('queries')

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
