import { createCoachingData } from '@graphql/mutations'
import { getCoachingData, listCoachingDatas } from '@graphql/queries'
import {
  CreateCoachingDataInput,
  CreateCoachingDataMutation,
  GetCoachingDataQuery,
  ListCoachingDatasQuery,
  UpdateCoachingDataInput,
  UpdateCoachingDataMutation
} from 'API'
import { graphqlOperation, API, Auth } from 'aws-amplify'

export const listCoaching = async (): Promise<
  ListCoachingDatasQuery['listCoachingDatas']
> => {
  const filter: GetCoachingDataQuery = {}
  try {
    const {
      data: { listCoachingDatas: data }
    } = (await API.graphql(graphqlOperation(listCoachingDatas))) as {
      data: ListCoachingDatasQuery
    }

    return data
  } catch (error) {
    return error
  }
}

// type Todo = Omit<Exclude<APIt.GetTodoQuery['getTodo'], null>,
//                  '__typename'>;

export const getCoaching = async (
  key: string,
  { id }: { id: string }
): Promise<GetCoachingDataQuery['getCoachingData']> => {
  try {
    const {
      data: { getCoachingData: data }
    } = (await API.graphql(graphqlOperation(getCoachingData, { id }))) as {
      data: GetCoachingDataQuery
    }

    return data
  } catch (error) {
    return error
  }
}

export const createCoaching = async ({
  coaching
}: {
  coaching: CreateCoachingDataInput
}): Promise<CreateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const input: CreateCoachingDataInput = {
      ...coaching,
      userId: username
    }

    const { data } = (await API.graphql(
      graphqlOperation(createCoachingData, { input })
    )) as {
      data: CreateCoachingDataMutation
    }
    return data
  } catch (error) {
    return error
  }
}

export const updateCoaching = async ({
  coaching
}: {
  coaching: UpdateCoachingDataInput
}): Promise<UpdateCoachingDataMutation> => {
  try {
    const { data } = (await API.graphql(
      graphqlOperation(createCoachingData, { input: coaching })
    )) as {
      data: UpdateCoachingDataMutation
    }
    return data
  } catch (error) {
    return error
  }
}
