import {
  GetActiveCoachingQuery,
  GetCoachingDataQuery,
  ListCoachingDatasQuery,
  UpdateCoachingDataInput,
  UpdateCoachingDataMutation
} from '@API'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import {
  createCoaching,
  getCoaching,
  listCoaching,
  updateCoaching
} from '@data-fetching/remote/coaching'
import { getActiveCoaching } from '@graphql/custom/queries'
import { updateCoachingData } from '@graphql/mutations'
import { queryCache, QueryResult, useMutation, useQuery } from 'react-query'
import { writeToStorage } from 'persist-queries'

export type CoachingPeriod = Exclude<
  Exclude<GetCoachingDataQuery['getCoachingData'], null>,
  null
>

export const getUserActiveCoaching = async (): Promise<Exclude<
  Exclude<GetActiveCoachingQuery['getUser'], null>['activeCoaching'],
  null
> | null> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const {
      data: { getUser: data }
    } = (await API.graphql(
      graphqlOperation(getActiveCoaching, { id: username })
    )) as {
      data: GetActiveCoachingQuery
    }

    if (data?.activeCoaching) {
      return data?.activeCoaching
    }

    return null
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

type Result = Exclude<
  ListCoachingDatasQuery['listCoachingDatas'],
  null
>['items']

export const useListCoaching = (): QueryResult<Result> => {
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
  return useMutation(updateCoaching, {
    onSuccess: () => {
      queryCache.invalidateQueries('userActiveCoaching')
    }
  })
}

export const useGetActiveCoaching = (): QueryResult<Exclude<
  Exclude<GetActiveCoachingQuery['getUser'], null>['activeCoaching'],
  null
> | null> => {
  return useQuery('userActiveCoaching', getUserActiveCoaching, {
    onSuccess: (data) => writeToStorage('userActiveCoaching', data)
  })
}

export const useGetLesson = (): QueryResult<Exclude<
  Exclude<GetActiveCoachingQuery['getUser'], null>['activeCoaching'],
  null
> | null> => {
  return useQuery('userActiveCoaching', getUserActiveCoaching)
}
