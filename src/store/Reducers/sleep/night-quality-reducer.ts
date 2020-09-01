import ReduxAction from 'Types/ReduxActions'
import { NightQualityGeneral } from 'Types/Sleep/NightQuality'
import { produce } from 'immer'
import {
  UPDATE_NIGHT_QUALITY,
  PUSH_NIGHT_QUALITY,
  POP_NIGHT_QUALITY
} from 'actions/sleep/night-quality-actions'

const initialState: NightQualityGeneral = {
  records: new Map()
}

const reducer = produce((draft: NightQualityGeneral, action: ReduxAction) => {
  const { payload, type } = action

  switch (type) {
    case UPDATE_NIGHT_QUALITY:
      //   const index = draft.records.findIndex(
      //     (nightQuality) => nightQuality.date === payload.date
      //   )
      //   draft.records[index] = payload
      draft.records.set(payload.date, payload)
      break

    case PUSH_NIGHT_QUALITY:
      //   draft.records.push(payload)
      draft.records.set(payload.date, payload)
      break

    case POP_NIGHT_QUALITY:
      //   draft.records.slice(1, draft.records.length)
      const poppedMap = Array.from(draft.records).slice(1, draft.records.size)
      draft.records = new Map(poppedMap)
      break
  }
}, initialState)

export default reducer
