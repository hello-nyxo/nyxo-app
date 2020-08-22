export interface SubscriptionState {
  loading: boolean
  isActive: boolean
  isSandbox?: boolean
  expirationDate?: string
}

export interface SubscriptionResponseiOS {
  originalTransactionDateIOS?: number
  originalTransactionIdentifierIOS?: string
  productId?: string
  transactionDate?: number
  transactionId?: string
  transactionReceipt?: string
}

export enum SubscriptionSource {
  PARTNER = 'PARTNER',
  APP_STORE = 'APP_STORE',
  PLAY_STORE = 'PLAY_STORE'
}
