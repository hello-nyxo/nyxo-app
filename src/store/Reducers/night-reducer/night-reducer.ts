import ReduxAction from 'Types/ReduxActions'
import { Night } from 'Types/Sleepdata'
import { FETCH_SLEEP_SUCCESS } from 'store/actions/sleep/health-kit-actions'

export type NightState = Night[]

const initialState: NightState = []

// ADD NIGHTS
// EDIT NIGHT

const reducer = (
  state = initialState,
  { type, payload }: ReduxAction
): NightState => {
  //
  switch (type) {
    // payload: Night[]
    case FETCH_SLEEP_SUCCESS:
      return [...payload]
    default:
      return state
  }
}

export default reducer
