import { gql, QueryResult, useQuery } from '@apollo/client'
import { WeekCollectionItem } from '@typings/contentful'
import I18n from 'i18n-js'

const GET_WEEKS = gql`
  query GetWeeks($language: String!) {
    coachingWeekCollection(locale: $language) {
      items {
        sys {
          id
        }
        weekName
        duration
        slug
        intro
        coverPhoto {
          url
        }
        lessonsCollection {
          items {
            slug
          }
        }
      }
    }
  }
`

type WeeksData = {
  coachingWeekCollection?: {
    items?: WeekCollectionItem[]
  }
}

type WeeksVariables = {
  language?: string
}

export const useWeeks = (): QueryResult<WeeksData, WeeksVariables> => {
  const locale = I18n.locale === 'en' ? 'en-US' : 'fi-FI'

  return useQuery<WeeksData, WeeksVariables>(GET_WEEKS, {
    variables: { language: locale }
  })
}
