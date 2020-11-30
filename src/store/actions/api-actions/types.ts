import { ResponseBase } from '@typings/State/api-state'

export const WITHINGS_AUTHORIZE_SUCCESS = 'WITHINGS_AUTHORIZE_SUCCESS'
export const WITHINGS_REVOKE_SUCCESS = 'WITHINGS_REVOKE_SUCCESS'
export const WITHINGS_UPDATE_TOKEN = 'WITHINGS_UPDATE_TOKEN'
export const FETCH_SLEEP_WITHINGS_START = 'FETCH_SLEEP_WITHINGS_START'
export const FETCH_SLEEP_WITHINGS_SUCCESS = 'FETCH_SLEEP_WITHINGS_SUCCESS'
export const FETCH_SLEEP_WITHINGS_FAILURE = 'FETCH_SLEEP_WITHINGS_FAILURE'

export const POLAR_AUTHORIZE_SUCCESS = 'POLAR_AUTHORIZE_SUCCESS'
export const POLAR_REVOKE_SUCCESS = 'POLAR_REVOKE_SUCCESS'
export const POLAR_UPDATE_TOKEN = 'POLAR_UPDATE_TOKEN'
export const FETCH_SLEEP_POLAR_START = 'FETCH_SLEEP_POLAR_START'
export const FETCH_SLEEP_POLAR_SUCCESS = 'FETCH_SLEEP_POLAR_SUCCESS'
export const FETCH_SLEEP_POLAR_FAILURE = 'FETCH_SLEEP_POLAR_FAILURE'

export const OURA_AUTHORIZE_SUCCESS = 'OURA_AUTHORIZE_SUCCESS'
export const OURA_REVOKE_SUCCESS = 'OURA_REVOKE_SUCCESS'
export const OURA_UPDATE_TOKEN = 'OURA_UPDATE_TOKEN'
export const FETCH_SLEEP_OURA_START = 'FETCH_SLEEP_OURA_START'
export const FETCH_SLEEP_OURA_SUCCESS = 'FETCH_SLEEP_OURA_SUCCESS'
export const FETCH_SLEEP_OURA_FAILURE = 'FETCH_SLEEP_OURA_FAILURE'

export const GOOGLE_FIT_AUTHORIZE_SUCCESS = 'GOOGLE_FIT_AUTHORIZE_SUCCESS'
export const GOOGLE_FIT_REVOKE_SUCCESS = 'GOOGLE_FIT_REVOKE_SUCCESS'
export const GOOGLE_FIT_UPDATE_TOKEN = 'GOOGLE_FIT_UPDATE_TOKEN'
export const FETCH_GOOGLE_FIT_START = 'FETCH_GOOGLE_FIT_START'
export const FETCH_GOOGLE_FIT_SUCCESS = 'FETCH_GOOGLE_FIT_SUCCESS'
export const FETCH_GOOGLE_FIT_FAILURE = 'FETCH_GOOGLE_FIT_FAILURE'

export const FITBIT_AUTHORIZE_SUCCESS = 'FITBIT_AUTHORIZE_SUCCESS'
export const FITBIT_REVOKE_SUCCESS = 'FITBIT_REVOKE_SUCCESS'
export const FITBIT_UPDATE_TOKEN = 'FITBIT_UPDATE_TOKEN'
export const FETCH_SLEEP_FITBIT_START = 'FETCH_SLEEP_FITBIT_START'
export const FETCH_SLEEP_FITBIT_SUCCESS = 'FETCH_SLEEP_FITBIT_SUCCESS'
export const FETCH_SLEEP_FITBIT_FAILURE = 'FETCH_SLEEP_FITBIT_FAILURE'

export const GARMIN_AUTHORIZE_SUCCESS = 'GARMIN_AUTHORIZE_SUCCESS'
export const GARMIN_REVOKE_SUCCESS = 'GARMIN_REVOKE_SUCCESS'
export const GARMIN_UPDATE_TOKEN = 'GARMIN_UPDATE_TOKEN'
export const FETCH_SLEEP_GARMIN_START = 'FETCH_SLEEP_GARMIN_START'
export const FETCH_SLEEP_GARMIN_SUCCESS = 'FETCH_SLEEP_GARMIN_SUCCESS'
export const FETCH_SLEEP_GARMIN_FAILURE = 'FETCH_SLEEP_GARMIN_FAILURE'

type WithingsRevokeSuccessAction = {
  type: typeof WITHINGS_REVOKE_SUCCESS
}

type WithingsAuthorizeSuccessAction = {
  type: typeof WITHINGS_AUTHORIZE_SUCCESS
  payload: ResponseBase
}

type WithingsUpdateTokenAction = {
  type: typeof WITHINGS_UPDATE_TOKEN
  payload: ResponseBase
}

type WithingsFetchSleepStartAction = {
  type: typeof FETCH_SLEEP_WITHINGS_START
}

type WithingsFetchSleepSuccessAction = {
  type: typeof FETCH_SLEEP_WITHINGS_SUCCESS
}

type WithingsFetchSleepFailAction = {
  type: typeof FETCH_SLEEP_WITHINGS_FAILURE
}

type PolarRevokeSuccessAction = {
  type: typeof POLAR_REVOKE_SUCCESS
}

