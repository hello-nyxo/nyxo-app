import { Night } from '@typings/Sleepdata'

export const FETCH_SLEEP_HEALTH_KIT_START = 'FETCH_SLEEP_HEALTH_KIT_START'
export const FETCH_SLEEP_HEALTH_KIT_SUCCESS = 'FETCH_SLEEP_HEALTH_KIT_SUCCESS'
export const FETCH_SLEEP_HEALTH_KIT_FAILURE = 'FETCH_SLEEP_HEALTH_KIT_FAILURE'
export const FETCH_SLEEP_SUCCESS = 'FETCH_SLEEP_SUCCESS'

export const SWITCH_HEALTH_KIT_SOURCE = 'SWITCH_HEALTH_KIT_SOURCE'

export const TOGGLE_USE_HEALTH_KIT = 'TOGGLE_USE_HEALTH_KIT'
export const SET_HEALTH_KIT_STATUS = 'SET_HEALTH_KIT_STATUS'

type FetchHealthKitAction = {
  type: typeof FETCH_SLEEP_HEALTH_KIT_START
}

type FetchHealthKitSuccessAction = {
  type: typeof FETCH_SLEEP_HEALTH_KIT_SUCCESS
}

type FetchHealthKitFailAction = {
  type: typeof FETCH_SLEEP_HEALTH_KIT_FAILURE
}

type ToggleUseHealthKitAction = {
  type: typeof TOGGLE_USE_HEALTH_KIT
  payload: boolean
}

type SetHealthKitAvailableAction = {
  type: typeof SET_HEALTH_KIT_STATUS
  payload: boolean
}

type FetchSleepSuccessAction = {
  type: typeof FETCH_SLEEP_SUCCESS
  payload: Night[]
}

export type SleepActions =
  | FetchHealthKitAction
  | FetchHealthKitSuccessAction
  | FetchHealthKitFailAction
  | ToggleUseHealthKitAction
  | SetHealthKitAvailableAction
  | FetchSleepSuccessAction
