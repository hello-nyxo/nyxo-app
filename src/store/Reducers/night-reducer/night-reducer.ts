import ReduxAction from '@typings/redux-actions'
import { Night } from '@typings/Sleepdata'
import { FETCH_SLEEP_SUCCESS } from '@actions/sleep/health-kit-actions'

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
    case FETCH_SLEEP_SUCCESS:
      return [...(payload as Night[])]
    default:
      return state
  }
}

export default reducer
