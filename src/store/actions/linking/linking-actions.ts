import { API, graphqlOperation } from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { UpdateConnectionIDMutation } from '@API'
import CONFIG from '@config/Config'
import { updateConnectionId } from '@graphql/custom/mutations'
import { AppThunk } from '@typings/redux-actions'
import { restorePurchase } from '../subscription/subscription-actions'
import {
  LinkingActions,
  LINKING_FAILURE,
  LINKING_START,
  LINKING_SUCCESS,
  REMOVE_LINK_FAILURE,
  REMOVE_LINK_START,
  REMOVE_LINK_SUCCESS
} from './types'

/* ACTIONS */

export const startLinking = (): LinkingActions => ({
  type: LINKING_START
})

export const linkSuccess = (connectionId?: string | null): LinkingActions => ({
  type: LINKING_SUCCESS,
  payload: connectionId
})

export const linkingFailure = (): LinkingActions => ({
  type: LINKING_FAILURE
})

export const removeLinkStart = (): LinkingActions => ({
  type: REMOVE_LINK_START
})

export const removeLinkSuccess = (): LinkingActions => ({
  type: REMOVE_LINK_SUCCESS
})

export const removeLinkFailure = (): LinkingActions => ({
  type: REMOVE_LINK_FAILURE
})

/* ASYNC ACTIONS */

export const linkAccount = (connectionId: string): AppThunk => async (
  dispatch
) => {
  dispatch(startLinking())

  try {
    const { username } = await Auth.currentUserInfo()

    const input = {
      id: username,
      connectionId
    }
    const codeIsValid = await validateLinkCode(connectionId, username)

    if (codeIsValid) {
      const {
        data: { updateUser }
      } = (await API.graphql(
        graphqlOperation(updateConnectionId, { input })
      )) as {
        data: UpdateConnectionIDMutation
      }
      await dispatch(restorePurchase())
      dispatch(linkSuccess(updateUser?.connectionId))
    } else {
      dispatch(linkingFailure())
    }
  } catch (error) {
    dispatch(linkingFailure())
  }
}

export const removeLink = (): AppThunk => async (dispatch) => {
  const { username } = await Auth.currentUserInfo()
  try {
    const input = {
      id: username,
      connectionId: null
    }
    const _ = (await API.graphql(
      graphqlOperation(updateConnectionId, { input })
    )) as UpdateConnectionIDMutation

    dispatch(removeLinkSuccess())
  } catch (error) {
    dispatch(removeLinkFailure())
  }
}

/* HELPERS  */
export const validateLinkCode = async (
  code: string,
  userId: string
): Promise<boolean> => {
  const configuration = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: ''
    },
    body: JSON.stringify({
      hashId: code,
      userId
    })
  }

  try {
    const response = await fetch(CONFIG.LINK_VALIDATION_URL, configuration)
    const { body } = await response.json()
    const { valid, check } = body

    if (valid && check >= 0 && check <= 9) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
