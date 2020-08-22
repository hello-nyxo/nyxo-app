import { Period } from './State/Periods'

export interface MicroTaskState {
  tasks: MicroTask[]
}
export interface MicroTask {
  id: string
  userId: string
  microTaskUserId: string
  title: string
  date: string
  days: number[]
  archived?: boolean
  period: Period
}
