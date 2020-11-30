export const SET_VALUES = 'SET_VALUES'
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'

type SetValuesAction = {
  type: typeof SET_VALUES
  payload: { start: { h: number; m: number }; end: { h: number; m: number } }
}

type ToggleEditAction = {
  type: typeof TOGGLE_EDIT_MODE
}

export type ManualSleepActions = SetValuesAction | ToggleEditAction
