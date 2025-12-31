import { Amplify } from 'aws-amplify'
import { useTheme } from '@hooks/useTheme'
import * as Sentry from '@sentry/react-native'
import React, { FC, useEffect, useRef, useCallback } from 'react'
import * as Localization from 'expo-localization'
import * as SplashScreen from 'expo-splash-screen'
import styled, { ThemeProvider } from 'styled-components/native'
import amplify from './config/Amplify'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import CONFIG from './config/Config'
import { setI18nConfig } from './config/i18n'
import { darkTheme, lightTheme } from './styles/themes'
import Root from '@config/routes/RootNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2
    }
  }
})

if (!__DEV__) {
  Sentry.init({
    dsn: CONFIG.SENTRY_DSN
  })
}

Amplify.configure(amplify)

const linking = {
  prefixes: [
    'https://nyxo.fi',
    'https://nyxo.app',
    'https://nyxo.app/fi',
    'https://*.nyxo.app',
    'https://get.nyxo.fi',
    'https://auth.nyxo.app',
    'nyxo://'
  ],
  config: {
    screens: {
      Terveystalo: {
        path: 'link',
        parse: {
          code: (code: string | number) => `${code}`
        }
      },
      Purchase: {
        path: 'purchase'
      },
      Week: {
        path: 'week/:slug'
      },
      Lesson: {
        path: 'lesson/:slug'
      },
      App: {
        screens: {
          Settings: {
            screens: {
              Cloud: {
                path: 'join'
              },
              Garmin: {
                path: 'garmin'
              },
              Sources: {
                path: 'callback'
              }
            }
          }
        }
      }
    }
  }
}

export const App: FC = () => {
  const theme = useTheme()
  const ref = useRef(null)

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  useEffect(() => {
    setI18nConfig()
    onLayoutRootView()

    // RevenueCat setup would go here
    // Purchases.configure({ apiKey: CONFIG.REVENUE_CAT })
  }, [onLayoutRootView])

  const handleLocalizationChange = useCallback(() => {
    setI18nConfig()
  }, [])

  useEffect(() => {
    // Listen for locale changes
    // Expo Localization doesn't have a listener, but the app will re-render on changes
  }, [handleLocalizationChange])

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <StatusBar
            style={theme === 'dark' ? 'light' : 'dark'}
            backgroundColor={theme === 'dark' ? darkTheme.PRIMARY_BACKGROUND_COLOR : lightTheme.PRIMARY_BACKGROUND_COLOR}
          />
          <NavigationContainer
            linking={linking}
            ref={ref}
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Root />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
