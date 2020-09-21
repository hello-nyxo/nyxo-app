import { produce } from 'immer'
import { Action } from 'redux'
import {
  DELETE_NIGHT_NOTE,
  UPDATE_NIGHT_NOTE
} from 'store/actions/night-note-actions/night-note-actions'
import { NightNote, NightNoteState } from 'Types/NightNoteState'

const initialState: NightNoteState = {
  nightNotes: new Map()
}

const reducer = produce((draft: NightNoteState, action: Action<any>) => {
  switch (action.type) {
    case UPDATE_NIGHT_NOTE:
      const updatingNightNote = (action as any).payload as NightNote
      const { date: updatingDate, id: updatingId } = updatingNightNote

      const updatingDateNightNote = draft.nightNotes.get(updatingDate)

      if (updatingDateNightNote) {
        updatingDateNightNote.notes.set(updatingId, updatingNightNote)
      } else {
        draft.nightNotes.set(updatingDate, {
          notes: new Map().set(updatingId, updatingNightNote)
        })
      }

      break

    case DELETE_NIGHT_NOTE:
      const deleteingNightNote = (action as any).payload as NightNote
      const { date: deletingDate, id: deletingId } = deleteingNightNote

      const deletingDateNightNote = draft.nightNotes.get(deletingDate)

      if (deletingDateNightNote) {
        deletingDateNightNote.notes.delete(deletingId)

        if (deletingDateNightNote.notes.size === 0) {
          draft.nightNotes.delete(deletingDate)
        }
      }

      break
  }
}, initialState)

export default reducer
