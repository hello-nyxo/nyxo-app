import { createSelector } from 'reselect'
import { LinkingState } from 'Types/State/linking-state'
import { State } from 'Types/State'

const getLinking = (state: State) => state.linking

export const getLoading = createSelector(
  getLinking,
  (state: LinkingState) => state.loading
)
export const getLinkingCode = createSelector(
  getLinking,
  (state: LinkingState) => state.linkCode
)
