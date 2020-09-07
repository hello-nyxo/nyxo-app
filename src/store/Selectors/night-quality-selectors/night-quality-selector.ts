import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { NightQualityState } from 'Types/Sleep/NightQuality'

const getNightQualityState = (state: State) => state.nightQuality
const getProps = (state: State, { date }: { date: string }) => date

export const makeGetRatingOnDate = () =>
  createSelector(
    getNightQualityState,
    getProps,
    (nightQualityState: NightQualityState, date: string) => {
      return nightQualityState.records.get(date)
    }
  )
