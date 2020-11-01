import { HealthKitSleepResponse, Night, Value } from '@typings/Sleepdata'
import { parse } from 'date-fns'

export const hkSampleMock: HealthKitSleepResponse = {
  sourceId: 'nyxo',
  sourceName: 'nyxo',
  uuid: 'test-id-1234',
  value: 'INBED',
  startDate: '2020-04-12 01:00:00 +0300',
  endDate: '2020-04-12 08:00:00 +0300'
}

export const expectedNight: Night = {
  id: 'test-id-1234',
  sourceId: 'nyxo',
  sourceName: 'nyxo',
  value: Value.InBed,
  startDate: parse(
    '2020-04-12 01:00:00 +0300',
    'yyyy-MM-dd kk:mm:SS XX',
    new Date()
  ).toISOString(),
  endDate: parse(
    '2020-04-12 08:00:00 +0300',
    'yyyy-MM-dd kk:mm:SS XX',
    new Date()
  ).toISOString(),
  totalDuration: 420
}
