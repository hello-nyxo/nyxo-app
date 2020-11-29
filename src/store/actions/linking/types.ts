export const LINKING_START = 'LINKING_START'
export const LINKING_SUCCESS = 'LINKING_SUCCESS'
export const LINKING_FAILURE = 'LINKING_FAILURE'

export const REMOVE_LINK_START = 'REMOVE_LINK_START'
export const REMOVE_LINK_SUCCESS = 'REMOVE_LINK_SUCCESS'
export const REMOVE_LINK_FAILURE = 'REMOVE_LINK_FAILURE'

type LinkingStartAction = {
  type: typeof LINKING_START
}

type LinkingSuccessAction = {
  type: typeof LINKING_SUCCESS
  payload: string | null | undefined
}

type LinkingFailAction = {
  type: typeof LINKING_FAILURE
}

type LinkingRemoveStartAction = {
  type: typeof REMOVE_LINK_START
}

type LinkingRemoveSuccessAction = {
  type: typeof REMOVE_LINK_SUCCESS
}

type LinkingRemoveFailAction = {
  type: typeof REMOVE_LINK_FAILURE
}

export type LinkingActions =
  | LinkingStartAction
  | LinkingFailAction
  | LinkingSuccessAction
  | LinkingRemoveStartAction
  | LinkingRemoveSuccessAction
  | LinkingRemoveFailAction
