import { INTERCOM_NEED_HELP_READ } from '@actions/onboarding/onboarding-actions'
import reducer, { initialState } from './onboarding-reducer'

describe('Onboarding reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(initialState)
  })

  it('should handle TOGGLE_RATING_MODAL', () => {
    expect(
      reducer(initialState, {
        type: INTERCOM_NEED_HELP_READ
      })
    ).toEqual({
      ...initialState,
      intercomNeedHelpRead: true
    })
  })
})
