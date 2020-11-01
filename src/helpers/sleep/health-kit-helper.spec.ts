import {
  expectedNight,
  hkSampleMock
} from '@helpers/sleep/__mocks__/health-kit.mock'
import { formatHealthKitResponse } from './health-kit-helper'

describe('HealtKit helper', () => {
  it(`formatHealthKitResponse() should handle formatting healthkit api response`, () => {
    expect(formatHealthKitResponse(hkSampleMock)).toEqual(expectedNight)
  })
})
