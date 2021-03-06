import { State } from '@typings/State'
import { enableMapSet } from 'immer'
import { Action } from 'redux'
import configureStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { linkAccount, linkSuccess } from './linking-actions'

enableMapSet()

jest.mock('aws-amplify', () => ({
  API: jest.fn(),
  Auth: jest.fn()
}))

const middlewares = [thunk]

type S = {
  linking: State['linking']
}

type DispatchExts = ThunkDispatch<State, unknown, Action<string>>

const mockStore = configureStore<State, DispatchExts>(middlewares)

const state: S = {
  linking: {
    loading: false,
    linkCode: ''
  }
}

const store = mockStore(state)

describe('Linking actions:', () => {
  afterEach(() => {
    store.clearActions()
  })

  it('Active linking code should link and enable subscription', async () => {
    await store.dispatch(linkAccount('123467890'))

    const expectedActions = [linkSuccess('123467890')]

    expect(store.getActions()).toEqual(expectedActions)
  })
})
