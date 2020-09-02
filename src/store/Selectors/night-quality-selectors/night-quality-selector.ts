import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { NightQualityState } from 'Types/Sleep/NightQuality'
import { UserState } from 'Types/UserState'

const getNightQualityState = (state: State) => state.nightQuality
const getUserState = (state: State) => state.user
const getProps = (state: State, { date }: { date: string }) => date

export const makeGetRatingOnDate = () =>
  createSelector(
    getNightQualityState,
    getUserState,
    getProps,
    (
      nightQualityState: NightQualityState,
      userState: UserState,
      date: string
    ) => {
      const { authenticated } = userState
      if (authenticated) return nightQualityState.records.get(date)

      return nightQualityState.localRecords.get(date)
    }
  )
