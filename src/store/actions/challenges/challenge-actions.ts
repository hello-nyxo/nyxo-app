import { Challenge } from 'Types/ChallengeState'

export const MAKE_CHALLENGE_VISIBLE = 'MAKE_CHALLENGE_VISIBLE'
export const ADD_CHALLENGES = 'ADD_CHALLENGES'

export const makeChallengeVisible = (challenge: Challenge) => ({
  type: MAKE_CHALLENGE_VISIBLE,
  payload: challenge
})

export const addChallenges = (challenges: Challenge[]) => ({
  type: ADD_CHALLENGES,
  payload: challenges
})
