import { GetUserQuery } from '@API'
import { getUserData, updateUserData } from '@data-fetching/remote/user'
import { QueryResult, useMutation, useQuery } from 'react-query'
import { writeToStorage } from 'persist-queries'

export const useGetUser = (): QueryResult<GetUserQuery['getUser']> => {
  return useQuery('user', getUserData, {
    onSuccess: (data) => writeToStorage('user', data)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUpdateUser = () => {
  return useMutation(updateUserData)
}
