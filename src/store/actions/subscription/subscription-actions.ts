import CONFIG from '@config/Config'
import ReduxAction, { AppThunk } from '@typings/redux-actions'
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import {
  PurchaseActionTypes,
  PURCHASE_SUBSCRIPTION_FAILURE,
  PURCHASE_SUBSCRIPTION_START,
  PURCHASE_SUBSCRIPTION_SUCCESS,
  RESTORE_FAILURE,
  RESTORE_START,
  RESTORE_SUCCESS
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
export const updateSubscriptionStatus = (): AppThunk => async (dispatch) => {
  try {
    const {
      entitlements: { active }
    } = await Purchases.getPurchaserInfo()
    if (typeof active[key] !== 'undefined') {
      const { expirationDate } = active[key]

      dispatch(purchaseSuccess({ isActive: true, expirationDate }))
    } else {
      dispatch(purchaseSuccess({ isActive: false }))
    }
  } catch (error) {
    dispatch(purchaseFailure(error))
  }
}

export const purchaseSubscription = (
  subscription: PurchasesPackage | undefined
): AppThunk => async (dispatch) => {
  dispatch(purchaseStart())
  try {
    if (!subscription) {
      throw new Error('subscription was undefined')
    }
    const { purchaserInfo } = await Purchases.purchasePackage(subscription)
    if (typeof purchaserInfo.entitlements.active[key] !== 'undefined') {
      const { isActive, expirationDate } = purchaserInfo.entitlements.active[
        key
      ]

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
