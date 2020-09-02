import API, { graphqlOperation } from '@aws-amplify/api'
import {
  ListCoachingDatasQuery,
  ModelCoachingDataFilterInput,
  UpdateCoachingDataInput
} from 'API'
import { Auth } from 'aws-amplify'
import { createCoachingData, updateCoachingData } from 'graphql/mutations'
import { listCoachingDatas } from 'graphql/queries'
import moment from 'moment'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import {
  getActiveWeekWithContent,
  getCoachingMonth,
  getCurrentWeekAll,
  WEEK_STAGE
} from '@selectors/coaching-selectors'
import { GetState } from 'Types/GetState'
import { CoachingMonth, STAGE, StateWeek } from 'typings/state/coaching-state'
import { v4 } from 'uuid'
import ReduxAction from 'Types/ReduxActions'

/* ACTION TYPES */

export const RESET_COACHING = 'RESET_COACHING'

export const SELECT_WEEK = 'SELECT_WEEK'
export const SELECT_LESSON = 'SELECT_LESSON'

export const START_COACHING = 'START_COACHING'
export const END_COACHING = 'END_COACHING'
export const RESUME_COACHING = 'RESUME_COACHING'

export const START_WEEK = 'START_WEEK'
export const START_LESSON = 'START_LESSON'

export const COMPLETE_LESSON = 'COMPLETE_LESSON'
export const COMPLETE_WEEK = 'COMPLETE_WEEK'
export const COMPLETE_COACHING = 'COMPLETE_COACHING'

export const PREPARE_WEEK_FOR_COMPLETION = 'PREPARE_WEEK_FOR_COMPLETION'

export const SET_ACTIVE_WEEK = 'SET_ACTIVE_WEEK'
export const SET_ACTIVE_MONTH = 'SET_ACTIVE_MONTH'

export const SET_STAGE = 'SET_STAGE'

export const PULL_COACHING_START = 'PULL_COACHING_START'
export const PULL_COACHING_SUCCESS = 'PULL_COACHING_SUCCESS'
export const PULL_COACHING_FAILURE = 'PULL_COACHING_FAILURE'

export const CREATE_COACHING_START = 'CREATE_COACHING_START'
export const CREATE_COACHING_SUCCESS = 'CREATE_COACHING_SUCCESS'
export const CREATE_COACHING_FAILURE = 'CREATE_COACHING_FAILURE'

export const UPDATE_COACHING_START = 'UPDATE_COACHING_START'
export const UPDATE_COACHING_SUCCESS = 'UPDATE_COACHING_SUCCESS'
export const UPDATE_COACHING_FAILURE = 'UPDATE_COACHING_FAILURE'

/* ACTIONS */

export const resetCoaching = (): ReduxAction => ({
  type: RESET_COACHING
})

export const selectWeek = (slug: string): ReduxAction => ({
  payload: slug,
  type: SELECT_WEEK
})

export const selectLesson = (slug: string): ReduxAction => ({
  payload: slug,
  type: SELECT_LESSON
})

export const completeLesson = (slug: string): ReduxAction => ({
  type: COMPLETE_LESSON,
  payload: slug
})

export const completeWeek = (
  completedWeekSlug: string,
  nextWeekSlug?: string
): ReduxAction => ({
  type: COMPLETE_WEEK,
  payload: { completedWeekSlug, nextWeekSlug }
})

export const prepareWeekForCompletion = (slug: string) => ({
  type: PREPARE_WEEK_FOR_COMPLETION,
  payload: slug
})

export const completeCoaching = (id: string) => ({
  type: COMPLETE_COACHING,
  payload: id
})

export const setStage = (stage: STAGE) => ({
  payload: stage,
  type: SET_STAGE
})

export const startCoaching = (
  coachingMonth: CoachingMonth,
  activeWeek: StateWeek
) => ({
  type: START_COACHING,
  payload: { activeMonth: coachingMonth, activeWeek }
})

