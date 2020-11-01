export interface CoachingState {
  selectedWeek: string | null
  selectedLesson: string | null

  weeks: StateWeek[]

  ongoingWeek: string | null
  currentWeekStarted: string | null
  coachingStarted: string | null
  stage: STAGE

  cloudId?: string
  cloudUpdated?: string
}

export interface StateWeek {
  contentId: string // id for matching with contentful
  completed?: boolean
  completionDate?: string
  lessons?: StateLesson[]
  // completedLessons?: string[];
  locked?: boolean
}

export interface StateLesson {
  contentId: string
  completed?: boolean
}

export type StageType = {
  NOT_ALLOWED: 'NOT_ALLOWED'
  NOT_STARTED: 'NOT_STARTED'
  ONGOING: 'ONGOING'
  ENDED: 'ENDED'
}

export enum STAGE {
  NOT_ALLOWED,
  NOT_STARTED,
  ONGOING,
  ENDED,
  CURRENT_WEEK_COMPLETED
}
