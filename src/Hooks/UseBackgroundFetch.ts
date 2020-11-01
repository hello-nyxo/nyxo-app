import { useEffect, useRef } from 'react'
import BackgroundFetch from 'react-native-background-fetch'
import { setI18nConfig } from '@config/i18n'

const useBackgroundFetch = (
  minimumFetchInterval: number,
  callback: () => void
) => {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval,
        startOnBoot: false, // Prevent background events when Android device is rebooted
        stopOnTerminate: false // Prevent background events when the app is terminated in Android
      },
      async (taskId) => {
        await setI18nConfig()
        await savedCallback.current()
        BackgroundFetch.finish(taskId)
      },
      (error: any) => {
        console.warn('[js] RNBackgroundFetch failed to start')
      }
    )
  }, [])
}

export default useBackgroundFetch
