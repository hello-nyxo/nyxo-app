import { RefreshResult, AuthorizeResult } from 'react-native-app-auth'

export interface ApiState {
  fitbit?: FitbitAuthResponse
  googleFit?: GoogleFitResponse
  garmin?: GarminResponse
  polar?: PolarResponse
  oura?: OuraResponse
  suunto?: SuuntoResponse
  withings?: WithingsResponse

  loadingFitbit: boolean
  loadingGoogleFit: boolean
  loadingOura: boolean
}

export interface ResponseBase {
  enabled: boolean
  accessTokenExpirationDate: string
  refreshToken: string
  accessToken: string
}

export interface FitbitAuthResponse extends ResponseBase {
  user_id?: string
}

export type GoogleFitResponse = ResponseBase

export type SuuntoResponse = ResponseBase

export interface OuraResponse extends ResponseBase {
  user_id?: string
}

export type GarminResponse = ResponseBase

export type PolarResponse = ResponseBase

export interface WithingsResponse extends ResponseBase {
  user_id?: string
}

export interface FitbitRefreshResult extends RefreshResult {
  refreshToken: string
  additionalParameters: {
    user_id: string
  }
}

export interface FitbitAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  tokenAdditionalParameters: {
    user_id: string
  }
}

export type OuraAuthorizeResult = AuthorizeResult
