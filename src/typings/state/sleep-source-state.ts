export enum SOURCE {
  HEALTH_KIT = 'HEALTH_KIT',
  GOOGLE_FIT = 'GOOGLE_FIT',
  GARMIN = 'GARMIN',
  FITBIT = 'FITBIT',
  WITHINGS = 'WITHINGS',
  OURA = 'OURA',
  POLAR = 'POLAR',
  NO_SOURCE = 'NO_SOURCE'
}

export type SleepSourceState = {
  mainSource?: SOURCE
  healthKitSource?: SUB_SOURCE
  allHealthKitSources?: SUB_SOURCE[]

  googleFitSource?: SUB_SOURCE
  allGoogleFitSources?: SUB_SOURCE[]
}

export type SUB_SOURCE = {
  sourceName: string
  sourceId: string
}
