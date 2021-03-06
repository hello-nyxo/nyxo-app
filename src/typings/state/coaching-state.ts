import { GetCoachingDataQuery } from '@API'

export type CoachingData = Omit<
  Exclude<GetCoachingDataQuery['getCoachingData'], null>,
  '__typename'
>
