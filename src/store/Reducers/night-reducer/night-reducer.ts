import ReduxAction from 'Types/ReduxActions'
import { Night } from 'Types/Sleepdata'

type State = {
  nights: Night[]
}

const initialState = {
  nights: []
}

// ADD NIGHTS
// EDIT NIGHT

const reducer = (
  state = initialState,
  { type, payload }: ReduxAction
): State => {
  //
  switch (type) {
    // payload: Night[]
    case 'UPDATE_NIGHTS':
      return initialState
    default:
      return initialState
  }
}
