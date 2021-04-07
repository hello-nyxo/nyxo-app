import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import appleHealthKit, { SleepSample } from 'react-native-healthkit'

const healthKitOptions = {
  permissions: {
    read: ['HeartRate', 'ActiveEnergyBurned', 'SleepAnalysis'],
    write: ['SleepAnalysis']
  }
}
type State = {
  loading: 'idle' | 'pending'
  inited: boolean
}

const initialState: State = {
  loading: 'idle',
  inited: false
}

export const initHealthKit = createAsyncThunk(
  'healthKit/init',
  async (_, { rejectWithValue }) => {
    try {
      const init = await new Promise<boolean>((resolve, reject) => {
        appleHealthKit.initHealthKit(healthKitOptions, (err) => {
          if (err) {
            reject()
          } else {
            resolve(true)
          }
        })
      })

      return init
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

type FetchArguments = {
  startDate: string
  endDate: string
}

export const fetchHealthKit = createAsyncThunk<void, FetchArguments>(
  'healthKit/fetch',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const result = await new Promise<Array<SleepSample>>(
        (resolve, reject) => {
          appleHealthKit.getSleepSamples(
            {
              startDate,
              endDate
            },
            async (error: string, response: Array<SleepSample>) => {
              if (error) {
                reject(error)
              } else {
                resolve(response)
              }
            }
          )
        }
      )

      console.log(result)

      return undefined
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

const healthKitSlice = createSlice({
  name: 'healthKitSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Init
    builder.addCase(
      initHealthKit.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.inited = action.payload
        state.loading = 'idle'
      }
    )
    builder.addCase(initHealthKit.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(initHealthKit.rejected, (state) => {
      state.inited = false
      state.loading = 'idle'
    })
    // Fetch
    builder.addCase(fetchHealthKit.fulfilled, (state) => {
      state.loading = 'idle'
    })
    builder.addCase(fetchHealthKit.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchHealthKit.rejected, (state) => {
      state.loading = 'idle'
    })
  }
})

export default healthKitSlice.reducer

// export const prepareSleepDataFetching = (): AppThunk => async (dispatch) => {
//   if (Platform.OS === 'ios') {
//     await dispatch(initHealthKit())
//   }
// }

// export const initHealthKit = (): AppThunk => async (dispatch) => {
//   await AppleHealthKit.initHealthKit(healthKitOptions, (err) => {
//     if (err) {
//       dispatch(setHealthKitStatus(false))
//     } else {
//       dispatch(setHealthKitStatus(true))
//     }
//   })
// }

// /**
//    * Switches tracking source and gets all the new data
//    * @todo fix so that it does not always fetch all the data
//    * @param {Array} nights Unfiltered night data from Healthkit
//    *
// //    */
// //   export const switchHKSourceAndFetch = (
// //     hkSource: SUB_SOURCE
// //   ): AppThunk => async (dispatch) => {
// //     dispatch(changeHealthKitSource(hkSource))
// //     const { startDate, endDate } = getStartEndWeek()
// //     dispatch(fetchSleepData(startDate, endDate))
// //   }

// //   export const createHealthKitSources = (
// //     data: SleepSample[] = []
// //   ): AppThunk => async (dispatch, getState) => {
// //     const hkSource = getHealthKitSource(getState())

// //     const sourceList: SUB_SOURCE[] = [
// //       { sourceName: 'Nyxo', sourceId: 'app.sleepcircle.application' }
// //     ]

// //     data.forEach((item: SleepSample) => {
// //       const existingSource = sourceList.find(
// //         (source: SleepDataSource) => source.sourceId === item.sourceId
// //       )

// //       if (!existingSource) {
// //         sourceList.push({
// //           sourceName: item.sourceName,
// //           sourceId: item.sourceId
// //         })
// //       }
// //     })

// //     dispatch(updateHealthKitSources(sourceList))
// //     const noSleepTrackersInState = !hkSource

// //     if (noSleepTrackersInState) {
// //       const tracker = sourceList.length > 1 ? sourceList[1] : sourceList[0]
// //       await dispatch(changeHealthKitSource(tracker))
// //     }
// //   }

// //   export const fetchSleepFromHealthKit = (
// //     startDate?: string,
// //     endDate?: string
// //   ): AppThunk => async (dispatch) => {
// //     dispatch(fetchHKSleepStart())
// //     const options = {
// //       startDate,
// //       endDate
// //     }

// //     try {
// //       AppleHealthKit.getSleepSamples(
// //         options,
// //         async (error: string, response: Array<SleepSample>) => {
// //           if (error) {
// //             dispatch(fetchHKSleepFailure())
// //           }
// //           dispatch(createHealthKitSources(response))

// //           const formattedData: Night[] = response?.map((nightObject) =>
// //             formatHealthKitResponse(nightObject)
// //           )
// //           await dispatch(syncNightsToCloud(formattedData))
// //           await dispatch(fetchSleepSuccess(formattedData))
// //         }
// //       )
// //     } catch (error) {
// //       dispatch(fetchHKSleepFailure())
// //     } finally {
// //       dispatch(fetchHKSleepSuccess())
// //     }
// //   }
