import Amplify from '@aws-amplify/core'
import * as Sentry from '@sentry/react-native'
import * as Analytics from 'appcenter-analytics'
import React, { FC, useEffect } from 'react'
import { addEventListener, removeEventListener } from 'react-native-localize'
import Purchases, {
  PurchaserInfo,
  PurchaserInfoUpdateListener
} from 'react-native-purchases'
import { enableScreens } from 'react-native-screens'
import SplashScreen from 'react-native-splash-screen'
import { ThemeProvider } from 'styled-components/native'
import amplify from './config/Amplify'
import AppWithNavigationState from './config/AppNavigation'
import CONFIG from './config/config'
import { setI18nConfig } from './config/i18n'
import { lightTheme } from './styles/themes'

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

export const App: FC = () => {
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
    console.log(info)
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

  const enableAnalytics = async () => {
    await Analytics.setEnabled(true)
    Analytics.trackEvent('Opened app')
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <AppWithNavigationState />
    </ThemeProvider>
  )
}

export default App