type PolarAuthorizeSuccessAction = {
  type: typeof POLAR_AUTHORIZE_SUCCESS
  payload: ResponseBase
}

type PolarUpdateTokenAction = {
  type: typeof POLAR_UPDATE_TOKEN
  payload: ResponseBase
}

type PolarFetchSleepStartAction = {
  type: typeof FETCH_SLEEP_POLAR_START
}

type PolarFetchSleepSuccessAction = {
  type: typeof FETCH_SLEEP_POLAR_SUCCESS
}

type PolarFetchSleepFailAction = {
  type: typeof FETCH_SLEEP_POLAR_FAILURE
}

type OuraRevokeSuccessAction = {
  type: typeof OURA_REVOKE_SUCCESS
}

type OuraAuthorizeSuccessAction = {
  type: typeof OURA_AUTHORIZE_SUCCESS
  payload: ResponseBase
}

type OuraUpdateTokenAction = {
  type: typeof OURA_UPDATE_TOKEN
  payload: ResponseBase
}

type OuraFetchSleepStartAction = {
  type: typeof FETCH_SLEEP_OURA_START
}

type OuraFetchSleepSuccessAction = {
  type: typeof FETCH_SLEEP_OURA_SUCCESS
}

type OuraFetchSleepFailAction = {
  type: typeof FETCH_SLEEP_OURA_FAILURE
}

type GoogleFitRevokeSuccessAction = {
  type: typeof GOOGLE_FIT_REVOKE_SUCCESS
}

type GoogleFitAuthorizeSuccessAction = {
  type: typeof GOOGLE_FIT_AUTHORIZE_SUCCESS
  payload: ResponseBase
}

type GoogleFitUpdateTokenAction = {
  type: typeof GOOGLE_FIT_UPDATE_TOKEN
  payload: ResponseBase
}

type GoogleFitFetchSleepStartAction = {
  type: typeof FETCH_GOOGLE_FIT_START
}

type GoogleFitFetchSleepSuccessAction = {
  type: typeof FETCH_GOOGLE_FIT_SUCCESS
}

type GoogleFitFetchSleepFailAction = {
  type: typeof FETCH_GOOGLE_FIT_FAILURE
}

type FitbitRevokeSuccessAction = {
  type: typeof FITBIT_REVOKE_SUCCESS
}

type FitbitAuthorizeSuccessAction = {
  type: typeof FITBIT_AUTHORIZE_SUCCESS
  payload: ResponseBase
}

type FitbitUpdateTokenAction = {
  type: typeof FITBIT_UPDATE_TOKEN
  payload: ResponseBase
}

type FitbitFetchSleepStartAction = {
  type: typeof FETCH_SLEEP_FITBIT_START
}

type FitbitFetchSleepSuccessAction = {
  type: typeof FETCH_SLEEP_FITBIT_SUCCESS
}

type FitbitFetchSleepFailAction = {
  type: typeof FETCH_SLEEP_FITBIT_FAILURE
}

type GarminRevokeSuccessAction = {
  type: typeof GARMIN_REVOKE_SUCCESS
}

type GarminAuthorizeSuccessAction = {
  type: typeof GARMIN_AUTHORIZE_SUCCESS
  payload: ResponseBase
}

type GarminUpdateTokenAction = {
  type: typeof GARMIN_UPDATE_TOKEN
  payload: ResponseBase
}

type GarminFetchSleepStartAction = {
  type: typeof FETCH_SLEEP_GARMIN_START
}

type GarminFetchSleepSuccessAction = {
  type: typeof FETCH_SLEEP_GARMIN_SUCCESS
}

type GarminFetchSleepFailAction = {
  type: typeof FETCH_SLEEP_GARMIN_FAILURE
}

export type ApiActions =
  | WithingsRevokeSuccessAction
  | WithingsAuthorizeSuccessAction
  | WithingsUpdateTokenAction
  | WithingsFetchSleepStartAction
  | WithingsFetchSleepSuccessAction
  | WithingsFetchSleepFailAction
  | PolarRevokeSuccessAction
  | PolarAuthorizeSuccessAction
  | PolarUpdateTokenAction
  | PolarFetchSleepStartAction
  | PolarFetchSleepSuccessAction
  | PolarFetchSleepFailAction
  | OuraRevokeSuccessAction
  | OuraAuthorizeSuccessAction
  | OuraUpdateTokenAction
  | OuraFetchSleepStartAction
  | OuraFetchSleepSuccessAction
  | OuraFetchSleepFailAction
  | GoogleFitRevokeSuccessAction
  | GoogleFitAuthorizeSuccessAction
  | GoogleFitUpdateTokenAction
  | GoogleFitFetchSleepStartAction
  | GoogleFitFetchSleepSuccessAction
  | GoogleFitFetchSleepFailAction
  | FitbitRevokeSuccessAction
  | FitbitAuthorizeSuccessAction
  | FitbitUpdateTokenAction
  | FitbitFetchSleepStartAction
  | FitbitFetchSleepSuccessAction
  | FitbitFetchSleepFailAction
  | GarminRevokeSuccessAction
  | GarminAuthorizeSuccessAction
  | GarminUpdateTokenAction
  | GarminFetchSleepStartAction
  | GarminFetchSleepSuccessAction
  | GarminFetchSleepFailAction
