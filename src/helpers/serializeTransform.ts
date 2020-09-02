import { createTransform } from 'redux-persist'
import serialize from 'serialize-javascript'
import { Habit } from 'Types/State/habit-state'

// Alternative for SerializeTransform for HabitState
export const transformHabits = createTransform(
  (inboundState: Map<string, Habit>, key: any) => {
    const inboundHabits: any = {}
    const habitEntries = [...inboundState.entries()]
    habitEntries.forEach((entry: [string, Habit]) => {
      const inboundDayEntries = [...entry[1].days.entries()]
      const inboundDays: any = {}
      inboundDayEntries.forEach((dayEntry: [string, number]) => {
        inboundDays[dayEntry[0]] = dayEntry[1]
      })

      const newHabitvalue = { ...entry[1], days: inboundDays }
      inboundHabits[entry[0]] = newHabitvalue
    })
    return inboundHabits
  },
  (outboundState: any, key: any) => {
    const outboundHabits = new Map()
    for (const key in outboundState) {
      const outboundDays = new Map()
      for (const k in outboundState[key].days) {
        outboundDays.set(k, outboundState[key].days[k])
      }
      const newHabitValue = { ...outboundState[key], days: outboundDays }
      outboundHabits.set(key, newHabitValue)
    }
    return outboundHabits
  },
  { whitelist: ['habits', 'subHabits'] }
)

const SerializeTransform = createTransform(
  (inboundState: any) => {
    return serialize(inboundState)
  },
  (outboundState: any) => {
    if (
      typeof outboundState === 'string' ||
      typeof outboundState === 'boolean' ||
      typeof outboundState === 'number'
    ) {
      return eval(`(${outboundState})`)
    }

    return eval(outboundState)
  }
)

export default SerializeTransform
