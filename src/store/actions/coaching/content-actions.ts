import CONFIG from '@config/Config'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { actionCreators as contentActions } from '@reducers/content-reducer/content-reducer'
import {
  AuthorCard,
  ContentLesson,
  ContentWeek,
  ExampleHabit,
  Section
} from '@typings/CoachingContentState'
import {
  IAuthor,
  ICoachingWeek,
  IHabit,
  ILesson
} from '@typings/generated/contentful'
import { AppThunk } from '@typings/redux-actions'
import { ContentfulClientApi, EntryCollection } from 'contentful'
import I18n from 'i18n-js'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createClient } = require('contentful/dist/contentful.browser.min.js')

export const contentfulClient: ContentfulClientApi = createClient({
  space: CONFIG.CONTENTFUL_SPACE,
  accessToken: CONFIG.CONTENTFUL_SPACE_ACCESS_TOKEN
})

const getFieldValue = (
  entry: ILesson | ICoachingWeek | IAuthor | IHabit,
  fieldToGet: string,
  object: unknown,
  callback?: (args: unknown) => void,
  fieldToSet?: string
) => {
  if (entry.fields[fieldToGet]) {
    object[fieldToSet || fieldToGet] = callback
      ? callback(entry.fields[fieldToGet])
      : entry.fields[fieldToGet]
  }
}

export const getAllWeeks = (): AppThunk => async (dispatch) => {
  const locale = I18n.locale === 'en' ? 'en-US' : 'fi-FI'
  const weeks: ContentWeek[] = []
  const lessons: ContentLesson[] = []
  const sections: Section[] = []
  const exampleHabits: ExampleHabit[] = []

  await dispatch(contentActions.updateContentStart())

  try {
    const coachingWeeks: EntryCollection<ICoachingWeek> = await contentfulClient.getEntries(
      {
        locale,
        content_type: 'coachingWeek',
        'fields.slug[ne]': 'introduction',
        include: 3
      }
    )

    coachingWeeks.items.forEach((coachingWeek: ICoachingWeek) => {
      const weekObject: ContentWeek = {
        order: coachingWeek.fields.order,
        contentId: coachingWeek.sys.id,
        weekName: coachingWeek.fields.weekName,
        intro: coachingWeek.fields.intro,
        taskCount: coachingWeek.fields.taskCount,
        defaultLocked: Boolean(coachingWeek.fields.taskCount),
        duration: coachingWeek.fields.duration,
        coverPhoto: coachingWeek.fields.coverPhoto.fields.file.url,
        slug: coachingWeek.fields.slug,
        weekDescription: documentToPlainTextString(
          coachingWeek.fields.weekDescription
        ),
        lessons: []
      }

      if (coachingWeek.fields.lessons) {
        const weekLessons: string[] = []

        coachingWeek.fields.lessons.forEach((lesson: ILesson) => {
          const lessonObject: ContentLesson = {
            contentId: lesson.sys.id,
            slug: lesson.fields.slug,
            lessonContent: lesson.fields.lessonContent,
            cover: lesson.fields.cover?.fields.file.url,
            author: lesson.fields.author,
            tags: lesson.fields.keywords
          }
          lessonObject.authorCards = mapAuthors(lesson)

          if (lesson.fields.slug) {
            lessonObject.slug = lesson.fields.slug
          }
          getFieldValue(lesson, 'lessonName', lessonObject)
          getFieldValue(lesson, 'additionalInformation', lessonObject)
          getFieldValue(lesson, 'author', lessonObject)
          getFieldValue(lesson, 'lessonName', lessonObject)
          getFieldValue(lesson, 'stage', lessonObject)
          getFieldValue(lesson, 'lessonContent', lessonObject)

          if (lesson.fields.section) {
            const section: Section = {
              title: lesson.fields.section.fields.title,
              order: lesson.fields.section.fields.order,
              description: lesson.fields?.section?.fields?.description
            }
            lessonObject.section = section
            sections.push(section)
          }

          if (lesson.fields.habit) {
            const habits: ExampleHabit[] = []

            lesson.fields.habit.forEach((habit) => {
              const exampleHabit: ExampleHabit = {
                title: habit.fields.title,
                period: habit.fields.period,
                description: habit.fields.description
              }
              habits.push(exampleHabit)
              exampleHabits.push(exampleHabit)
            })

            lessonObject.exampleHabit = habits
          }

          lessonObject.weekId = weekObject.contentId

          weekLessons.push(lesson.fields.slug)
          lessons.push(lessonObject)
        })

        weekObject.lessons = weekLessons
      }

      if (coachingWeek.fields.taskCount) {
        weekObject.taskCount = coachingWeek.fields.taskCount
      }

      weeks.push(weekObject)
    })

    const sorted = weeks.sort((a, b) => a.order - b.order)

    await dispatch(
      contentActions.updateContentSuccess({
        weeks: sorted,
        lessons,
        sections,
        habits: exampleHabits
      })
    )
  } catch (error) {
    await Promise.all([dispatch(contentActions.updateContentError())])
  }
}

const mapAuthors = (lesson: ILesson): AuthorCard[] => {
  const authorArray: AuthorCard[] = []

  if (lesson.fields.authorCard) {
    lesson.fields.authorCard.forEach((card: IAuthor) => {
      const author: AuthorCard = {
        name: '',
        credentials: '',
        avatar: ''
      }

      if (card.fields.name) {
        author.name = card.fields.name
      }

      getFieldValue(card, 'name', author)
      getFieldValue(card, 'credentials', author)

      if (card?.fields?.avatar?.fields.file.url) {
        author.avatar = card.fields.avatar.fields.file.url
      }
      authorArray.push(author)
    })
  }
  return authorArray
}
