import { useQuery, useMutation, QueryResult, MutationResult } from 'react-query'
import { getAllWeeks } from 'data-fetching/remote/content'
import {
  getCoaching,
  createCoaching,
  updateCoaching,
  listCoaching
} from 'data-fetching/remote/coaching'
import { CreateCoachingDataMutation, ListCoachingDatasQuery } from 'API'

export const useCoachingContent = (): QueryResult<any, any> => {
  return useQuery('content', getAllWeeks)
}

export const useListCoaching = (): QueryResult<
  ListCoachingDatasQuery['listCoachingDatas'],
  any
> => {
  return useQuery('listCoaching', listCoaching)
}

export const useGetCoaching = (id: string): QueryResult<any, any> => {
  return useQuery(['coaching', { id }], getCoaching)
}

export const useCreateCoaching = () => {
  return useMutation(createCoaching)
}

export const useUpdateCoaching = () => {
  return useMutation(updateCoaching)
}
