import { Day, Night } from './Sleepdata'

export interface SleepClockState {
  primarySleepTrackingSource: {
    sourceName: string
    sourceId: string
  }
  bedTimeGoal: null
  sleepTrackingSources: SleepDataSource[] | undefined
  insights: {
    goToSleepWindow: string
    goToSleepWindowStart: string
    goToSleepWindowCenter: string
    goToSleepWindowEnd: string
  }
  healthKitEnabled: boolean
  sleepDataUpdated: string
  today: string
  current_day: Day
  selectedDay: Day
  activeIndex: number | null
  ratings: []
  days: Day[] | []
  nights: Night[]

  startDate: string
  selectedItem: Day | null
}

export type SleepDataSource = {
  sourceName: string
  sourceId: string
  sampleCount?: number
}
