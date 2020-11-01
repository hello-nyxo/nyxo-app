import ReduxAction from '@typings/redux-actions'
import {
  DATA_ONBOARDING_COMPLETED,
  INTERCOM_NEED_HELP_READ
} from '@actions/onboarding/onboarding-actions'
import { OnboardingState } from '@typings/OnboardingState'

export const initialState: OnboardingState = {
  intercomNeedHelpRead: false,
  dataOnboardingCompleted: false
}

const reducer = (
  state = initialState,
  { type }: ReduxAction
): OnboardingState => {
  switch (type) {
    case INTERCOM_NEED_HELP_READ:
      return { ...state, intercomNeedHelpRead: true }

    case DATA_ONBOARDING_COMPLETED:
      return { ...state, dataOnboardingCompleted: true }
    default:
      return state
  }
}

export default reducer
