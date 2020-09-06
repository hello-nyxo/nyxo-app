import { useMutation, useQuery, QueryResult } from 'react-query'
import useCalendar from 'hooks/calendar'
import { Night } from 'Types/Sleepdata'
import { getHealthKitData } from 'data-fetching/local/healthKit'

export const useGetSleep = (): QueryResult<Night[], any> => {
  const { selectedDate } = useCalendar()

  return useQuery(['sleep', selectedDate], getHealthKitData)
}
