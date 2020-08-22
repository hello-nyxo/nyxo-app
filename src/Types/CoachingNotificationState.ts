export interface CoachingNotificationState {
  incompleteLessons: InteractedLesson[]
}

export interface InteractedLesson {
  latestInteractTimestamp: number
  lessonId: string
  weekId: string
  slug: string
}
