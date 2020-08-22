import { Document } from '@contentful/rich-text-types'

export type ContentUpdate = {
  weeks: ContentWeek[]
  lessons: ContentLesson[]
  habits?: ExampleHabit[]
  sections?: Section[]
}

export interface CoachingContentState {
  loading?: boolean
  weeks: ContentWeek[]
  lessons: ContentLesson[]
  habits?: ExampleHabit[]
  sections?: Section[]
}

export interface ContentWeek {
  order: number
  contentId: string
  weekName: string
  intro: string
  weekDescription: string
  taskCount: number
  lessons: string[]
  coverPhoto: string
  defaultLocked: boolean
  duration: number

  slug: string
}

export interface ContentLesson {
  cover?: string
  contentId: string
  weekId?: string
  lessonName?: string
  lessonContent?: Document
  additionalInformation?: Document
  author?: string | null
  authorCards?: AuthorCard[]
  section?: Section
  customComplete?: string
  exampleHabit?: ExampleHabit[]
  chronotype?: string

  slug: string
  tags?: string[]
}

export interface AuthorCard {
  name: string
  credentials: string
  avatar: string
}

export interface Section {
  order?: number
  title?: string
  description?: Document
}

export interface ExampleHabit {
  title?: string
  period?: string
  description?: Document | string
}
