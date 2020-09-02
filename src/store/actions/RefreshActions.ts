import { getSleepDataUpdated } from '@selectors/SleepDataSelectors'
import { GetState } from 'Types/GetState'
import { fetchSleepData } from './sleep/sleep-data-actions'
import { prepareSleepDataFetching } from './sleep/health-kit-actions'

export const refreshSleep = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const sleepDataUpdate = getSleepDataUpdated(getState())
  await dispatch(prepareSleepDataFetching())
  await dispatch(fetchSleepData())
  // await dispatch(getAllWeeks());
}

export const refreshCoaching = async (
  dispatch: Function,
  getState: GetState
) => {}

export const refreshSubscription = async (
  dispatch: Function,
  getState: GetState
) => {}
