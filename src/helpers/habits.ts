import moment from 'moment'
import { Period } from '@typings/state/Periods'
import { Period as APIPeriod, DayCompletionRecordInput } from '@API'
import { Habit } from '@typings/state/habit-state'

const lineBreakReplacer = '::line-break::'
export const convertLineBreaks = (text: string): string =>
  text.replace(/\n/gm, lineBreakReplacer)

export const revertLineBreaks = (text: string): string => {
  const regExp = new RegExp(lineBreakReplacer, 'gm')
  return text.replace(regExp, '\n')
}

export const titleExists = (
  title: string,
  habits: Map<string, Habit>,
  habitId?: string
): boolean => {
  let found = false
  const habitValues = [...habits.values()]
  habitValues.every((habit) => {
    if (habit.title === title) {
      if (habitId) {
        if (habitId !== habit.id) {
          found = true
          return false
        }
      } else {
        found = true
        return false
      }
    }
    return true
  })

  return found
}

export const areThereChangesInLocal = (
  habits: Map<string, Habit>,
  subHabits: Map<string, Habit>
): boolean => {
  let result = false

  if (habits.size > subHabits.size) {
    return true
  }

  Array.from(habits.keys()).every((key) => {
    if (!subHabits.has(key)) {
      result = true
      return false
    }
    return true
  })

  return result
}

export const convertDaysToFitGraphQL = (
  days: Map<string, number>
): DayCompletionRecordInput[] => {
  const result: DayCompletionRecordInput[] = []

  days.forEach((value: number, key: string) => {
    result.push({
      key,
      value
    })
  })

  return result
}

export const convertRemoteHabitsToLocalHabits = (remoteHabits: any) => {
  const resultHabits = new Map<string, Habit>() // on-device habits
  remoteHabits.forEach((item: any) => {
    // on-cloud habit
    const {
      id,
      userId,
      dayStreak,
      longestDayStreak,
      latestCompletedDate,
      title,
      description,
      date,
      days,
      archived,
      period
    } = item

    // on-device habit
    const constructedHabit: Habit = {
      id,
      userId,
      dayStreak,
      longestDayStreak,
      latestCompletedDate,
      title,
      description: description || '',
      date,
      archived: archived || false,
      period,
      days: new Map()
    }

    days?.forEach((day: { key: string; value: number }) => {
      constructedHabit.days.set(day.key, day.value)
    })

    resultHabits.set(id, constructedHabit)
  })

  return resultHabits
}

export const isCompletedToday = (habit: Habit): boolean => {
  const today = moment().startOf('day').toISOString()
  return !!(habit.days.has(today) && habit.days.get(today) === 1)
}

export const shouldResetDayStreak = ({
  latestCompletedDate
}: Habit): boolean => {
  const today = moment().startOf('day')
  const lastDate = moment(latestCompletedDate)
  return !today.isSame(lastDate, 'day')
}

export const convertPeriodType = (period: Period): APIPeriod => {
  switch (period) {
    case Period.morning:
      return APIPeriod.morning
    case Period.afternoon:
      return APIPeriod.afternoon
    case Period.evening:
      return APIPeriod.evening
    default:
      return APIPeriod.morning
  }
}
