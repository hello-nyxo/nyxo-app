import { Document } from '@contentful/rich-text-types'

export type WeekCollectionItem = {
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
    items: LessonCollectionItem[]
  }
}

export type LessonCollectionItem = {
  lessonName?: string
  slug?: string
  keywords?: string[]
  chronotype: string
  author: string
  cover?: {
    url?: string
  }
  lessonContent?: {
    json?: Document
    links: {
      assets: {
        block: AssetBlock[]
      }
    }
  }
  additionalInformation: {
    json: Document
    links: {
      assets: {
        block: AssetBlock[]
      }
    }
  }
  habitCollection?: {
    items?: HabitCollectionItem[]
  }
  authorCardCollection?: {
    items?: AuthorCardCollectionItem[]
  }
}

export type AssetBlock = {
  sys: {
    id: string
    spaceId: string
    environmentId: string
    publishedAt: string
    firstPublishedAt: string
    publishedVersion: number
  }
  title: string
  description: string
  contentType: string
  fileName: string
  size: string
  url: string
  width: string
  height: string
}

export type HabitCollectionItem = {
  slug?: string
  period?: string
  title?: string
  description?: {
    json?: Document
  }
}

export type AuthorCardCollectionItem = {
  name?: string
  credentials?: string
  description?: {
    json?: Document
    links: {
      assets: {
        block: AssetBlock[]
      }
    }
  }
  avatar?: {
    url?: string
  }
}
