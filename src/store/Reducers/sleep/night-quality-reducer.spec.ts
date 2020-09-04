import NightQualityReducer from '@reducers/sleep/night-quality-reducer'
import { NightQualityState } from 'Types/Sleep/NightQuality'

const initialState: NightQualityState = {
  records: new Map(),
  localRecords: new Map()
}

describe('Night Quality Reducer', () => {
  it('should return initial state', () => {
    expect(
      NightQualityReducer(
        { records: new Map(), localRecords: new Map() },
        { type: 'NOTHING' }
      )
    ).toEqual(initialState)
  })
})
