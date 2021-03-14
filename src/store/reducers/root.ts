import { combineReducers } from 'redux'
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
  nights: nightsReducer
})

export default rootReducer
