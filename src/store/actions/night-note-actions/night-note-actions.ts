import { GetState } from 'Types/GetState'
import { NightNote } from 'Types/NightNoteState'
import { Dispatch } from 'Types/ReduxActions'
import { graphqlOperation, API } from 'aws-amplify'
import { getNightNote } from 'graphql/queries'
import { CreateNightNoteInput, ListNightNotesQuery } from 'API'
import { createNightNote } from 'graphql/mutations'

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

export const saveNightNote = (nightNote: NightNote) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const { dateTime } = nightNote
  const {
    user: { username, authenticated }
  } = getState()

  if (authenticated) {
    addOrUpdateNightNoteToCloud(
      await checkIfNightNoteExists(username, dateTime),
      username,
      nightNote
    )
  }
}

export const editNightNote = (nightNote: NightNote) => (
  dispatch: Dispatch,
  getState: GetState
) => {}

const checkIfNightNoteExists = async (
  userId: string | null,
  dateTime: string
) => {
  try {
    const variables = {
      filter: {
        userId: {
          eq: userId ? userId : 'unknown'
        },
        dateTime: {
          eq: dateTime
        }
      }
    }
    const response = (await API.graphql(
      graphqlOperation(getNightNote, variables)
    )) as {
      data: ListNightNotesQuery
    }

    if (
      response.data.listNightNotes &&
      (<any>response.data).listNightNotes?.items.length > 0
    ) {
      return true
    }
  } catch (err) {
    console.log('checkIfNightNoteExists err ', err)
  }

  return false
}

const addOrUpdateNightNoteToCloud = async (
  nightNoteExists: boolean,
  userId: string | null,
  nightNote: NightNote
) => {
  const { id, content, date, dateTime, meta } = nightNote
  const input: CreateNightNoteInput = {
    userId: userId ? userId : 'unknown',
    id,
    content,
    date,
    dateTime,
    meta
  }

  try {
    if (nightNoteExists) {
      await API.graphql(graphqlOperation(updateNightNote, { input }))
    } else {
      await API.graphql(graphqlOperation(createNightNote, { input }))
    }
  } catch (err) {
    console.log('addOrUpdateNightNoteToCloud err ', err)
  }
}
