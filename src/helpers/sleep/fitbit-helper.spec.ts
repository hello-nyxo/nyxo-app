import {
  expectedNight,
  fitbitMockResponse
} from '@helpers/sleep/__mocks__/fitbit.mock'
import { formatFitbitSample } from './fitbit-helper'

jest.mock('moment', () => {
  return () => jest.requireActual('moment')('2020-02-29T21:28:00.000Z')
})

describe('Fitbit helper', () => {
  it(`formatFitbitResponse() should handle formatting fitbit api response`, () => {
    expect(formatFitbitSample(fitbitMockResponse.sleep[0])).toEqual(
      expectedNight
    )
  })
})
