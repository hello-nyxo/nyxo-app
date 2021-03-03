import { gql, QueryResult, useQuery } from '@apollo/client'
import { LessonCollectionItem } from '@typings/contentful'
import I18n from 'i18n-js'

const GET_LESSON = gql`
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
          links {
            assets {
              block {
                sys {
                  id
                  spaceId
                  environmentId
                  publishedAt
                  firstPublishedAt
                  publishedVersion
                }
                title
                description
                contentType
                fileName
                size
                url
                width
                height
              }
            }
          }
        }
        additionalInformation {
          json
          links {
            assets {
              block {
                sys {
                  id
                  spaceId
                  environmentId
                  publishedAt
                  firstPublishedAt
                  publishedVersion
                }
                title
                description
                contentType
                fileName
                size
                url
                width
                height
              }
            }
          }
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
    items?: LessonCollectionItem[]
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

  return useQuery<LessonData, LessonVariables>(GET_LESSON, {
    variables: { language: locale, slug }
  })
}

export const getLesson = (
  data?: LessonData
): LessonCollectionItem | undefined => {
  if (
    data?.lessonCollection?.items &&
    data?.lessonCollection?.items?.length !== 0
  ) {
    return data.lessonCollection.items[0]
  }

  return undefined
}
