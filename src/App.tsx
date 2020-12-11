import Amplify from '@aws-amplify/core'
import { getTheme } from '@selectors/UserSelectors'
import * as Sentry from '@sentry/react-native'
import { State } from '@typings/State'
import * as Analytics from 'appcenter-analytics'
import React from 'react'
import { addEventListener, removeEventListener } from 'react-native-localize'
import Purchases, { PurchaserInfo } from 'react-native-purchases'
import { enableScreens } from 'react-native-screens'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { DefaultTheme } from 'styled-components'
import { ThemeProvider } from 'styled-components/native'
import amplify from './config/Amplify'
import AppWithNavigationState from './config/AppNavigation'
import CONFIG from './config/Config'
import { setI18nConfig } from './config/i18n'
import { darkTheme, lightTheme } from './styles/themes'

if (!__DEV__) {
  Sentry.init({
    dsn: CONFIG.SENTRY_DSN
  })
}

enableScreens()
Amplify.configure(amplify)

interface AppProps {
  theme: DefaultTheme
}

type MakePurchasePromise = Promise<{
  productIdentifier: string
  purchaserInfo: PurchaserInfo
}>

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props)
    setI18nConfig()
  }

  purchaserInfoUpdateListener = (info) => {
    // TODO
  }

  async componentDidMount() {
    SplashScreen.hide()
    this.enableAnalytics()
    addEventListener('change', this.handleLocalizationChange)
    Purchases.setDebugLogsEnabled(true)
    Purchases.setup(CONFIG.REVENUE_CAT)

    Purchases.addPurchaserInfoUpdateListener(this.purchaserInfoUpdateListener)
    Purchases.addShouldPurchasePromoProductListener(
      this.shouldPurchasePromoProduct
    )
  }

  componentWillUnmount() {
    removeEventListener('change', this.handleLocalizationChange)
    Purchases.removePurchaserInfoUpdateListener(
      this.purchaserInfoUpdateListener
    )
    Purchases.removeShouldPurchasePromoProductListener(
      this.shouldPurchasePromoProduct
    )
  }

  handleLocalizationChange = () => {
    setI18nConfig()
    this.forceUpdate()
  }

  shouldPurchasePromoProduct = async (
    deferredPurchase: () => MakePurchasePromise
  ) => {
    try {
      deferredPurchase()
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  enableAnalytics = async () => {
    await Analytics.setEnabled(true)
    Analytics.trackEvent('Opened app')
  }

  render() {
    const { theme } = this.props
    const appTheme = theme && theme.mode === 'dark' ? darkTheme : lightTheme

    return (
      <ThemeProvider theme={appTheme}>
        <AppWithNavigationState />
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state: State) => ({
  theme: getTheme(state)
})

export default connect(mapStateToProps)(App)
