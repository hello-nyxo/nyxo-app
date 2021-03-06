import {
  GetActiveCoachingQuery,
  GetCoachingDataQuery,
  UpdateCoachingDataInput,
  UpdateCoachingDataMutation
} from '@API'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import {
  CoachingItems,
  createCoaching,
  deleteCoaching,
  getCoaching,
  listCoaching,
  updateCoaching
} from '@data-fetching/remote/coaching'
import { getActiveCoaching } from '@graphql/custom/queries'
import { updateCoachingData } from '@graphql/mutations'
import { queryCache, QueryResult, useMutation, useQuery } from 'react-query'
import { writeToStorage } from 'persist-queries'
import { isLoggedIn } from '@helpers/auth'

export type CoachingPeriod = Exclude<
  Exclude<GetCoachingDataQuery['getCoachingData'], null>,
  null
> | null

export const getUserActiveCoaching = async (): Promise<CoachingPeriod | null> => {
  if (!(await isLoggedIn())) return null

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
      return data?.activeCoaching as CoachingPeriod
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

export const useListCoaching = (): QueryResult<CoachingItems | null> => {
  return useQuery('listCoaching', listCoaching)
}

export const useGetCoaching = (
  id: string
): QueryResult<GetCoachingDataQuery['getCoachingData']> => {
  return useQuery(['coaching', { id }], getCoaching, {
    onSuccess: (data) => writeToStorage('coaching', data)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCreateCoaching = () => {
  return useMutation(createCoaching)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUpdateCoaching = () => {
  return useMutation(updateCoaching, {
    onSuccess: () => {
      queryCache.invalidateQueries('userActiveCoaching')
      queryCache.invalidateQueries('listCoaching')
    }
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDeleteCoaching = () => {
  return useMutation(deleteCoaching, {
    onSuccess: () => {
      queryCache.invalidateQueries('userActiveCoaching')
      queryCache.invalidateQueries('listCoaching')
    }
  })
}

export const useGetActiveCoaching = (): QueryResult<CoachingPeriod | null> => {
  return useQuery('userActiveCoaching', getUserActiveCoaching, {
    onSuccess: (data) => writeToStorage('userActiveCoaching', data)
  })
}
