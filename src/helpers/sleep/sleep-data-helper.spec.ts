import moment from 'moment'
import {
  healthKitSampleToValue,
  formatHealthKitResponse
} from './sleep-data-helper'
import { Value, HealthKitSleepResponse, Night } from 'Types/Sleepdata'

jest.mock('moment', () => {
  return () => jest.requireActual('moment')('2020-02-29T21:28:00.000')
})

const hkSampleMock: HealthKitSleepResponse = {
  sourceId: 'nyxo',
  sourceName: 'nyxo',
  id: 'test-id-1234',
  value: 'INBED',
  startDate: '2020-04-12 01:00:00 +0300',
  endDate: '2020-04-12 08:00:00 +0300'
}

const expectedNight: Night = {
  sourceId: 'nyxo',
  sourceName: 'nyxo',
  value: Value.InBed,
  startDate: moment().toISOString(),
  endDate: moment().toISOString(),
  totalDuration: 0
}

describe('Sleep helpers', () => {
  it('healthKitSampleToValue() should return correct values', () => {
    expect(healthKitSampleToValue('INBED')).toEqual(Value.InBed)
    expect(healthKitSampleToValue('ASLEEP')).toEqual(Value.Asleep)
    expect(healthKitSampleToValue('AWAKE')).toEqual(Value.Awake)
  })

  it(`formatHealthKitResponse() should handle formatting HealthKit sample to day`, () => {
    expect(formatHealthKitResponse(hkSampleMock)).toEqual(expectedNight)
  })

  it(`formatHealthKitResponse() should handle formatting HealthKit sample to day`, () => {
    expect(formatHealthKitResponse(hkSampleMock)).toEqual(expectedNight)
  })

  // it(`should handle ${FITBIT_REVOKE_SUCCESS}`, () => {
  //   expect(
  //     reducer(
  //       { ...initialState, fitbit: fitbitMock },
  //       {
  //         type: FITBIT_REVOKE_SUCCESS
  //       }
  //     )
  //   ).toEqual({
  //     ...initialState,
  //     fitbit: {
  //       ...fitbitMock,
  //       enabled: false
  //     }
  //   });
  // });
})
