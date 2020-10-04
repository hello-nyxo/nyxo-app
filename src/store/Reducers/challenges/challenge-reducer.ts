import ReduxAction from '@typings/ReduxActions'
import {
  ChallengeState,
  Challenge,
  ChallengeStates
} from '@typings/ChallengeState'
import { RESET_APP } from '@actions/shared'
import {
  ADD_CHALLENGES,
  MAKE_CHALLENGE_VISIBLE
} from '@actions/challenges/challenge-actions'

const initState: ChallengeState = {
  challenges: []
}

const reducer = (state = initState, action: ReduxAction) => {
  const { type, payload } = action

  switch (type) {
    case RESET_APP:
      return initState

    case ADD_CHALLENGES:
      const stripped = stripStaticData(payload)
      return { ...state, challenges: [...stripped] }

    case MAKE_CHALLENGE_VISIBLE:
      return state

    default:
      return state
  }
}

export default reducer

const stripStaticData = (challenges: Challenge[]): [] => {
  const stripped: any = challenges.map((item) => {
    return { id: item.id, state: item.state }
  })
  return stripped
}
