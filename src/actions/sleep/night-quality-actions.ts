import { NightQuality, NightQualityState } from 'Types/Sleep/NightQuality'
import { Dispatch } from 'redux'
import { GetState } from 'Types/GetState'
import { API, graphqlOperation } from 'aws-amplify'
import { v4 } from 'uuid'
import { createNightRating, updateNightRating } from 'graphql/mutations'
import {
  CreateNightRatingInput,
  ModelNightRatingFilterInput,
  ListNightRatingsQuery,
  UpdateNightRatingInput
} from 'API'
import { dispatch } from 'd3'
import { listNightRatings } from 'graphql/queries'
import RatingModal from 'components/RatingModal'

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

export const updateNightQualityLocally = (nightQuality: NightQuality) => ({
  type: UPDATE_NIGHT_QUALITY_LOCAL,
  payload: nightQuality
})

export const pushNightQualityLocally = (nightQuality: NightQuality) => ({
  type: PUSH_NIGHT_QUALITY_LOCAL,
  payload: nightQuality
})

export const popNightQualityLocally = () => ({
  type: POP_NIGHT_QUALITY_LOCAL
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

const convertNightQualityFromCloudToMap = (
  cloudNightRatings: Array<NightQuality>
) => {
  const map = new Map<string, NightQuality>()

  cloudNightRatings.forEach((rating) => {
    map.set(rating.date, rating)
  })

  return map
}

export const rateNight = ({ id, rating, date }: NightQuality) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const {
    user: { authenticated, username },
    nightQuality
  } = getState()

  date = date && date.length > 0 ? date : ''

  const newNightRating: NightQuality = {
    id,
    rating,
    date
  }

  try {
    // Handle cloud update if user is logged in
    if (authenticated) {
      // We check to see if the rating for date already exists
      // If it exists, we update its data in the cloud
      if (checkRecordExists(nightQuality, date)) {
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
          id
        }

        await API.graphql(
          graphqlOperation(createNightRating, { input: createNightRatingInput })
        )

        await dispatch(pushNightQuality(newNightRating))
      }
    } else {
      // If record already exists, we update it
      if (checkRecordExists(nightQuality, date)) {
        await dispatch(updateNightQualityLocally(newNightRating))
      }
      // If not, we handle it as local data
      else {
        // If the new night rating will break the size, we pop the 1st element (the oldest night rating) so the array always remains 31 elements
        if (checkIfWillExceedQuantity(nightQuality)) {
          await dispatch(popNightQualityLocally())
        }

        // Push the new one in as the 31st element
        await dispatch(pushNightQualityLocally(newNightRating))
      }
    }
  } catch (err) {
    console.log('rateNight', err)
  }
}

const checkRecordExists = ({ records }: NightQualityState, date: string) => {
  // const index = records.findIndex((nightQuality) => (nightQuality.id = date))

  // return index !== -1
  return records.has(date)
}

const checkIfWillExceedQuantity = ({ records }: NightQualityState) => {
  // return records.length === 31
  return records.size === 31
}
