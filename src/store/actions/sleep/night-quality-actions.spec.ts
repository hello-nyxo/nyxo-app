import {
  getNightRatingsFromCloud,
  loadNightQualityFromCloud,
  convertNightQualityFromCloudToMap,
  rateNight,
  updateNightQuality
} from './night-quality-actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { AnyAction } from 'redux'
import { NightQuality } from 'Types/Sleep/NightQuality'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockedRemoteData = {
  data: {
    listNightRatings: {
      items: [
        { date: 'uniq_date_1', id: 'uniq_id_1', rating: 0 },
        { date: 'uniq_date_2', id: 'uniq_id_2', rating: 1 },
        { date: 'uniq_date_3', id: 'uniq_id_3', rating: 2 }
      ]
    }
  }
}

jest.mock('aws-amplify', () => ({
  API: {
    graphql: () => mockedRemoteData
  },

  graphqlOperation: jest.fn()
}))

describe('Night Quality Action', () => {
  it('should handle getNightRatingsFromCloud function', () => {
    const store = mockStore({
      user: {
        authenticated: true,
        username: 'uniq_username'
      },
      nightQuality: {
        records: new Map()
        // localRecords: new Map() // --- CAN DELETE ---
      }
    })

    return store
      .dispatch(<AnyAction>(<unknown>getNightRatingsFromCloud()))
      .then(() => {
        const actions = store.getActions()

        expect(actions[0]).toEqual(
          loadNightQualityFromCloud(
            convertNightQualityFromCloudToMap(
              mockedRemoteData.data.listNightRatings.items
            )
          )
        )
      })
  })

  it('should handle rateNight function', () => {
    const inputNightQuality: NightQuality = {
      id: 'uniq_id_1',
      date: 'uniq_date_1',
      rating: 0
    }
    const records: Map<string, NightQuality> = new Map().set(
      inputNightQuality.date,
      inputNightQuality
    )

    const store = mockStore({
      user: {
        authenticated: true,
        username: 'uniq_username'
      },
      nightQuality: {
        records: records
        // localRecords: new Map() // --- CAN DELETE ---
      }
    })

    const updateNight: NightQuality = { ...inputNightQuality, rating: 3 }

    return store
      .dispatch(<AnyAction>(<unknown>rateNight(updateNight)))
      .then(() => {
        const actions = store.getActions()

        expect(actions[0]).toEqual(updateNightQuality(updateNight))
      })
  })
})
