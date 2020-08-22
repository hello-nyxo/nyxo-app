import { createSelector } from 'reselect'
import { State } from '../../Types/State'
import { TrackingState } from '../../Types/TrackingState'

const getTrackingState = (state: State) => state.tracking

export const getShowManualButtons = createSelector(
  getTrackingState,
  (tracking: TrackingState) => tracking.showManualButtons
)
