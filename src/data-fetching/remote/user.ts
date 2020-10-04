import { updateUser } from '@graphql/mutations'
import { getUser } from '@graphql/queries'
import { UpdateUserMutation, GetUserQuery, UpdateUserInput } from '@API'
import { API, graphqlOperation, Auth } from 'aws-amplify'

export const updateUserData = async ({
  user
}: {
  user: UpdateUserInput
}): Promise<UpdateUserMutation['updateUser']> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const input = {
      ...user,
      id: username
    }

    const {
      data: { updateUser: data }
    } = (await API.graphql(graphqlOperation(updateUser, { input }))) as {
      data: UpdateUserMutation
    }
    return data
  } catch (error) {
    return error
  }
}

export const getUserData = async (): Promise<GetUserQuery['getUser']> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const {
      data: { getUser: data }
    } = (await API.graphql(graphqlOperation(getUser, { id: username }))) as {
      data: GetUserQuery
    }
    return data
  } catch (error) {
    return error
  }
}
