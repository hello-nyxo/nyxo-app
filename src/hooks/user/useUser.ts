import { GetUserQuery } from 'API'
import { getUserData, updateUserData } from 'data-fetching/remote/user'
import { QueryResult, useMutation, useQuery } from 'react-query'
import { writeToStorage } from 'store/persist-queries'

export const useGetUser = (): QueryResult<GetUserQuery['getUser']> => {
  return useQuery('user', getUserData, {
    onSuccess: (data) => writeToStorage('user', data)
  })
}

export const useUpdateUser = () => {
  return useMutation(updateUserData)
}
