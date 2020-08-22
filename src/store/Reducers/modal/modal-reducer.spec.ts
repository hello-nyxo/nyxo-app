import { TOGGLE_RATING_MODAL } from '@actions/modal/modal-actions'
import reducer, { initialState } from './modal-reducer'

describe('Coaching notification reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle TOGGLE_RATING_MODAL', () => {
    expect(
      reducer(initialState, {
        type: TOGGLE_RATING_MODAL
      })
    ).toEqual({
      ...initialState,
      ratingModal: true
    })

    expect(
      reducer(
        {
          ...initialState,
          ratingModal: true
        },
        {
          type: TOGGLE_RATING_MODAL
        }
      )
    ).toEqual({
      ...initialState,
      ratingModal: false
    })
  })
})
