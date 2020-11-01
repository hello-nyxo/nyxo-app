import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { SubscriptionState } from 'Types/SubscriptionState'

const getSubscriptionState = (state: State) => state.subscriptions

export const getSubscriptionExpiryDate = createSelector(
  getSubscriptionState,
  (subscriptions: SubscriptionState) => subscriptions.expirationDate
)

export const getActiveCoaching = createSelector(
  getSubscriptionState,
  (subscriptions: SubscriptionState) => {
    return subscriptions.isActive
  }
)

export const getLoadingPurchase = createSelector(
  getSubscriptionState,
  (subscriptions: SubscriptionState) => {
    return subscriptions.loading
  }
)
