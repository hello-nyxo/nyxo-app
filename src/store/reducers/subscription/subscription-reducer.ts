import { SubscriptionState } from '@typings/SubscriptionState'
import {
  PurchaseActionTypes,
  RESTORE_START,
  RESTORE_SUCCESS,
  RESTORE_FAILURE,
  PURCHASE_SUBSCRIPTION_START,
  PURCHASE_SUBSCRIPTION_SUCCESS,
  PURCHASE_SUBSCRIPTION_FAILURE
} from '@actions/subscription/types'

export const initialState: SubscriptionState = {
  loading: false,
  isActive: false
}

const reducer = (
  state = initialState,
  action: PurchaseActionTypes
): SubscriptionState => {
  switch (action.type) {
    case RESTORE_START:
      return { ...state, loading: true }

    case RESTORE_SUCCESS: {
      return {
        ...state,
        isActive: action.payload.isActive,
        expirationDate: action.payload.expirationDate,
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
        isActive: action.payload.isActive,
        expirationDate: action.payload.expirationDate
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
