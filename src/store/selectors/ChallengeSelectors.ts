import { createSelector } from 'reselect'
import { State } from '@typings/State'

const getChallengeState = (state: State) => state.challenge.challenges

export const getVisibleChallenges = createSelector(
  getChallengeState,
  (challenges) => challenges
)
