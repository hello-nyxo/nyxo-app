import { GetState } from 'Types/GetState'
import { NightNote } from 'Types/NightNoteState'
import { Dispatch } from 'Types/ReduxActions'

export const UPDATE_NIGHT_NOTE = 'UPDATE_NIGHT_NOTE'

export const DELETE_NIGHT_NOTE = 'DELETE_NIGHT_NOTE'

export const updateNightNote = (nightNote: NightNote) => ({
  type: UPDATE_NIGHT_NOTE,
  payload: nightNote
})

export const deleteNightNote = (nightNote: NightNote) => ({
  type: DELETE_NIGHT_NOTE,
  payload: nightNote
})

export const addNightNote = (nightNote: NightNote) => (
  dispatch: Dispatch,
  getState: GetState
) => {}

export const editNightNote = (nightNote: NightNote) => (
  dispatch: Dispatch,
  getState: GetState
) => {}
