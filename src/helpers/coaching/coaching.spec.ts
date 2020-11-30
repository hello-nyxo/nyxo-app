import { canEndCoaching } from './coaching'

process.env.TZ = 'GMT'

const RealDate = Date.now

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date('2020-09-07T10:20:30Z').getTime())
})

describe('canEndCoaching', () => {
  let duration = 0
  let startDate = new Date().toISOString()
  let expected = false

  it(`should return ${expected} 
	when duration is ${duration} and startDate is ${startDate} and today is ${new Date()}`, () => {
    expect(canEndCoaching(startDate, duration)).toEqual(expected)
  })

  duration = 7
  startDate = new Date().toISOString()
  expected = true

  it(`should return ${expected} 
	when duration is ${duration} and startDate is ${startDate} and today is ${new Date()}`, () => {
    expect(canEndCoaching(startDate, duration)).toEqual(expected)
  })

  duration = 7
  startDate = new Date('2020-09-01T10:20:30Z').toISOString()
  expected = true

  it(`should return ${expected} 
	when duration is ${duration} and startDate is ${startDate} and today is ${new Date()}`, () => {
    expect(canEndCoaching(startDate, duration)).toEqual(expected)
  })

  duration = 10
  startDate = new Date('2020-09-01T10:20:30Z').toISOString()
  expected = true

  it(`should return ${expected} 
	when duration is ${duration} and startDate is ${startDate} and today is ${new Date()}`, () => {
    expect(canEndCoaching(startDate, duration)).toEqual(expected)
  })
})

afterAll(() => {
  global.Date.now = RealDate
})
