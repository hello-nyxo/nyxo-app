import ReduxAction from '@typings/redux-actions'

const UPDATE_SYNCED = 'UPDATE_SYNCED'

export type NightSyncState = string[]

const initialState: NightSyncState = []

// ADD NIGHTS
// EDIT NIGHT

const reducer = (
  state = initialState,
  { type, payload }: ReduxAction
): NightSyncState => {
  //
  switch (type) {
    case UPDATE_SYNCED:
      return [...new Set([...state, ...(payload as string[])])]
    default:
      return state
  }
}

export default reducer
