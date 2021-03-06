import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

function useAppState(): string {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState)
    }

    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  return appState
}

export default useAppState
