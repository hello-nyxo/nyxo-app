import { createSelector } from 'reselect'
import { ContentLesson, ContentWeek } from '@typings/CoachingContentState'
import { State } from '@typings/State'
import {
  CoachingMonth,
  CoachingState,
  STAGE,
  StateWeek
} from '@typings/state/coaching-state'
import {
  getCoachingContentWeeks,
  getContentLessons,
  getContentWeeks
} from '../content-selectors/content-selectors'

const getCoachingState = (state: State): CoachingState => {
  return state.coachingState
}

export interface CombinedLesson extends ContentLesson {
  completed: boolean
}

export enum WEEK_STAGE {
  UPCOMING = 'UPCOMING',
  CAN_BE_STARTED = 'CAN_BE_STARTED',
  CAN_BE_COMPLETED = 'CAN_BE_COMPLETED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}
export interface CombinedWeek extends ContentWeek {
  lessons: CombinedLesson[]
  started?: string
  ended?: string
  lessonCount: number
  habitCount: number
  stage?: WEEK_STAGE
}

export type CombinedWeekArray = CombinedWeek[]
export type CombinedLessonArray = CombinedLesson[]

export const getCoachingMonths = createSelector(
  getCoachingState,
  (state: CoachingState) => state.coachingMonths
)

export const getActiveCoachingMonth = createSelector(
  getCoachingState,
  (state: CoachingState) =>
    state.coachingMonths.find((month) => month.id === state.activeCoachingMonth)
)

export const getSelectedWeek = createSelector(
  getCoachingState,
  (state: CoachingState) => state.selectedWeek
)

export const getCurrentWeek = createSelector(
  getCoachingState,
  (state: CoachingState) => state.activeCoachingWeek
)

export const getCurrentWeekAll = createSelector(
  [getCurrentWeek, getActiveCoachingMonth],
  (activeWeek: string, activeMonth: CoachingMonth) =>
    activeMonth?.weeks?.find((week) => week?.slug === activeWeek)
)

export const getSelectedLesson = createSelector(
  getCoachingState,
  (state: CoachingState) => state.selectedLesson
)

/**
 * Returns coaching month with details if one exist
 * @returns {CoachingMonth}
 */
export const getCoachingMonth = createSelector(
  [getCoachingState, getActiveCoachingMonth],
  (state: CoachingState, coachingMonth) =>
    state.coachingMonths.find((month) => month.id === coachingMonth?.id)
)

export const getStateWeeks = createSelector(
  [getCoachingState, getActiveCoachingMonth],
  (state: CoachingState, coachingMonth) =>
    state.coachingMonths.find((month) => month.id === coachingMonth?.id)?.weeks
)

export const getActiveWeekWithContent = createSelector(
  [getCurrentWeek, getCoachingContentWeeks],
  (currenWeek, coachingWeeks) =>
    coachingWeeks.find((week) => week.slug === currenWeek)
)

export const getContentForSelectedLesson = createSelector(
  [getSelectedLesson, getContentLessons],
  (slug: string | null, lessons: ContentLesson[]) =>
    lessons?.find((lesson: ContentLesson) => lesson.slug === slug)
)

export const getCombinedWeeks = createSelector(
  [getCoachingMonth, getContentWeeks, getContentLessons],
  (coachingMonth, contentWeeks, contentLessons): CombinedWeekArray => {
    const combinedWeeks: CombinedWeekArray = []

    contentWeeks.forEach((week) => {
      const stateWeek = coachingMonth?.weeks?.find((sWeek: StateWeek) => {
        return sWeek.slug === week.slug
      })

      const lessons: CombinedLesson[] = []

      week.lessons.forEach((lesson: string) => {
        const content = contentLessons.find((cl) => cl.slug === lesson)
        const completed = coachingMonth?.lessons?.find((sl) => sl === lesson)

        const combinedLesson: CombinedLesson = {
          slug: content?.slug as string,
          contentId: lesson,
          lessonContent: content?.lessonContent,
          lessonName: content?.lessonName,
          author: content?.author,
          cover: content?.cover,
          weekId: content?.weekId,
          authorCards: content?.authorCards,
          additionalInformation: content?.additionalInformation,
          tags: content?.tags,
          completed: !!completed,
          exampleHabit: content?.exampleHabit,
          section: content?.section
        }

        lessons.push(combinedLesson)
      })

      const combinedWeek: CombinedWeek = {
        slug: week.slug,
        weekDescription: week.weekDescription,
        contentId: week.contentId,
        intro: week.intro,
        taskCount: week.taskCount,
        defaultLocked: week.defaultLocked,
        duration: week.duration,
        coverPhoto: week.coverPhoto,
        lessons,
        order: week.order,
        weekName: week.weekName,
        started: stateWeek?.started,
        ended: stateWeek?.ended,
        stage: stateWeek?.stage,
        lessonCount: week.lessons.length,
        habitCount: lessons.reduce(
          (acc, curr) =>
            curr?.exampleHabit ? acc + curr?.exampleHabit?.length : acc,
          0
        )
      }

      combinedWeeks.push(combinedWeek)
    })

    return combinedWeeks
  }
)

export const getCoachingLessonsForWeek = createSelector(
  [getCombinedWeeks, getSelectedWeek],
  (combinedWeeks: CombinedWeekArray, selectedWeek) => {
    const week = combinedWeeks.find(
      (cWeek: CombinedWeek) => cWeek.slug === selectedWeek
    )
    const lessons = week ? week.lessons : []
    return lessons
  }
)

export const getCoachingLessonsForCurrentWeek = createSelector(
  [getCombinedWeeks, getCurrentWeek],
  (combinedWeeks: CombinedWeekArray, currentWeek) => {
    const week = combinedWeeks.find(
      (cWeek: CombinedWeek) => cWeek.slug === currentWeek
    )
    const lessons = week ? week.lessons : []
    return lessons
  }
)

export const getCoachingStage = createSelector(
  [getCoachingMonth],
  (activeMonth: CoachingMonth) => activeMonth?.stage
)

export const getCoachingNotStarted = createSelector(
  [getActiveCoachingMonth],
  (month: CoachingMonth) => (month ? month?.stage === STAGE.NOT_STARTED : true)
)

export const getNextWeek = createSelector(
  [getCoachingContentWeeks, getCurrentWeek],
  (weeks, currentWeek) => {
    const currentlyActiveWeek = weeks.find((week) => week.slug === currentWeek)
    const nextOrder = currentlyActiveWeek?.order
      ? currentlyActiveWeek?.order + 1
      : undefined
    const nextWeek = weeks.find((week) => week.order === nextOrder)
    return nextWeek
  }
)

export const getCurrentWeekStarted = createSelector(
  getCoachingState,
  (state: CoachingState) => state
)

export const getSelectedWeekCompleted = createSelector(
  [getSelectedWeek, getCoachingMonth],
  (slug: string | null, month: CoachingMonth) => {
    const selectedWeek = month?.weeks.find((week) => week.slug === slug)
    return selectedWeek ? !!selectedWeek.ended : false
  }
)

export const getSelectedWeekOngoing = createSelector(
  [getSelectedWeek, getCoachingMonth],
  (slug: string | null, month: CoachingMonth) => {
    const selectedWeek = month?.weeks.find((week) => week.slug === slug)
    return selectedWeek ? selectedWeek?.stage === WEEK_STAGE.ONGOING : false
  }
)
