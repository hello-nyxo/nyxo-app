import reducer, { initialState } from './subscription-reducer'
// import { PURCHASE_FOR_A_YEAR } from "@actions/subscription/subscription-actions";

describe('Onboarding reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  // it("should handle TOGGLE_RATING_MODAL", () => {
  //   expect(
  //     reducer(initialState, {
  //       type: PURCHASE_FOR_A_YEAR
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     intercomNeedHelpRead: true
  //   });
  // });
})
