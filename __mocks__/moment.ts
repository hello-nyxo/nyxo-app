const moment = jest.requireActual('moment')

export default (timestamp: string | 0 = 0) => {
  return moment(timestamp)
}
