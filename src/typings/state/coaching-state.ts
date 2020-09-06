import { WEEK_STAGE } from '@selectors/coaching-selectors'
import { GetCoachingDataQuery } from 'API'

export enum STAGE {
  NOT_ALLOWED = 'NOT_ALLOWED',
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED'
}

export interface StateLesson {
  slug: string
}

export interface StateWeek {
  slug: string
  started?: string
  ended?: string
  locked?: boolean
  stage?: WEEK_STAGE
}

export type CoachingMonth = {
  weeks: StateWeek[]
  lessons?: string[]
  stage: STAGE

  started: string
  ended?: string
  id: string
}

export type CoachingData = Omit<
  Exclude<GetCoachingDataQuery['getCoachingData'], null>,
  '__typename'
>

export interface CoachingState {
  stage: STAGE

  selectedWeek: string | null
  selectedLesson: string | null

  activeCoachingMonth: string | null // ID
  activeCoachingWeek: string | null // SLUG
  activeCoachingLesson: string | null // SLUG

  coachingMonths: CoachingMonth[]
}
