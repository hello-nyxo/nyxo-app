import NightQualityReducer from '@reducers/sleep/night-quality-reducer'
import { NightQualityState, NightQuality } from 'Types/Sleep/NightQuality'
import {
  updateNightQuality,
  pushNightQuality,
  loadNightQualityFromCloud
} from 'store/actions/sleep/night-quality-actions'

const initialState: NightQualityState = {
  records: new Map()
  // localRecords: new Map() // --- CAN DELETE ---
}

describe('Night Quality Reducer', () => {
  it('should return initial state', () => {
    expect(
      NightQualityReducer(
        {
          records: new Map()
          // localRecords: new Map() // --- CAN DELETE ---
        },
        { type: 'NOTHING' }
      )
    ).toEqual(initialState)
  })

  const inputPayload: NightQuality = {
    id: 'uniq_id',
    date: 'uniq_date',
    rating: 3
  }

  it('should handle UPDATE_NIGHT_QUALITY', () => {
    const records = new Map().set(inputPayload.date, inputPayload)
    const newInputPayload: NightQuality = {
      id: 'new_uniq_id',
      date: inputPayload.date,
      rating: 5
    }
    const expected: NightQualityState = {
      records: records.set(newInputPayload.date, newInputPayload)
      // localRecords: new Map() // --- CAN DELETE ---
    }

    expect(
      NightQualityReducer(
        {
          records
          // localRecords: new Map() // --- CAN DELETE ---
        },
        updateNightQuality(newInputPayload)
      )
    ).toEqual(expected)
  })

  it('should handle PUSH_NIGHT_QUALITY', () => {
    const expected: NightQualityState = {
      records: new Map().set(inputPayload.date, inputPayload)
      // localRecords: new Map() // --- CAN DELETE ---
    }

    expect(
      NightQualityReducer(
        {
          records: new Map()
          // localRecords: new Map() // --- CAN DELETE ---
        },
        pushNightQuality(inputPayload)
      )
    ).toEqual(expected)
  })

  it('should handle LOAD_NIGHT_QUALITY_FROM_CLOUD', () => {
    const payload = new Map().set(inputPayload.date, inputPayload)

    const expected: NightQualityState = {
      records: payload
      // localRecords: new Map() // --- CAN DELETE ---
    }

    expect(
      NightQualityReducer(
        {
          records: new Map()
          // localRecords: new Map() // --- CAN DELETE ---
        },
        loadNightQualityFromCloud(payload)
      )
    ).toEqual(expected)
  })
})
