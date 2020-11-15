import { createSelector } from 'reselect'
import { State } from '@typings/State'
import { SleepSourceState, SOURCE } from '@typings/state/sleep-source-state'
import CONFIG from '@config/Config'

const getSleepSourcesState = (state: State) => state.sleepSources

export const getMainSource = createSelector(
  getSleepSourcesState,
  (state: SleepSourceState) => state.mainSource
)

export const getIsHealthKitMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.HEALTH_KIT
)

export const getIsGoogleFitMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.GOOGLE_FIT
)

export const getIsFitbitMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.FITBIT
)

export const getIsOuraMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.OURA
)

export const getIsWithingsMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.WITHINGS
)

export const getIsGarminMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.GARMIN
)

export const getIsPolarMainSource = createSelector(
  getMainSource,
  (source) => source === SOURCE.POLAR
)

export const getHealthKitSource = createSelector(
  getSleepSourcesState,
  (state: SleepSourceState) => state.healthKitSource
)

export const getAllHealthKitSources = createSelector(
  getSleepSourcesState,
  (state: SleepSourceState) => state.allHealthKitSources
)

export const getGoogleFitSource = createSelector(
  getSleepSourcesState,
  (state: SleepSourceState) => state.googleFitSource
)

export const getSharedSource = createSelector(
  [getMainSource, getGoogleFitSource, getHealthKitSource],
  (mainSource, googleFitSource, healthKitSource) => {
    switch (mainSource) {
      case SOURCE.GOOGLE_FIT:
        return {
          sourceName: googleFitSource?.sourceName,
          sourceId: googleFitSource?.sourceId
        }
      case SOURCE.FITBIT:
        return { sourceName: 'Fitbit', sourceId: CONFIG.FITBIT_CONFIG.bundleId }
      case SOURCE.OURA:
        return { sourceName: 'Oura', sourceId: CONFIG.OURA_CONFIG.bundleId }
      case SOURCE.HEALTH_KIT:
        return {
          sourceName: healthKitSource?.sourceName,
          sourceId: healthKitSource?.sourceId
        }
      case SOURCE.WITHINGS:
        return {
          sourceName: 'Withings',
          sourceId: CONFIG.WITHINGS_CONFIG.bundleId
        }

      default:
        return { sourceName: 'no-source', sourceId: 'no-source' }
    }
  }
)

export const getAllGoogleFitSources = createSelector(
  getSleepSourcesState,
  (state: SleepSourceState) => state.allGoogleFitSources
)
