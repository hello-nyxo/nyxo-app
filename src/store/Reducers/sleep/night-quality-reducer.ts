import ReduxAction from 'Types/ReduxActions'
import { NightQualityGeneral } from 'Types/Sleep/NightQuality'
import { produce } from 'immer'
import {
  UPDATE_NIGHT_QUALITY,
  DELETE_NIGHT_QUALITY
} from 'actions/sleep/night-quality-actions'

const initialState: NightQualityGeneral = {
  records: new Map()
}

const reducer = produce((draft: NightQualityGeneral, action: ReduxAction) => {
  const { payload, type } = action

  switch (type) {
    case UPDATE_NIGHT_QUALITY:
      draft.records.set(payload.id, payload)
      break

    case DELETE_NIGHT_QUALITY:
      draft.records.delete(payload)
      break
  }
}, initialState)

export default reducer
