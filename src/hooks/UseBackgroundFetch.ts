import { useEffect, useRef } from 'react'
import BackgroundFetch from 'react-native-background-fetch'
import { setI18nConfig } from '@config/i18n'

const useBackgroundFetch = (
  minimumFetchInterval: number,
  callback: () => void
): void => {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval,
        startOnBoot: false,
        stopOnTerminate: false
      },
      async (taskId) => {
        await setI18nConfig()
        await savedCallback.current()
        BackgroundFetch.finish(taskId)
      },
      (error) => {
        console.warn('[js] RNBackgroundFetch failed to start', error)
      }
    )
  }, [minimumFetchInterval])
}

export default useBackgroundFetch
