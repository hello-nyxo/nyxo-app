import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { NightQualityState } from 'Types/Sleep/NightQuality'
// import { UserState } from 'Types/UserState' // --- CAN DELETE ---

const getNightQualityState = (state: State) => state.nightQuality
// const getUserState = (state: State) => state.user // --- CAN DELETE ---
const getProps = (state: State, { date }: { date: string }) => date

// --- CAN DELETE ---
// export const makeGetRatingOnDate = () =>
//   createSelector(
//     getNightQualityState,
//     getUserState,
//     getProps,
//     (
//       nightQualityState: NightQualityState,
//       userState: UserState,
//       date: string
//     ) => {
//       const { authenticated } = userState
//       if (authenticated) return nightQualityState.records.get(date)

//       return nightQualityState.localRecords.get(date)
//     }
//   )

export const makeGetRatingOnDate = () =>
  createSelector(
    getNightQualityState,
    getProps,
    (nightQualityState: NightQualityState, date: string) => {
      return nightQualityState.records.get(date)
    }
  )
