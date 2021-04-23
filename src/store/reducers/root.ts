import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from './theme'
import onboardingReducer from './onboarding'
import linkingReducer from './linking'
import manualSleepReducer from './manual-sleep'
import calendarReducer from './calendar'
import subscriptionReducer from './subscription'
import modalReducer from './modal'
import authReducer from './auth'
import sourceReducer from './source'
import nightsReducer from './nights'
import sleepReducer from './sleep'

import fitbitReducer from './apis/fitbit'
import ouraReducer from './apis/oura'
import healthKitReducer from './apis/health-kit'
import withingsReducer from './apis/withings'
import polarReducer from './apis/polar'

const rootReducer = combineReducers({
  theme: themeReducer,
  onboarding: onboardingReducer,
  linking: linkingReducer,
  manualSleep: manualSleepReducer,
  calendar: calendarReducer,
  subscription: subscriptionReducer,
  modal: modalReducer,
  auth: authReducer,
  source: sourceReducer,
  nights: nightsReducer,
  sleep: sleepReducer,
  fitbit: fitbitReducer,
  oura: ouraReducer,
  withings: withingsReducer,
  healthKit: healthKitReducer,
  polar: polarReducer
})

export default rootReducer
