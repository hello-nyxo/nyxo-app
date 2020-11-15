import { API, graphqlOperation } from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { UpdateConnectionIDMutation } from '@API'
import CONFIG from '@config/Config'
import { updateConnectionId } from '@graphql/custom/mutations'
import { Thunk } from '@typings/redux-actions'
import { restorePurchase } from '../subscription/subscription-actions'

/* ACTIONS TYPES */
export const LINKING_START = 'LINKING_START'
export const LINKING_SUCCESS = 'LINKING_SUCCESS'
export const LINKING_FAILURE = 'LINKING_FAILURE'

export const REMOVE_LINK_START = 'REMOVE_LINK_START'
export const REMOVE_LINK_SUCCESS = 'REMOVE_LINK_SUCCESS'
export const REMOVE_LINK_FAILURE = 'REMOVE_LINK_FAILURE'

/* ACTIONS */

export const startLinking = () => ({
  type: LINKING_START
})

export const linkSuccess = (connectionId?: string | null) => ({
  type: LINKING_SUCCESS,
  payload: connectionId
})

export const linkingFailure = () => ({
  type: LINKING_FAILURE
})

export const removeLinkStart = () => ({
  type: REMOVE_LINK_START
})

export const removeLinkSuccess = () => ({
  type: REMOVE_LINK_SUCCESS
})

export const removeLinkFailure = () => ({
  type: REMOVE_LINK_FAILURE
})

/* ASYNC ACTIONS */

export const linkAccount = (connectionId: string): Thunk => async (
  dispatch: Dispatch
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
    console.warn(error)
    dispatch(linkingFailure())
  }
}

export const removeLink = () => async (dispatch: Function) => {
  const { username } = await Auth.currentUserInfo()
  try {
    const input = {
      id: username,
      connectionId: null
    }
    const response: any = await API.graphql(
      graphqlOperation(updateConnectionId, { input })
    )
    dispatch(removeLinkSuccess())
  } catch (error) {
    console.warn(error)
    dispatch(removeLinkFailure())
  }
}

export const getConnectionId = () => async (dispatch: Function) => {
  const { username } = await Auth.currentUserInfo()
  try {
    const input = {
      id: username,
      connectionId: null
    }
    // const response: any = await API.graphql(graphqlOperation(updateConnectionId, { input }));
    // dispatch(removeLinkSuccess());
  } catch (error) {
    // dispatch(removeLinkFailure());
  }
}

/* HELPERS  */
export const validateLinkCode = async (code: string, userId: string) => {
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
    const { valid, check, userId } = body

    if (valid && check >= 0 && check <= 9) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
