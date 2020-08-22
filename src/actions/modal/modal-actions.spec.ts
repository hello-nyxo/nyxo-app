import {
  TOGGLE_NEW_HABIT_MODAL,
  TOGGLE_EDIT_HABIT_MODAL,
  TOGGLE_RATING_MODAL,
  toggleNewHabitModal,
  toggleEditHabitModal,
  toggleRatingModal
} from './modal-actions'

describe('Manuals actions', () => {
  it('should create an action to toggle new habit modal', () => {
    const expectedAction = {
      type: TOGGLE_NEW_HABIT_MODAL
    }

    expect(toggleNewHabitModal()).toEqual(expectedAction)
  })

  it('should create an action to toggle edit habit modal', () => {
    const expectedAction = {
      type: TOGGLE_EDIT_HABIT_MODAL
    }

    expect(toggleEditHabitModal()).toEqual(expectedAction)
  })

  it('should create an action to toggle rating modal', () => {
    const expectedAction = {
      type: TOGGLE_RATING_MODAL
    }
    expect(toggleRatingModal()).toEqual(expectedAction)
  })
})
