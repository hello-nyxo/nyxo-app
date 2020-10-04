import Purchases, { PurchasesPackage } from 'react-native-purchases'
import Intercom from 'react-native-intercom'
import CONFIG from '@config/Config'
import { GetState } from '@typings/GetState'
import { updateIntercomInformation } from '../IntercomActions'

const key = CONFIG.SUBSCRIPTION_ENTITLEMENT_KEY as string

/* ACTION TYPES */

export const PURCHASE_SUBSCRIPTION_START = 'PURCHASE_SUBSCRIPTION_START'
export const PURCHASE_SUBSCRIPTION_SUCCESS = 'PURCHASE_SUBSCRIPTION_SUCCESS'
export const PURCHASE_SUBSCRIPTION_FAILURE = 'PURCHASE_SUBSCRIPTION_FAILURE'

export const RESTORE_START = 'RESTORE_START'
export const RESTORE_SUCCESS = 'RESTORE_PURCHASE'
export const RESTORE_FAILURE = 'RESTORE_FAILURE'

export const DISABLE_COACHING = 'DISABLE_COACHING'

/*  ACTIONS */

export const purchaseStart = () => ({
  type: PURCHASE_SUBSCRIPTION_START
})

export const purchaseSuccess = (payload: {
  isActive: boolean
  expirationDate?: string | null
}) => ({
  type: PURCHASE_SUBSCRIPTION_SUCCESS,
  payload
})

export const purchaseFailure = (error: string) => ({
  type: PURCHASE_SUBSCRIPTION_FAILURE,
  payload: error
})

export const restoreStart = () => ({
  type: RESTORE_START
})

export const restoreSuccess = (payload: {
  isActive: boolean
  expirationDate?: string | null
}) => ({
  type: RESTORE_SUCCESS,
  payload
})

export const restoreFailure = () => ({
  type: RESTORE_FAILURE
})

export const purchaseCoachingForAWeek = () => ({
  type: RESTORE_START
})

export const purchaseCoachingForAYear = () => ({
  type: RESTORE_START
})

export const disableCoaching = () => ({
  type: DISABLE_COACHING
})

/* ASYNC ACTIONS */

/**
 * @async
 *  Run on every app start and updates subscription status
 */
export const updateSubscriptionStatus = () => async (
  dispatch: Function,
  getState: GetState
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
    console.warn(error)
  }
}

/**
 * @async
 *  Purchases a new subscription for nyxo coaching and updates Intercom's user information to reflect this.
 */
export const purchaseSubscription = (subscription: PurchasesPackage) => async (
  dispatch: Function
) => {
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
export const restorePurchase = () => async (dispatch: Function) => {
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
    console.warn(error)
    dispatch(restoreFailure())
  }
}
