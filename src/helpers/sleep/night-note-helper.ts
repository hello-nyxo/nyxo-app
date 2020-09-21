import moment from 'moment'

export const ConvertDateToText = (date: Date) => {
  const d = moment(date)

  return d.format('ddd MMM D, H:mm')
}

export const ReturnNightNoteDateFormat = (dateString: string) => {
  const d = moment(dateString)

  return d.format('ddd MMM D, H:mm')
}
