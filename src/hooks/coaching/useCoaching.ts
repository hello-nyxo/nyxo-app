import { useQuery, useMutation, QueryResult, MutationResult } from 'react-query'
import { getAllWeeks } from 'data-fetching/remote/content'
import {
  getCoaching,
  createCoaching,
  updateCoaching,
  listCoaching
} from 'data-fetching/remote/coaching'
import {
  CreateCoachingDataMutation,
  ListCoachingDatasQuery,
  GetActiveCoachingQuery,
  GetCoachingDataQuery,
  UpdateCoachingDataInput,
  UpdateCoachingDataMutation
} from 'API'
import { getActiveCoaching } from 'graphql/custom/queries'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { writeToStorage } from 'store/persist-queries'
import { CoachingData } from 'typings/state/coaching-state'
import { updateCoachingData } from 'graphql/mutations'

export const getUserActiveCoaching = async (): Promise<
  GetActiveCoachingQuery['getUser']
> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const {
      data: { getUser: data }
    } = (await API.graphql(
      graphqlOperation(getActiveCoaching, { id: username })
    )) as {
      data: GetActiveCoachingQuery
    }
    return data
  } catch (error) {
    return error
  }
}

export const completeLessonMutation = async ({
  coaching
}: {
  coaching: UpdateCoachingDataInput
}): Promise<UpdateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const input: UpdateCoachingDataInput = {
			...coaching,
			lessons: 
      userId: username
    }

    const { data } = (await API.graphql(
      graphqlOperation(updateCoachingData, { input })
    )) as {
      data: UpdateCoachingDataMutation
    }
    return data
  } catch (error) {
    return error
  }
}

/* HOOKS */

export const useCoachingContent = (): QueryResult<any, any> => {
  return useQuery('content', getAllWeeks)
}

type Rese = Exclude<ListCoachingDatasQuery['listCoachingDatas'], null>
type aa = Rese['items']
export const useListCoaching = (): QueryResult<aa> => {
  return useQuery('listCoaching', listCoaching)
}

export const useGetCoaching = (
  id: string
): QueryResult<GetCoachingDataQuery['getCoachingData']> => {
  return useQuery(['coaching', { id }], getCoaching, {
    onSuccess: (data) => writeToStorage('coaching', data)
  })
}

export const useCreateCoaching = () => {
  return useMutation(createCoaching)
}

export const useUpdateCoaching = () => {
  return useMutation(updateCoaching)
}

export const useGetActiveCoaching = (): QueryResult<
  GetActiveCoachingQuery['getUser']
> => {
  return useQuery('userActiveCoaching', getUserActiveCoaching)
}

export const useGetLesson = (): QueryResult<
  GetActiveCoachingQuery['getUser']
> => {
  return useQuery('userActiveCoaching', getUserActiveCoaching)
}

export const completeWeek = () => {
  return useMutation(updateCoaching)
}

export const completeLesson = () => {
  return useMutation(updateCoaching)
}
