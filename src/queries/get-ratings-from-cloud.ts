import { useQuery } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthState } from 'store/selectors/auth-selectors/auth-selectors'
import { ModelNightRatingFilterInput } from 'API'
import { getUsername } from 'store/selectors/UserSelectors'
import { API, graphqlOperation } from 'aws-amplify'
import { listNightRatings } from 'graphql/queries'
import { NightQuality } from 'Types/Sleep/NightQuality'
import { loadNightQualityFromCloud, convertNightQualityFromCloudToMap } from 'store/actions/sleep/night-quality-actions'

interface GetRatingsFromCloud {}

export const useGetRatingsFromCloud = (props: GetRatingsFromCloud) => {
  const authenticated = useSelector(getAuthState)
  const username = useSelector(getUsername)
  const dispatch = useDispatch()

  if (authenticated) {
    const { isLoading, isError, data, error } = useQuery(
      ['getRatingsFromCloud'],
      async () => {
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
    )
  }
}
