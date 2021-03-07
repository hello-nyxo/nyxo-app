import { createSelector } from 'reselect'
import { State } from '@typings/State'
import { ApiState } from '@typings/state/api-state'

const getApi = (state: State) => state?.apis

export const getFitbitEnabled = createSelector(getApi, (state: ApiState) =>
  state?.fitbit ? state?.fitbit.enabled : false
)

export const getGoogleFitEnabled = createSelector(getApi, (state: ApiState) =>
  state?.googleFit ? state?.googleFit.enabled : false
)

export const getWithingsEnabled = createSelector(getApi, (state: ApiState) =>
  state?.withings ? state?.withings.enabled : false
)

export const getOuraEnabled = createSelector(getApi, (state: ApiState) =>
  state?.oura ? state?.oura?.enabled : false
)

export const getGarminEnabled = createSelector(getApi, (state: ApiState) =>
  state?.garmin ? state?.garmin?.enabled : false
)

export const getPolarEnabled = createSelector(getApi, (state: ApiState) =>
  state?.polar ? state?.polar?.enabled : false
)

export const getLoadingGoogleFit = createSelector(
  getApi,
  (state: ApiState) => state?.loadingGoogleFit
)

export const getLoadingFitbit = createSelector(
  getApi,
  (state: ApiState) => state?.loadingFitbit
)
