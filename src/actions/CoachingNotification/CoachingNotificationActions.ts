import { getStateWeeks } from '@selectors/coaching-selectors'
import { InteractedLesson } from '../../Types/CoachingNotificationState'
import { GetState } from '../../Types/GetState'

export const PUSH_TO_INCOMPLETE_LESSONS = 'PUSH_TO_INCOMPLETE_LESSONS'
export const POP_FROM_INCOMPLETE_LESSONS = 'POP_FROM_INCOMPLETE_LESSONS'

export const pushToIncompleteLessons = (
  interactedLesson: InteractedLesson
) => ({
  type: PUSH_TO_INCOMPLETE_LESSONS,
  payload: interactedLesson
})

export const popFromIncompleteLessons = (
  interactedLesson: InteractedLesson
) => ({
  type: POP_FROM_INCOMPLETE_LESSONS,
  payload: interactedLesson
})

export const pushInteractedLesson = (lesson: InteractedLesson) => (
  dispatch: Function,
  getState: GetState
) => {
  const weeks = getStateWeeks(getState())
  const weekDetail = weeks?.find((w) => w.slug === lesson.slug)
  const lessonDetail = weekDetail?.lessons?.find((l) => l === lesson.slug)
  const completed = lessonDetail?.completed

  if (!completed) {
    dispatch(pushToIncompleteLessons(lesson))
  }
}
