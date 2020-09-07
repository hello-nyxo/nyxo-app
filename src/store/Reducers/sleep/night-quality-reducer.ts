import ReduxAction from 'Types/ReduxActions'
import { NightQualityState } from 'Types/Sleep/NightQuality'
import { produce, enableMapSet } from 'immer'
import {
  UPDATE_NIGHT_QUALITY,
  PUSH_NIGHT_QUALITY,
  LOAD_NIGHT_QUALITY_FROM_CLOUD
} from 'store/actions/sleep/night-quality-actions'

enableMapSet()

const initialState: NightQualityState = {
  records: new Map()
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
  }
}, initialState)

export default reducer
