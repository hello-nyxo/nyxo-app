import { API, graphqlOperation, Auth } from 'aws-amplify'
import { getUser } from '../../graphql/queries'
import { updateUser } from '../../graphql/mutations'
import { sendError } from '../NotificationActions'
import { GetState } from '../../Types/GetState'
import { setAuthStatus, updateUserFromCloud } from '../user/user-actions'

export const checkAuthStatus = () => async (dispatch: Function) => {
  const user = await Auth.currentUserInfo()
  if (user) {
    await dispatch(setAuthStatus(true))
  } else {
    dispatch(setAuthStatus(false))
  }
}

export const getUserData = () => async (dispatch: Function) => {
  try {
    const { username } = await Auth.currentUserInfo()
    const res: any = await API.graphql(
      graphqlOperation(getUser, { id: username })
    )
    await dispatch(updateUserFromCloud(res.data.getUser))
  } catch (error) {}
}
