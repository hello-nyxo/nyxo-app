import { createSelector } from 'reselect'
import { State } from 'Types/State'
import { ApiState } from 'Types/State/api-state'

const getApi = (state: State) => state.apis

export const getFitbitEnabled = createSelector(getApi, (state: ApiState) =>
  state.fitbit ? state.fitbit.enabled : false
)

export const getGoogleFitEnabled = createSelector(getApi, (state: ApiState) =>
  state.googleFit ? state.googleFit.enabled : false
)

export const getWithingsEnabled = createSelector(getApi, (state: ApiState) =>
  state.withings ? state.withings.enabled : false
)

export const getOuraEnabled = createSelector(getApi, (state: ApiState) =>
  state.oura ? state.oura?.enabled : false
)

export const getLoadingGoogleFit = createSelector(
  getApi,
  (state: ApiState) => state.loadingGoogleFit
)

export const getLoadingFitbit = createSelector(
  getApi,
  (state: ApiState) => state.loadingFitbit
)

export const getFitbitToken = createSelector(getApi, (state) => ({
  user_id: state.fitbit?.user_id,
  accessToken: state.fitbit?.accessToken,
  accessTokenExpirationDate: state.fitbit?.accessTokenExpirationDate,
  refreshToken: state.fitbit?.refreshToken
}))

export const getOuraToken = createSelector(getApi, (state) => ({
  accessToken: state.oura?.accessToken,
  accessTokenExpirationDate: state.oura?.accessTokenExpirationDate,
  refreshToken: state.oura?.refreshToken
}))

export const getGoogleFitToken = createSelector(getApi, (state) => ({
  accessToken: state.googleFit?.accessToken,
  accessTokenExpirationDate: state.googleFit?.accessTokenExpirationDate,
  refreshToken: state.googleFit?.refreshToken
}))

export const getWithingsToken = createSelector(getApi, (state) => ({
  user_id: state.withings?.user_id,
  accessToken: state.withings?.accessToken,
  accessTokenExpirationDate: state.withings?.accessTokenExpirationDate,
  refreshToken: state.withings?.refreshToken
}))
