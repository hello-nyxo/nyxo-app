import { NightQuality, NightQualityState } from 'Types/Sleep/NightQuality'
import { Dispatch } from 'redux'
import { GetState } from 'Types/GetState'
import { API, graphqlOperation } from 'aws-amplify'
import { createNightRating, updateNightRating } from 'graphql/mutations'
import {
  CreateNightRatingInput,
  ModelNightRatingFilterInput,
  UpdateNightRatingInput
} from 'API'
import { listNightRatings } from 'graphql/queries'
import { v4 } from 'uuid'

export const UPDATE_NIGHT_QUALITY = 'UPDATE_NIGHT_QUALITY'
export const PUSH_NIGHT_QUALITY = 'PUSH_NIGHT_QUALITY'
export const LOAD_NIGHT_QUALITY_FROM_CLOUD = 'LOAD_NIGHT_QUALITY_FROM_CLOUD'
export const UPDATE_NIGHT_QUALITY_LOCAL = 'UPDATE_NIGHT_QUALITY_LOCAL'
export const PUSH_NIGHT_QUALITY_LOCAL = 'PUSH_NIGHT_QUALITY_LOCAL'
export const POP_NIGHT_QUALITY_LOCAL = 'POP_NIGHT_QUALITY_LOCAL'

export const updateNightQuality = (nightQuality: NightQuality) => ({
  type: UPDATE_NIGHT_QUALITY,
  payload: nightQuality
})

export const pushNightQuality = (nightQuality: NightQuality) => ({
  type: PUSH_NIGHT_QUALITY,
  payload: nightQuality
})

export const loadNightQualityFromCloud = (
  nightQualityFromCloud: Map<string, NightQuality>
) => ({
  type: LOAD_NIGHT_QUALITY_FROM_CLOUD,
  payload: nightQualityFromCloud
})

export const getNightRatingsFromCloud = (username?: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    if (!username) {
      const {
        user: { authenticated }
      } = getState()

      if (authenticated)
        username = getState().user.username as string | undefined
      else username = 'unknown'
    }

    const variables: {
      filter: ModelNightRatingFilterInput
      limit?: number
      nextToken?: string
    } = {
      filter: {
        userId: {
          eq: username
        }
      }
    }
    const response = (await API.graphql(
      graphqlOperation(listNightRatings, variables)
    )) as any

    const cloudNightRatings: Array<NightQuality> =
      response.data.listNightRatings.items

    await dispatch(
      loadNightQualityFromCloud(
        convertNightQualityFromCloudToMap(cloudNightRatings)
      )
    )
  } catch (err) {
    console.log('getNightRatingsFromCloud', err)
  }
}

export const convertNightQualityFromCloudToMap = (
  cloudNightRatings: Array<NightQuality>
) => {
  const map = new Map<string, NightQuality>()

  cloudNightRatings.forEach((rating) => {
    map.set(rating.date, rating)
  })

  return map
}

export const rateNight = ({
  rating,
  date
}: {
  rating: number
  date: string | undefined
}) => async (dispatch: Dispatch, getState: GetState) => {
  const {
    user: { authenticated, username },
    nightQuality
  } = getState()

  date = date && date.length > 0 ? date : 'undefined' //Because aws doesn't accept empty string

  try {
    // Handle cloud update if user is logged in
    if (authenticated) {
      // We check to see if the rating for date already exists
      // If it exists, we update its data in the cloud
      if (checkRecordExists(nightQuality, date)) {
        const newNightRating: NightQuality = {
          id: nightQuality.records.get(date)?.id as string,
          rating,
          date
        }

        const updateNightRatingInput: UpdateNightRatingInput = {
          date,
          userId: username as string,
          rating,
          id: nightQuality.records.get(date)?.id as string
        }

        await API.graphql(
          graphqlOperation(updateNightRating, { input: updateNightRatingInput })
        )

        await dispatch(updateNightQuality(newNightRating))
      }

      // If it doesn't exist, we create a new one in the cloud
      else {
        const createNightRatingInput: CreateNightRatingInput = {
          date,
          userId: username as string,
          rating,
          id: v4()
        }

        const newNightRating: NightQuality = {
          id: createNightRatingInput.id as string,
          rating,
          date
        }

        await API.graphql(
          graphqlOperation(createNightRating, { input: createNightRatingInput })
        )

        await dispatch(pushNightQuality(newNightRating))
      }
    }
  } catch (err) {
    console.log('rateNight', err)
  }
}

const checkRecordExists = ({ records }: NightQualityState, date: string) => {
  return records.has(date)
}
