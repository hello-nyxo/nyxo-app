import { createSelector } from 'reselect'
import { State } from '@typings/State'
import { AuthState } from '@typings/state/AuthState'

const getAuth = (state: State) => state.auth

export const getLoading = createSelector(
  getAuth,
  (state: AuthState) => state.loading
)
export const getAuthState = createSelector(
  getAuth,
  (state: AuthState) => state.authenticated
)
