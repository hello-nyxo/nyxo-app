import {
  POP_FROM_INCOMPLETE_LESSONS,
  PUSH_TO_INCOMPLETE_LESSONS
} from '@actions/CoachingNotification/CoachingNotificationActions'
import {
  CoachingNotificationState,
  InteractedLesson
} from '@typings/CoachingNotificationState'
import ReduxAction from '@typings/ReduxActions'

export const initialState: CoachingNotificationState = {
  incompleteLessons: []
}

const reducer = (
  state = initialState,
  { type, payload }: ReduxAction
): CoachingNotificationState => {
  switch (type) {
    case PUSH_TO_INCOMPLETE_LESSONS: {
      const incompleteLessons = [...state.incompleteLessons]
      const filtered = [
        ...incompleteLessons.filter(
          (lesson: InteractedLesson) => lesson.lessonId !== payload.lessonId
        ),
        payload
      ].sort((a, b) => b.latestInteractTimestamp - a.latestInteractTimestamp)

      return { ...state, incompleteLessons: filtered }
    }

    case POP_FROM_INCOMPLETE_LESSONS: {
      const lessons = state.incompleteLessons.filter(
        (lesson: InteractedLesson) => lesson.lessonId !== payload.lessonId
      )
      return { ...state, incompleteLessons: lessons }
    }

    default:
      return state
  }
}

export default reducer
