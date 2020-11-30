import { AppThunk } from '@typings/redux-actions'
import 'react-native-get-random-values'
import Intercom from 'react-native-intercom'
import { v4 } from 'uuid'
import { setIntercomId } from './user/user-actions'

export const registerIntercomUser = (): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    user: { intercomId }
  } = getState()
  const id = intercomId || v4()

  await Intercom.registerIdentifiedUser({
    userId: id
  })

  await dispatch(setIntercomId(id))
}

interface IntercomSubscriptionStatus {
  subscription: 'active' | 'not active'
  latestPurchaseDate?: string
  expirationDate?: string | null
}

export const updateIntercomInformation = async ({
  subscription,
  latestPurchaseDate,
  expirationDate
}: IntercomSubscriptionStatus): Promise<void> => {
  try {
    await Intercom.updateUser({
      custom_attributes: {
        subscription,
        purchase_date: latestPurchaseDate || '',
        expiration_date: expirationDate || 'lifetime'
      }
    })
  } catch (error) {
    return error
  }
}
