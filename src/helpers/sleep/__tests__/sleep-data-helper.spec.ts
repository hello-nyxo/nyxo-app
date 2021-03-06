import { subWeeks } from 'date-fns'
import { matchDayAndNight } from '../sleep-data-helper'

const night = new Date('2020-12-12').toISOString()
const day = new Date('2020-12-12').toISOString()
const wrongNight = subWeeks(new Date('2020-12-12'), 1).toISOString()

describe('sleep-data-helpers', () => {
  it(`matchDayAndNight returns night matching date`, () => {
    expect(matchDayAndNight(night, day)).toEqual(true)
  })
  it(`matchDayAndNight filters night not matching date`, () => {
    expect(matchDayAndNight(night, wrongNight)).toEqual(false)
  })
})
