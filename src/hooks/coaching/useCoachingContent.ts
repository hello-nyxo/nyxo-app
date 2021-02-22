import { gql, QueryResult, useQuery } from '@apollo/client'
import { Document } from '@contentful/rich-text-types'
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
          }
        }
      }
    }
  }
`

type WeekData = {
  coachingWeekCollection: {
    items: {
      weekName: string
      slug: string
      weekDescription: {
        json: Document
      }
      intro: string
      coverPhoto: {
        url: string
      }
      lessonsCollection: {
        items: {
          lessonName: string
          slug: string
          author: string
          chronotype: string
          weights: unknown
        }[]
      }
    }[]
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
