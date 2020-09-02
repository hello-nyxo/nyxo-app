import { API, graphqlOperation } from 'aws-amplify'
import { Dispatch, Thunk } from 'Types/ReduxActions'
import { GetState } from 'Types/GetState'
import { Night, Value } from 'Types/Sleepdata'
import { getUsername } from '@selectors/UserSelectors'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { CreateNightInput, NightValue } from 'API'
import * as Sentry from '@sentry/react-native'
import { createNight } from 'graphql/mutations'
import { Action } from 'redux'

export const syncNightsToCloud = (nights: Night[]): Thunk => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const username = getUsername(getState())
    const loggedIn = getAuthState(getState())

    if (loggedIn) {
      const promises: Promise<Action<void>>[] = []
      nights.forEach((night) => {
        promises.push(dispatch(syncNight(username, night)))
      })

      await Promise.all(promises)
    }
  } catch (err) {
    Sentry.captureException(`syncNightsToCloud ${err}`)
  }
}

const syncNight = async (username: string, night: Night) => {
  const {
    id,
    sourceId,
    sourceName,
    source = 'unknown',
    totalDuration,
    endDate,
    startDate,
    value
  } = night
  try {
    const syncingNight: CreateNightInput = {
      id,
      source,
      sourceId,
      sourceName,
      startDate,
      endDate,
      value: convertNightValue(value),
      userId: username,
      totalDuration
    }
    const response = await API.graphql(
      graphqlOperation(createNight, { input: syncingNight })
    )
  } catch (err) {
    console.log(err)
    Sentry.captureException(`syncNightsToCloud ${err}`)
  }
}

const convertNightValue = (value: Value): NightValue => {
  switch (value) {
    case Value.Asleep:
      return NightValue.Asleep
    case Value.Awake:
      return NightValue.Awake
    case Value.InBed:
      return NightValue.InBed
    default:
      return NightValue.InBed
  }
}
