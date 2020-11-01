import { Value } from '@typings/Sleepdata'
import * as Sentry from '@sentry/react-native'
import { sha256 } from 'react-native-sha256'

export const generateNightId = async (
  serviceName: string,
  defaultId: string,
  startDate: string,
  endDate: string,
  value: Value
): Promise<null | string> => {
  const constructedString =
    serviceName + defaultId + startDate + endDate + value

  try {
    const hash = (await sha256(constructedString)) as string

    return hash
  } catch (err) {
    Sentry.captureException(`syncNightsToCloud ${err}`)
  }

  return null
}
