import {
  expectedNight,
  fitbitMockResponse
} from '@helpers/sleep/__mocks__/fitbit.mock'
import { formatFitbitSample } from './fitbit-helper'

describe('Fitbit helper', () => {
  it(`formatFitbitResponse() should handle formatting fitbit api response`, () => {
    expect(formatFitbitSample(fitbitMockResponse.sleep[0])).toEqual(
      expectedNight
    )
  })
})
