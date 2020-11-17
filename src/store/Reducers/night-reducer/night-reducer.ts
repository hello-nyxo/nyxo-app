import ReduxAction from '@typings/redux-actions'
import { Night } from '@typings/Sleepdata'
import { FETCH_SLEEP_SUCCESS } from '@actions/sleep/health-kit-actions'
import { forEach } from 'lodash'

export type NightState = {
  nights: Night[]
}

const initialState: NightState = {
  nights: []
}

// ADD NIGHTS
// EDIT NIGHT

const reducer = (
  state = initialState,
  { type, payload }: ReduxAction
): NightState => {
  //
  switch (type) {
    case FETCH_SLEEP_SUCCESS: {
      if (payload as Night[] | undefined) {
        const nights: Night[] = []
        state.nights.forEach((night) => {
          if (nights.find((n) => n.id === night.id)) {
            return
          }
          nights.push(night)
        })

        payload.forEach((night) => {
          if (nights.find((n) => n.id === night.id)) {
            return
          }
          nights.push(night)
        })

        return { ...state, nights }
      }

      return state
    }
    default:
      return state
  }
}

export default reducer
