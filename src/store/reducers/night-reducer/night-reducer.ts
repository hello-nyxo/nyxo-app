import { FETCH_SLEEP_SUCCESS, SleepActions } from '@actions/sleep/types'
import { Night } from '@typings/Sleepdata'

export type NightState = {
  nights: Night[]
}

const initialState: NightState = {
  nights: []
}

const reducer = (state = initialState, action: SleepActions): NightState => {
  switch (action.type) {
    case FETCH_SLEEP_SUCCESS: {
      if (action.payload) {
        const nights: Night[] = []
        state?.nights?.forEach((night) => {
          if (nights.find((n) => n.id === night.id)) {
            return
          }
          nights.push(night)
        })

        action.payload.forEach((night) => {
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
