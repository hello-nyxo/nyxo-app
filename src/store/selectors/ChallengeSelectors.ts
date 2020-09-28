import { createSelector } from 'reselect'
import { State } from 'Types/State'

const getChallengeState = (state: State) => state.challenge.challenges

export const getVisibleChallenges = createSelector(
  getChallengeState,
  (challenges) => challenges
)
