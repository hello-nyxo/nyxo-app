export interface iOSSample {
  startDate: string
  endDate: string
  value: Value
  sourceId?: string
  sourceName?: string
  id: string
}

export interface AndroidSample {
  start: string
  end: number
  value: Value
  sourceId: string
  name: string
}

export interface Days {
  days: Day[]
}

export interface Day {
  date: string
  night: Night[]
  unfilteredNight?: Night[]

  bedStart?: string | null
  bedEnd?: string | null
  sleepStart?: string | null
  sleepEnd?: string | null
  asleepDuration?: number
  inBedDuration?: number

  rating?: number

  mutated?: boolean
  id?: string
}

export interface HealthKitSleepResponse {
  sourceId: string
  sourceName: string
  id: string
  value: string
  startDate: string
  endDate: string
}

export type Night = {
  source?: string
  sourceId: string
  sourceName: string

  value: Value
  startDate: string
  endDate: string
  totalDuration: number
}

export enum Value {
  InBed = 'INBED',
  Asleep = 'ASLEEP',
  Awake = 'AWAKE'
}

export interface InsightTypes {
  goToSleepWindow?: string
  goToSleepWindowStart: string
  goToSleepWindowCenter: string
  goToSleepWindowEnd: string
}
