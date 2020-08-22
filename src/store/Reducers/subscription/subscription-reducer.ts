import ReduxAction from 'Types/ReduxActions'
import { SubscriptionState } from 'Types/SubscriptionState'
import {
  RESTORE_START,
  RESTORE_SUCCESS,
  RESTORE_FAILURE,
  PURCHASE_SUBSCRIPTION_START,
  PURCHASE_SUBSCRIPTION_SUCCESS,
  PURCHASE_SUBSCRIPTION_FAILURE
} from '@actions/subscription/subscription-actions'

export const initialState: SubscriptionState = {
  loading: false,
  isActive: false
}

const reducer = (
  state = initialState,
  action: ReduxAction
): SubscriptionState => {
  const { type, payload } = action

  switch (type) {
    case RESTORE_START:
      return { ...state, loading: true }

    case RESTORE_SUCCESS: {
      return {
        ...state,
        isActive: payload.isActive,
        expirationDate: payload.expirationDate,
        loading: false
      }
    }

    case RESTORE_FAILURE: {
      return { ...state, loading: false }
    }

    case PURCHASE_SUBSCRIPTION_START: {
      return { ...state, loading: true }
    }

    case PURCHASE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        isActive: payload.isActive,
        expirationDate: payload.expirationDate
      }
    }

    case PURCHASE_SUBSCRIPTION_FAILURE: {
      return { ...state, loading: false }
    }

    default:
      return state
  }
}

export default reducer
