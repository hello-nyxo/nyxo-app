import {
  LINKING_START,
  LINKING_SUCCESS,
  LINKING_FAILURE,
  REMOVE_LINK_START,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILURE,
  LinkingActions
} from '@actions/linking/types'
import { LinkingState } from '@typings/state/linking-state'

const initialState = {
  linkCode: null,
  loading: false
}

const reducer = (
  state = initialState,
  action: LinkingActions
): LinkingState => {
  switch (action.type) {
    case LINKING_START:
      return { ...state, loading: true }
    case LINKING_SUCCESS:
      return { ...state, loading: false, linkCode: action.payload }
    case LINKING_FAILURE:
      return { ...state, loading: false }
    case REMOVE_LINK_START:
      return { ...state, loading: true }
    case REMOVE_LINK_SUCCESS:
      return { ...state, loading: false, linkCode: '' }
    case REMOVE_LINK_FAILURE:
      return { ...state, loading: false }

    default:
      return state
  }
}

export default reducer
