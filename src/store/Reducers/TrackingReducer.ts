import { TrackingState } from '../../Types/TrackingState'
import ReduxAction from '../../Types/ReduxActions'

export const TOGGLE_MANUALLY_ADDING = 'TOGGLE_MANUALLY_ADDING'

export const toggleManualButtons = () => ({
  type: TOGGLE_MANUALLY_ADDING
})

const initialState: TrackingState = {
  useChargerTracking: false,
  isTrackingAutomatically: false,
  automaticTrackingStarted: null,
  automaticTrackingEnded: null,
  isTracking: null,
  showManualButtons: false
}

const reducer = (state = initialState, action: ReduxAction): TrackingState => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_MANUALLY_ADDING:
      return { ...state, showManualButtons: !state.showManualButtons }

    default:
      return { ...state }
  }
}

export default reducer
