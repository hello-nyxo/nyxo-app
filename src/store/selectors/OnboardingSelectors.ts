import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { OnboardingState } from 'Types/OnboardingState'

const getOnboardingState = (state: State) => state.onboarding

export const getIntercomNeedHelpRead = createSelector(
  getOnboardingState,
  (onboarding: OnboardingState) => onboarding.intercomNeedHelpRead
)

export const getDataOnboardingCompleted = createSelector(
  getOnboardingState,
  (onboarding: OnboardingState) => !!onboarding.dataOnboardingCompleted
)
