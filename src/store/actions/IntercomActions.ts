import 'react-native-get-random-values'
import { v4 } from 'uuid'
import Intercom from 'react-native-intercom'
import { GetState } from '@typings/GetState'
import { setIntercomId } from './user/user-actions'

export const registerIntercomUser = () => async (
  dispatch: Function,
  getState: GetState
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

export const updateUnreadCount = (count: number) => async (
  dispatch: Function
) => {}

interface IntercomSubscriptionStatus {
  subscription: 'active' | 'not active'
  latestPurchaseDate?: string
  expirationDate?: string | null
}

export const updateIntercomInformation = async ({
  subscription,
  latestPurchaseDate,
  expirationDate
}: IntercomSubscriptionStatus) => {
  await Intercom.updateUser({
    custom_attributes: {
      subscription,
      purchase_date: latestPurchaseDate || '',
      expiration_date: expirationDate || 'lifetime'
    }
  })
}
