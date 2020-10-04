import ReduxAction from '@typings/ReduxActions'
import CoachingProfile, { Chronotype } from '@typings/CoachingProfile'

export const types = {
  UPDATE_CHRONOTYPE: 'UPDATE_CHRONOTYPE'
}

export const actionCreators = {
  updateChronotype: (chronotype: Chronotype) => {
    return { type: types.UPDATE_CHRONOTYPE, payload: chronotype }
  }
}

const initState: CoachingProfile = {
  chronotype: null
}

const CoachingProfileReducer = (
  state = initState,
  action: ReduxAction
): CoachingProfile => {
  const { type, payload } = action

  switch (type) {
    case types.UPDATE_CHRONOTYPE:
      return { ...state, chronotype: payload }

    default:
      return state
  }
}

export default CoachingProfileReducer
