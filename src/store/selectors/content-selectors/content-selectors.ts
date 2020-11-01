import { createSelector } from 'reselect'
import { State } from 'Types/State'

const getCoachingContent = (state: State) => {
  return state.coachingContent
}

export const getLoadingContent = createSelector(
  getCoachingContent,
  (content) => content.loading
)

export const getCoachingContentWeeks = createSelector(
  getCoachingContent,
  (content) => content.weeks
)

export const getContentWeeks = createSelector(
  getCoachingContent,
  (content) => content.weeks
)

export const getContentLessons = createSelector(
  getCoachingContent,
  (content) => content.lessons
)

export const getExampleHabits = createSelector(
  getCoachingContent,
  (content) => content.habits
)

export const getSections = createSelector(
  getCoachingContent,
  (content) => content.sections
)
