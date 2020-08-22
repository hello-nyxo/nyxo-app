export type SummaryObject = {
  count: number
  minutes: number
  thirtyDayAvgMinutes: number
}

export type FitbitSleepObject = {
  dateOfSleep: string
  duration: number
  efficiency: number
  endTime: string
  infoCode: number
  isMainSleep: boolean
  levels: {
    data: { dateTime: string; level: string; seconds: number }[]
    shortData: { dateTime: string; level: string; seconds: number }[]
    summary: {
      deep: SummaryObject
      light: SummaryObject
      rem: SummaryObject
      wake: SummaryObject
    }
  }

  logId: number
  minutesAfterWakeup: number
  minutesAsleep: number
  minutesAwake: number
  minutesToFallAsleep: number
  startTime: string
  timeInBed: number
  type: string
}

export interface fitbitResponse {
  sleep: FitbitSleepObject[]
  summary: {
    stages: {
      deep: number
      light: number
      rem: number
      wake: number
    }
    totalMinutesAsleep: number
    totalSleepRecords: number
    totalTimeInBed: number
  }
}
