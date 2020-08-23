import { getNightDuration } from 'helpers/sleep'
import { Night, Value } from 'Types/Sleepdata'

type GoogleFitSession = {
  id: string
  name: string
  activeTimeMillis: number
  activityType: number
  application: {
    detailsUrl: string
    name: string
    packageName: string
    version: string
  }
  startTimeMillis: string
  endTimeMillis: string
}

export enum SleepActivityTypes {
  Sleeping = 72,
  Light_sleep = 109,
  Deep_sleep = 110,
  REM_sleep = 111,
  Awake = 112
}

export const formatGoogleFitData = (
  sessions: GoogleFitSession[] | undefined
): Night[] => {
  const samples: Night[] = []

  if (!sessions) return []

  sessions.forEach((session) => {
    if (session.activityType === SleepActivityTypes.Sleeping) {
      const startDate = new Date(
        parseInt(session.startTimeMillis, 10)
      ).toISOString()
      const endDate = new Date(
        parseInt(session.endTimeMillis, 10)
      ).toISOString()

      const night: Night = {
        id: `google-fit-${session.id}`,
        sourceId: session.application.packageName,
        sourceName: 'Google Fit',
        startDate,
        endDate,
        value: Value.Asleep,
        totalDuration: getNightDuration(startDate, endDate)
      }
      samples.push(night)
    }
  })

  return samples
}
