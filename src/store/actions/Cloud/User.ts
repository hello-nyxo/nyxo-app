import { setAuthStatus, updateUserFromCloud } from '@actions/user/user-actions'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getUser } from '@graphql/queries'

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
