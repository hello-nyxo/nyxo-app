import {
  setValues,
  SET_VALUES,
  toggleEditMode,
  TOGGLE_EDIT_MODE
} from './manual-sleep-actions'

const testValues = {
  start: { h: 10, m: 30 },
  end: { h: 12, m: 0 }
}

describe('Manual sleep actions', () => {
  it('should create an action to set values', () => {
    const expectedAction = {
      type: SET_VALUES,
      payload: testValues
    }

    expect(setValues(testValues.start, testValues.end)).toEqual(expectedAction)
  })

  it('should create an action to toggle edit mode', () => {
    const expectedAction = {
      type: TOGGLE_EDIT_MODE
    }
    expect(toggleEditMode()).toEqual(expectedAction)
  })
})
