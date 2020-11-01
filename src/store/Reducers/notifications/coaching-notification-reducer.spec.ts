import {
  PUSH_TO_INCOMPLETE_LESSONS,
  POP_FROM_INCOMPLETE_LESSONS,
  pushToIncompleteLessons,
  popFromIncompleteLessons
} from '@actions/CoachingNotification/CoachingNotificationActions'

import { InteractedLesson } from '@typings/CoachingNotificationState'
import reducer, { initialState } from './coaching-notifications-reducer'

const lesson: InteractedLesson = {
  lessonId: 'TEST_LESSON',
  weekId: 'TEST_WEEK',
  latestInteractTimestamp: 111111
}

const secondLesson: InteractedLesson = {
  lessonId: 'TEST_LESSON_2',
  weekId: 'TEST_WEEK_2',
  latestInteractTimestamp: 22222
}

describe('@actions', () => {
  it('should create an action to push lesson', () => {
    const expectedAction = {
      type: PUSH_TO_INCOMPLETE_LESSONS,
      payload: lesson
    }
    expect(pushToIncompleteLessons(lesson)).toEqual(expectedAction)
  })

  it('should create an action to pop lesson', () => {
    const expectedAction = {
      type: POP_FROM_INCOMPLETE_LESSONS,
      payload: lesson
    }
    expect(popFromIncompleteLessons(lesson)).toEqual(expectedAction)
  })
})

describe('Coaching notification reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      incompleteLessons: []
    })
  })

  it('should handle PUSH_INCOMPLETE_LESSON', () => {
    expect(
      reducer(initialState, {
        type: PUSH_TO_INCOMPLETE_LESSONS,
        payload: lesson
      })
    ).toEqual({
      incompleteLessons: [lesson]
    })

    expect(
      reducer(
        {
          incompleteLessons: [lesson]
        },
        {
          type: PUSH_TO_INCOMPLETE_LESSONS,
          payload: secondLesson
        }
      )
    ).toEqual({
      incompleteLessons: [lesson, secondLesson]
    })
  })

  it('should handle POP_INCOMPLETE_LESSON', () => {
    expect(
      reducer(
        {
          incompleteLessons: [lesson]
        },
        {
          type: POP_FROM_INCOMPLETE_LESSONS,
          payload: lesson
        }
      )
    ).toEqual({
      incompleteLessons: []
    })
  })
})
