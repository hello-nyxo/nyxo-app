import { Period } from './Periods'
import { Period as AmplifyPeriod } from '../../API'

export interface HabitState {
  habits: Map<string, Habit>
  subHabits: Map<string, Habit>
  draftEditHabit?: Habit
  unsyncedHabits: Array<UnsyncedHabit>
  mergingDialogDisplayed?: boolean
  loading?: boolean
}

export interface Habit {
  id: string
  userId: string | null
  dayStreak?: number
  longestDayStreak?: number
  latestCompletedDate?: string
  title: string
  description: string
  date: string
  days: Map<string, number>
  archived?: boolean
  period: Period | AmplifyPeriod
}

export interface UnsyncedHabit {
  actionDate: string
  mutationType: MutationType
  habit: Habit
}

export enum MutationType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export interface DayCompletionRecordInput {
  key: string
  value: number
}
