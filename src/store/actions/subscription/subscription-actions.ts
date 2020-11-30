import CONFIG from '@config/Config'
import ReduxAction, { AppThunk, Dispatch } from '@typings/redux-actions'
import Intercom from 'react-native-intercom'
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import { updateIntercomInformation } from '../IntercomActions'
import {
  PurchaseActionTypes,
  RESTORE_START,
  RESTORE_SUCCESS,
  RESTORE_FAILURE,
  PURCHASE_SUBSCRIPTION_START,
  PURCHASE_SUBSCRIPTION_SUCCESS,
  PURCHASE_SUBSCRIPTION_FAILURE
} from './types'

const key = CONFIG.SUBSCRIPTION_ENTITLEMENT_KEY as string

export const purchaseStart = (): PurchaseActionTypes => ({
  type: PURCHASE_SUBSCRIPTION_START
})

export const purchaseSuccess = (payload: {
  isActive: boolean
  expirationDate?: string | null
}): ReduxAction => ({
  type: PURCHASE_SUBSCRIPTION_SUCCESS,
  payload
})

export const purchaseFailure = (error: string): PurchaseActionTypes => ({
  type: PURCHASE_SUBSCRIPTION_FAILURE,
  payload: error
})

export const restoreStart = (): PurchaseActionTypes => ({
  type: RESTORE_START
})

export const restoreSuccess = (payload: {
  isActive: boolean
  expirationDate?: string | null
}): PurchaseActionTypes => ({
  type: RESTORE_SUCCESS,
  payload
})

export const restoreFailure = (error: string): PurchaseActionTypes => ({
  type: RESTORE_FAILURE,
  payload: error
})

/* ASYNC ACTIONS */

/**
 * @async
 *  Run on every app start and updates subscription status
 */
export const updateSubscriptionStatus = (): AppThunk => async (
  dispatch: Dispatch
) => {
  try {
    const {
      entitlements: { active }
    } = await Purchases.getPurchaserInfo()
    if (typeof active[key] !== 'undefined') {
      const { expirationDate, latestPurchaseDate } = active[key]
      await updateIntercomInformation({
        subscription: 'not active',
        latestPurchaseDate,
        expirationDate
      })
      dispatch(purchaseSuccess({ isActive: true, expirationDate }))
    } else {
      await updateIntercomInformation({
        subscription: 'not active'
      })
      dispatch(purchaseSuccess({ isActive: false }))
    }
  } catch (error) {
    dispatch(purchaseFailure(error))
  }
}

/**
 * @async
 *  Purchases a new subscription for nyxo coaching and updates Intercom's user information to reflect this.
 */
export const purchaseSubscription = (
  subscription: PurchasesPackage
): AppThunk => async (dispatch: Dispatch) => {
  dispatch(purchaseStart())
  try {
    const { purchaserInfo } = await Purchases.purchasePackage(subscription)
    if (typeof purchaserInfo.entitlements.active[key] !== 'undefined') {
      const {
        isActive,
        expirationDate,
        latestPurchaseDate
      } = purchaserInfo.entitlements.active[key]

      await Intercom.updateUser({
        custom_attributes: {
          subscription: 'active',
          purchase_date: latestPurchaseDate,
          expiration_date: expirationDate || 'lifetime'
        }
      })

      dispatch(purchaseSuccess({ isActive, expirationDate }))
    }
  } catch (error) {
    dispatch(purchaseFailure(error))
  }
}

/**
 * @async
 * Restores a user's previous purchases and enables coaching for user
 */
export const restorePurchase = (): AppThunk => async (dispatch) => {
  dispatch(restoreStart())
  try {
    const purchaserInfo = await Purchases.restoreTransactions()
    if (typeof purchaserInfo.entitlements.active[key] !== 'undefined') {
      dispatch(
        restoreSuccess({
          isActive: true,
          expirationDate: purchaserInfo.entitlements.active[key].expirationDate
        })
      )
    } else {
      dispatch(restoreSuccess({ isActive: false }))
    }
  } catch (error) {
    dispatch(restoreFailure(error))
  }
}
