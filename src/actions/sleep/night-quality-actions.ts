import { NightQuality, NightQualityGeneral } from 'Types/Sleep/NightQuality'
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

export const UPDATE_NIGHT_QUALITY = 'UPDATE_NIGHT_QUALITY'
export const PUSH_NIGHT_QUALITY = 'PUSH_NIGHT_QUALITY'
export const POP_NIGHT_QUALITY = 'POP_NIGHT_QUALITY'

export const updateNightQuality = (nightQuality: NightQuality) => ({
  type: UPDATE_NIGHT_QUALITY,
  payload: nightQuality
})

export const pushNightQuality = (nightQuality: NightQuality) => ({
  type: PUSH_NIGHT_QUALITY,
  payload: nightQuality
})

export const popNightQuality = () => ({
  type: POP_NIGHT_QUALITY
})

export const getNightRatingsFromCloud = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const {
    user: { loggedIn }
  } = getState()

  try {
    if (loggedIn) {
      const {
        user: { username }
      } = getState()

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

      // const cloudNightRatings = response

      console.log('at getNightRatingsFromCloud ', response)
    }
  } catch (err) {
    console.log('getNightRatingsFromCloud', err)
  }
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
        await dispatch(updateNightQuality(newNightRating))
      }
      // If not, we handle it as local data
      else {
        // If the new night rating will break the size, we pop the 1st element (the oldest night rating) so the array always remains 31 elements
        if (checkIfWillExceedQuantity(nightQuality)) {
          await dispatch(popNightQuality())
        }

        // Push the new one in as the 31st element
        await dispatch(pushNightQuality(newNightRating))
      }
    }
  } catch (err) {
    console.log('rateNight', err)
  }
}

const checkRecordExists = ({ records }: NightQualityGeneral, date: string) => {
  // const index = records.findIndex((nightQuality) => (nightQuality.id = date))

  // return index !== -1
  return records.has(date)
}

const checkIfWillExceedQuantity = ({ records }: NightQualityGeneral) => {
  // return records.length === 31
  return records.size === 31
}
