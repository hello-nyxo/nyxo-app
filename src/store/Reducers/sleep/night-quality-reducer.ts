import ReduxAction from 'Types/ReduxActions'
import { NightQualityState } from 'Types/Sleep/NightQuality'
import { produce, enableMapSet } from 'immer'
import {
  UPDATE_NIGHT_QUALITY,
  PUSH_NIGHT_QUALITY,
  LOAD_NIGHT_QUALITY_FROM_CLOUD
  // --- CAN DELETE ---
  // UPDATE_NIGHT_QUALITY_LOCAL,
  // PUSH_NIGHT_QUALITY_LOCAL,
  // POP_NIGHT_QUALITY_LOCAL
} from 'store/actions/sleep/night-quality-actions'

enableMapSet()

const initialState: NightQualityState = {
  records: new Map()
  // localRecords: new Map() // --- CAN DELETE ---
}

const reducer = produce((draft: NightQualityState, action: ReduxAction) => {
  const { payload, type } = action

  switch (type) {
    case UPDATE_NIGHT_QUALITY:
      draft.records.set(payload.date, payload)
      break

    case PUSH_NIGHT_QUALITY:
      draft.records.set(payload.date, payload)
      break

    case LOAD_NIGHT_QUALITY_FROM_CLOUD:
      draft.records = payload
      break

    // --- CAN DELETE ---
    // case UPDATE_NIGHT_QUALITY_LOCAL:
    //   draft.localRecords.set(payload.date, payload)
    //   break

    // --- CAN DELETE ---
    // case PUSH_NIGHT_QUALITY_LOCAL:
    //   draft.localRecords.set(payload.date, payload)
    //   break

    // --- CAN DELETE ---
    // case POP_NIGHT_QUALITY_LOCAL:
    //   const poppedMap = Array.from(draft.localRecords).slice(
    //     1,
    //     draft.localRecords.size
    //   )
    //   draft.localRecords = new Map(poppedMap)
    //   break
  }
}, initialState)

export default reducer
