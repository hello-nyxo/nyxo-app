import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { State } from './State'

interface ReduxAction {
  type: string
  payload?: any
  error?: any
}

export default ReduxAction

export type ThunkResult<R> = ThunkAction<R, State, void, ReduxAction>

export type Thunk = ThunkResult<Promise<void>>

export type Dispatch = ThunkDispatch<any, any, Action>
