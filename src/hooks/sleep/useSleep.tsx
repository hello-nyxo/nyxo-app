import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { getHealthKitData } from '@data-fetching/local/healthKit'
import { readGoogleFitSleep } from '@data-fetching/remote/google-fit'
import useCalendar from '@hooks/calendar'
import { QueryResult, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Night } from '@typings/Sleepdata'
import { SOURCE } from '@typings/state/sleep-source-state'

const getSleepData = async (
  key: string,
  { source, selectedDate }: { source: SOURCE; selectedDate: string }
): Promise<Night[]> => {
  switch (source) {
    case SOURCE.HEALTH_KIT: {
      return getHealthKitData(selectedDate)
    }
    case SOURCE.GOOGLE_FIT:
      return readGoogleFitSleep()

    // case SOURCE.FITBIT:
    //   // dispatch(getFitbitSleep())
    //   break
    // case SOURCE.OURA:
    //   // dispatch(getOuraSleep())
    //   break
    // case SOURCE.WITHINGS:
    //   // dispatch(getWithingsSleep())
    //   break
    // case SOURCE.GARMIN:
    //   // dispatch(getGarminSleep())
    //   break
    // case SOURCE.POLAR:
    //   // dispatch(getPolarSleep())
    //   break

    default:
      return []
  }
}

export const useGetSleep = (): QueryResult<Night[]> => {
  const { selectedDate } = useCalendar()
  const source = useSelector(getMainSource)

  return useQuery(['sleep', { source, selectedDate }], getSleepData)
}
