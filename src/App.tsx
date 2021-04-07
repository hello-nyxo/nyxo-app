import Amplify from '@aws-amplify/core'
import { useTheme } from '@hooks/useTheme'
import * as Sentry from '@sentry/react-native'
import React, { FC, useEffect, useRef } from 'react'
import { addEventListener, removeEventListener } from 'react-native-localize'
import Purchases, {
  PurchaserInfo,
  PurchaserInfoUpdateListener
} from 'react-native-purchases'
import { enableScreens } from 'react-native-screens'
import SplashScreen from 'react-native-splash-screen'
import styled, { ThemeProvider } from 'styled-components/native'
import amplify from './config/Amplify'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import CONFIG from './config/config'
import { setI18nConfig } from './config/i18n'
import { darkTheme, lightTheme } from './styles/themes'
import ROUTE from '@config/routes/Routes'
import Root from '@config/routes/RootNavigator'

if (!__DEV__) {
  Sentry.init({
    dsn: CONFIG.SENTRY_DSN
  })
}

enableScreens()
Amplify.configure(amplify)

type MakePurchasePromise = Promise<{
  productIdentifier: string
  purchaserInfo: PurchaserInfo
}>

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
      [ROUTE.TERVEYSTALO]: {
        path: 'link',
        parse: {
          code: (code: string | number) => `${code}`
        }
      },
      [ROUTE.PURCHASE]: {
        path: 'purchase'
      },
      [ROUTE.WEEK]: {
        path: 'week/:slug'
      },
      [ROUTE.LESSON]: {
        path: 'lesson/:slug'
      },
      [ROUTE.APP]: {
        screens: {
          [ROUTE.SETTINGS]: {
            screens: {
              [ROUTE.CLOUD_SETTINGS]: {
                path: 'join'
              }
            }
          }
        }
      },
      [ROUTE.APP]: {
        path: 'app',
        screens: {
          [ROUTE.SETTINGS]: {
            path: 'settings',
            screens: {
              [ROUTE.CLOUD_SETTINGS]: {
                path: 'cloud'
              },
              [ROUTE.GARMIN]: {
                path: 'garmin'
              },
              [ROUTE.SOURCE_SETTINGS]: {
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

  useEffect(() => {
    setI18nConfig()
    SplashScreen.hide()
    addEventListener('change', handleLocalizationChange)
    Purchases.setDebugLogsEnabled(true)
    Purchases.setup(CONFIG.REVENUE_CAT)
    Purchases.addPurchaserInfoUpdateListener(purchaserInfoUpdateListener)
    Purchases.addShouldPurchasePromoProductListener(shouldPurchasePromoProduct)

    return () => {
      removeEventListener('change', handleLocalizationChange)
      Purchases.removePurchaserInfoUpdateListener(purchaserInfoUpdateListener)
      Purchases.removeShouldPurchasePromoProductListener(
        shouldPurchasePromoProduct
      )
    }
  }, [])

  const purchaserInfoUpdateListener: PurchaserInfoUpdateListener = (info) => {
    //FIXME
  }

  const handleLocalizationChange = () => {
    setI18nConfig()
  }

  const shouldPurchasePromoProduct = async (
    deferredPurchase: () => MakePurchasePromise
  ) => {
    try {
      deferredPurchase()
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <StyledStatusBar animated />
      <NavigationContainer
        linking={linking}
        ref={ref}
        theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App

const StyledStatusBar = styled.StatusBar.attrs(({ theme }) => ({
  barStyle: theme.mode === 'dark' ? 'light-content' : 'dark-content',
  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
}))``
