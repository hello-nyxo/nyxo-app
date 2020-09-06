import { GetUserQuery, UpdateUserMutation } from 'API'
import { getUserData, updateUserData } from 'data-fetching/remote/user'
import {
  MutationResult,
  QueryResult,
  useMutation,
  useQuery,
  MutateFunction
} from 'react-query'

export const useGetUser = (): QueryResult<GetUserQuery['getUser']> => {
  return useQuery(['user'], getUserData)
}

export const useUpdateUser = () => {
  return useMutation(updateUserData)
}
