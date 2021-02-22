import { gql, QueryResult, useQuery } from '@apollo/client'
import { Document } from '@contentful/rich-text-types'
import I18n from 'i18n-js'

const GET_WEEK = gql`
  query GetLesson($language: String!, $slug: String) {
    lessonCollection(where: { slug: $slug }, locale: $language, limit: 1) {
      items {
        lessonName
        slug
        keywords
        weights
        chronotype
        cover {
          url
        }
        lessonContent {
          json
        }
        additionalInformation {
          json
        }
        habitCollection {
          items {
            slug
            period
            description {
              json
            }
            title
          }
        }
        authorCardCollection {
          items {
            name
            credentials
            description {
              json
            }
            avatar {
              url
            }
          }
        }
      }
    }
  }
`

type LessonData = {
  lessonCollection?: {
    items?: {
      lessonName?: string
      slug?: string
      keywords?: string[]
      cover?: {
        url?: string
      }
      lessonContent?: {
        json?: Document
      }
      additionalInformation: {
        json: Document
      }
      habitCollection?: {
        items?: {
          slug?: string
          period?: string
          title?: string
          description?: {
            json?: Document
          }
        }[]
      }
      authorCardCollection?: {
        items?: {
          name?: string
          credentials?: string
          description?: {
            json?: Document
          }
          avatar?: {
            url?: string
          }
        }[]
      }
    }[]
  }
}

type LessonVariables = {
  slug?: string
  language?: string
}

export const useLesson = (
  slug?: string
): QueryResult<LessonData, LessonVariables> => {
  const locale = I18n.locale === 'en' ? 'en-US' : 'fi-FI'

  return useQuery<LessonData, LessonVariables>(GET_WEEK, {
    variables: { language: locale, slug }
  })
}
