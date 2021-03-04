import { formatOuraSample } from './oura-helper'

const mockOuraResponse = {
  summary_date: '2017-11-05',
  period_id: 0,
  is_longest: 1,
  timezone: 120,
  bedtime_start: '2017-11-06T02:13:19+02:00',
  bedtime_end: '2017-11-06T08:12:19+02:00',
  score: 70,
  score_total: 57,
  score_disturbances: 83,
  score_efficiency: 99,
  score_latency: 88,
  score_rem: 97,
  score_deep: 59,
  score_alignment: 31,
  total: 20310,
  duration: 21540,
  awake: 1230,
  light: 10260,
  rem: 7140,
  deep: 2910,
  onset_latency: 480,
  restless: 39,
  efficiency: 94,
  midpoint_time: 11010,
  hr_lowest: 49,
  hr_average: 56.375,
  rmssd: 54,
  breath_average: 13,
  temperature_delta: -0.06,
  hypnogram_5min:
    '443432222211222333321112222222222111133333322221112233333333332232222334',
  hr_5min: [],
  rmssd_5min: []
}

const mockConfig = jest.fn()
jest.doMock('react-native-ultimate-config', () => ({ config: mockConfig }))

describe('Oura helper', () => {
  it(`formatOuraResponse() should handle formatting oura api response`, () => {
    expect(formatOuraSample(mockOuraResponse)).toEqual([
      {
        id: `2017-11-05_0_0`,
        sourceId: 'com.ouraring.oura',
        sourceName: 'Oura',
        value: 'INBED',
        startDate: '2017-11-06T00:13:19.000Z',
        endDate: '2017-11-06T06:12:19.000Z',
        totalDuration: 359
      },
      {
        id: 'oura_2017-11-06T00:23:19.000Z_2017-11-06T00:28:19.000Z',
        sourceId: 'com.ouraring.oura',
        sourceName: 'Oura',
        startDate: '2017-11-06T00:23:19.000Z',
        endDate: '2017-11-06T00:28:19.000Z',
        totalDuration: 5,
        value: 'ASLEEP'
      },
      {
        id: 'oura_2017-11-06T00:33:19.000Z_2017-11-06T06:08:19.000Z',
        sourceId: 'com.ouraring.oura',
        sourceName: 'Oura',
        startDate: '2017-11-06T00:33:19.000Z',
        endDate: '2017-11-06T06:08:19.000Z',
        totalDuration: 335,
        value: 'ASLEEP'
      }
    ])
  })
})
