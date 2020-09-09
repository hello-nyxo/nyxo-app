import { useQuery } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { ModelNightRatingFilterInput } from 'API'
import { API, graphqlOperation } from 'aws-amplify'
import { listNightRatings } from 'graphql/queries'
import { NightQuality } from 'Types/Sleep/NightQuality'
import {
  loadNightQualityFromCloud,
  convertNightQualityFromCloudToMap
} from 'store/actions/sleep/night-quality-actions'

import { actionCreators as newNotificationCreator } from 'store/Reducers/NotificationReducer'
import { NotificationType } from 'Types/NotificationState'
import { getAuthState } from 'store/Selectors/auth-selectors/auth-selectors'
import { getUsername } from 'store/Selectors/UserSelectors'

export const useGetRatingsFromCloud = () => {
  const authenticated = useSelector(getAuthState)
  const username = useSelector(getUsername)
  const dispatch = useDispatch()

  const { isError, error } = useQuery(
    ['getRatingsFromCloud', { username }],
    async () => {
      if (authenticated) {
        try {
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
          console.log('getRatingsFromCloud react query', err)
        }
      }
    }
  )

  if (isError) {
    dispatch(
      newNotificationCreator.newNotification({
        message: (<any>error).message as string,
        type: NotificationType.ERROR
      })
    )
  }
}
