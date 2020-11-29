export const PURCHASE_SUBSCRIPTION_START = 'PURCHASE_SUBSCRIPTION_START'
export const PURCHASE_SUBSCRIPTION_SUCCESS = 'PURCHASE_SUBSCRIPTION_SUCCESS'
export const PURCHASE_SUBSCRIPTION_FAILURE = 'PURCHASE_SUBSCRIPTION_FAILURE'

export const RESTORE_START = 'RESTORE_START'
export const RESTORE_SUCCESS = 'RESTORE_PURCHASE'
export const RESTORE_FAILURE = 'RESTORE_FAILURE'

type PurchaseAction = {
  type: typeof PURCHASE_SUBSCRIPTION_START
}

type PurchaseSuccessAction = {
  type: typeof PURCHASE_SUBSCRIPTION_SUCCESS
  payload: {
    isActive: boolean
    expirationDate?: string | null
  }
}

type PurchaseFailAction = {
  type: typeof PURCHASE_SUBSCRIPTION_FAILURE
  payload: string
}

type RestoreAction = {
  type: typeof RESTORE_START
}

type RestoreSuccessAction = {
  type: typeof RESTORE_SUCCESS
  payload: {
    isActive: boolean
    expirationDate?: string | null
  }
}

type RestoreFailAction = {
  type: typeof RESTORE_FAILURE
  payload: string
}

export type PurchaseActionTypes =
  | PurchaseAction
  | PurchaseSuccessAction
  | PurchaseFailAction
  | RestoreAction
  | RestoreSuccessAction
  | RestoreFailAction
