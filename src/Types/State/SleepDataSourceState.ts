export default interface SleepDataSourceState {
  linkedSource?: Source
  accessTokenExpirationDate?: string
  accessToken?: string
  refreshToken?: string
  tokenType?: string
  idToken?: string
}

export enum Source {
  oura = 'oura',
  withings = 'withings',
  fitbit = 'fitbit'
}
