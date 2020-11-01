import { addDays, isBefore, startOfDay } from 'date-fns'

export const canEndCoaching = (
  startDate: string | undefined | null,
  duration: number
): boolean => {
  if (startDate) {
    return isBefore(
      addDays(startOfDay(new Date(startDate)), duration),
      startOfDay(new Date())
    )
  }

  return false
}
