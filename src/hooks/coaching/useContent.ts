import { contentfulClient } from '@actions/coaching/content-actions'
import { Document } from '@contentful/rich-text-types'
import { Asset, Entry, EntryCollection } from 'contentful'
import I18n from 'i18n-js'
import { QueryResult, useQuery } from 'react-query'
import { ILessonFields } from 'Types/generated/contentful'

type Introduction = {
  title: string
  content?: Document
  slug: string
  cover?: string
}

const getIntroduction = async (): Promise<Introduction> => {
  const locale = I18n.locale === 'en' ? 'en-US' : 'fi-FI'
  try {
    const data: EntryCollection<ILessonFields> = await contentfulClient.getEntries(
      {
        locale,
        'fields.slug': 'welcome-to-nyxo-sleep-coaching',
        content_type: 'lesson',
        select: [
          'fields.lessonName',
          'fields.lessonContent',
          'fields.slug',
          'fields.cover'
        ]
      }
    )
    const entry = data.items.find(
      (e) => e.fields.slug === 'welcome-to-nyxo-sleep-coaching'
    )

    return {
      title: entry?.fields.lessonName ?? 'Welcome to Nyxo Sleep Coaching',
      content: entry?.fields.lessonContent,
      cover: entry?.fields.cover?.fields.file.url,
      slug: entry?.fields.slug ?? 'welcome-to-nyxo-sleep-coaching'
    }
  } catch (error) {
    return error
  }
}

export const useIntroduction = (): QueryResult<Introduction> => {
  return useQuery('introduction', getIntroduction)
}
