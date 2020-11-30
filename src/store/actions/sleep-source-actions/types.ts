/* ACTION TYPES */

import { SOURCE, SUB_SOURCE } from '@typings/state/sleep-source-state'

export const SET_MAIN_SOURCE = 'SET_MAIN_SOURCE'
export const CHANGE_HEALTH_KIT_SOURCE = 'CHANGE_HEALTH_KIT_SOURCE'
export const UPDATE_HEALTH_KIT_SOURCES = 'UPDATE_HEALTH_KIT_SOURCES'

export const CHANGE_GOOGLE_FIT_SOURCE = 'CHANGE_GOOGLE_FIT_SOURCE'
export const UPDATE_GOOGLE_FIT_SOURCES = 'UPDATE_GOOGLE_FIT_SOURCES'

type SetSourceAction = {
  type: typeof SET_MAIN_SOURCE
  payload: { mainSource: SOURCE }
}

type ChangeHealthKitSourceAction = {
  type: typeof CHANGE_HEALTH_KIT_SOURCE
  payload: { healthKitSource: SUB_SOURCE }
}

type UpdateHealthKitSourcesAction = {
  type: typeof UPDATE_HEALTH_KIT_SOURCES
  payload: { sources: SUB_SOURCE[] }
}

type ChangeGoogleFitSourceAction = {
  type: typeof CHANGE_GOOGLE_FIT_SOURCE
  payload: { googleFitSource: SUB_SOURCE }
}

type UpdateGoogleFitSourcesAction = {
  type: typeof UPDATE_GOOGLE_FIT_SOURCES
  payload: { sources: SUB_SOURCE[] }
}

export type SleepSourceActions =
  | SetSourceAction
  | ChangeHealthKitSourceAction
  | ChangeGoogleFitSourceAction
  | UpdateHealthKitSourcesAction
  | UpdateGoogleFitSourcesAction
