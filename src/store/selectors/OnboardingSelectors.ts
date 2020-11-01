import { createSelector } from 'reselect'
import { State } from '@typings/State'
import { OnboardingState } from '@typings/OnboardingState'

const getOnboardingState = (state: State) => state.onboarding

export const getIntercomNeedHelpRead = createSelector(
  getOnboardingState,
  (onboarding: OnboardingState) => onboarding.intercomNeedHelpRead
)

export const getDataOnboardingCompleted = createSelector(
  getOnboardingState,
  (onboarding: OnboardingState) => !!onboarding.dataOnboardingCompleted
)
