import { fetchFitbit } from '@reducers/sleep'
import { useAppDispatch, useAppSelector } from './redux'

export const useFetchSleep = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.sleep)

  const fetchSingleNight = ({ startDate, endDate }) => {
    dispatch(
      fetchFitbit({
        startDate,
        endDate
      })
    )
  }

  return { loading: loading }
}
