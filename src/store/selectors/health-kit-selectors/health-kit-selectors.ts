import { createSelector } from 'reselect'
import { State } from '@typings/State'
import HealthKitState from '@typings/state/health-kit-state'

const getHealthKitState = (state: State) => state.healthKit

export const getHealthKitLoading = createSelector(
  getHealthKitState,
  (state: HealthKitState) => state.loading
)