export const startCoachingWeek = (weekSlug: string) => ({
  payload: weekSlug,
  type: START_WEEK
})

/* ASYNC ACTIONS */

export const startCoachingMonth = (startingWeek: StateWeek) => (
  dispatch: Function
) => {
  const coachingMonth: CoachingMonth = {
    stage: STAGE.ONGOING,
    id: v4(),
    weeks: [{ ...startingWeek, stage: WEEK_STAGE.ONGOING }],
    lessons: [],
    started: moment().toISOString()
  }

  dispatch(
    startCoaching(coachingMonth, { ...startingWeek, stage: WEEK_STAGE.ONGOING })
  )
}

export const completeLessonAndUpdateProgress = () => (
  dispatch: Function,
  getState: GetState
) => {
  const content = getCurrentWeekAll(getState())
}

export const validateWeeklyProgress = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const week = getActiveWeekWithContent(getState())
  const state = getCoachingMonth(getState())
  dispatch(openNextWeek())
}

export const openNextWeek = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const {
    coachingContent: { weeks }
  } = getState()
  const week = getActiveWeekWithContent(getState())
  const incremented: number = week?.order ? week?.order + 1 : 0
  const nextWeek = weeks.find((week) => week.order === incremented)

  if (nextWeek) {
    // await dispatch();
    // await dispatch(openWeekLock(nextWeek.contentId));
    // await dispatch(actions.setOngoingWeek(nextWeek.contentId));
  }
}

export const updateCoaching = (coachingMonths: CoachingMonth[]) => async (
  dispatch: Function,
  getState: GetState
) => {
  const { username } = await Auth.currentUserInfo()
  const updatePromises: Promise<any>[] = []
  try {
    coachingMonths.forEach((month) => {
      const input: UpdateCoachingDataInput = {
        id: month.id,
        userId: username,
        lessons: month.lessons,
        weeks: month.weeks.map((week) => ({
          slug: week.slug,
          started: week.started,
          ended: week.ended
        })),
        started: month.started
      }

      updatePromises.push(
        API.graphql(graphqlOperation(updateCoachingData, { input })) as any
      )
    })
    await Promise.all(updatePromises)
  } catch (error) {
    console.warn(error)
  }
}

export const createCoaching = (coachingMonths: CoachingMonth[]) => async (
  dispatch: Function,
  getState: GetState
) => {
  const updatePromises: Promise<any>[] = []
  const { username } = await Auth.currentUserInfo()

  try {
    coachingMonths.forEach((month) => {
      const input: UpdateCoachingDataInput = {
        id: month.id,
        userId: username,
        lessons: month.lessons,
        weeks: month.weeks.map((week) => ({
          slug: week.slug,
          started: week.started,
          ended: week.ended
        })),
        started: month.started
      }

      updatePromises.push(
        API.graphql(graphqlOperation(createCoachingData, { input })) as any
      )
    })
    await Promise.all(updatePromises)
  } catch (error) {
    console.warn(error)
  }
}

export const updateCoachingInCloud = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const {
    coachingState: { coachingMonths }
  } = getState()
  const isLoggedIn = getAuthState(getState())

  if (isLoggedIn) {
    const { username } = await Auth.currentUserInfo()
    const monthsToCreate: CoachingMonth[] = []
    const monthsToUpdate: CoachingMonth[] = []
    const filter: ModelCoachingDataFilterInput = {
      userId: { eq: username }
    }

    try {
      const response = (await API.graphql(
        graphqlOperation(listCoachingDatas, { filter })
      )) as {
        data: ListCoachingDatasQuery
      }
      coachingMonths.forEach((month) => {
        const exists = response.data.listCoachingDatas?.items?.find(
          (m) => m?.id === month.id
        )
        exists ? monthsToUpdate.push(month) : monthsToCreate.push(month)
      })

      dispatch(createCoaching(monthsToCreate))
      dispatch(updateCoaching(monthsToUpdate))
    } catch (error) {
      console.warn(error)
      // dispatch(pullFailure());
    }
  }
}
