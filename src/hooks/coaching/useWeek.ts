import { gql, QueryResult, useQuery } from '@apollo/client'
import { WeekCollectionItem } from '@typings/contentful'
import I18n from 'i18n-js'

const GET_WEEK = gql`
  query GetWeek($language: String!, $slug: String) {
    coachingWeekCollection(
      where: { slug: $slug }
      locale: $language
      limit: 1
    ) {
      items {
        weekName
        slug
        weekDescription {
          json
        }
        intro
        coverPhoto {
          url
        }
        lessonsCollection {
          items {
            lessonName
            slug
            author
            chronotype
            weights
            cover {
              url
            }
            section {
              title
              order
              description {
                json
              }
            }
          }
        }
      }
    }
  }
`

type WeekData = {
  coachingWeekCollection: {
    items: WeekCollectionItem[]
  }
}

type WeekVariables = {
  language: string
  slug: string
}

export const useWeek = (slug: string): QueryResult<WeekData, WeekVariables> => {
  const locale = I18n.locale === 'en' ? 'en-US' : 'fi-FI'

  return useQuery<WeekData, WeekVariables>(GET_WEEK, {
    variables: { language: locale, slug }
  })
}

export const getWeek = (data?: WeekData): WeekCollectionItem | undefined => {
  if (
    data?.coachingWeekCollection?.items &&
    data?.coachingWeekCollection?.items?.length !== 0
  ) {
    return data.coachingWeekCollection.items[0]
  }

  return undefined
}
