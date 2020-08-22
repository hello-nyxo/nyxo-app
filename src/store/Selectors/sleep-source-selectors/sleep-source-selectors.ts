import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { SleepSourceState, SOURCE } from 'typings/state/sleep-source-state'

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
        return googleFitSource
      case SOURCE.FITBIT:
        return { sourceName: 'Fitbit', sourceId: 'com.fitbit.FitbitMobilet' }
      case SOURCE.OURA:
        return { sourceName: 'Oura', sourceId: 'com.ouraring.oura' }

      case SOURCE.WITHINGS:
        return { sourceName: 'Withings', sourceId: 'com.withings.wiScaleNG' }
      default:
        return healthKitSource
    }
  }
)

export const getAllGoogleFitSources = createSelector(
  getSleepSourcesState,
  (state: SleepSourceState) => state.allGoogleFitSources
)
