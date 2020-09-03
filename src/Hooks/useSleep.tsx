import { useSelector } from 'react-redux'
import { getSelectedDay } from '@selectors/SleepDataSelectors'
import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '@selectors/insight-selectors/Insights'
import { getNightForSelectedDate } from '@selectors/night-selectors'
import { Night } from 'Types/Sleepdata'

type Hook = {
  windowStart: string
  windowEnd: string
  night: Night[]
}

const useSleep = (): Hook => {
  const windowStart = useSelector(getGoToSleepWindowStart)
  const windowEnd = useSelector(getGoToSleepWindowEnd)
  const night = useSelector(getNightForSelectedDate)

  return {
    windowStart,
    windowEnd,
    night
  }
}

export default useSleep
