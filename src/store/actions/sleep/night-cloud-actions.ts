import { API, graphqlOperation } from 'aws-amplify'
import { Dispatch, Thunk } from '@typings/ReduxActions'
import { GetState } from '@typings/GetState'
import { Night, Value } from '@typings/Sleepdata'
import { getUsername } from '@selectors/UserSelectors'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { CreateNightInput, NightValue } from '@API'
import * as Sentry from '@sentry/react-native'
import { createNight } from '@graphql/mutations'

export const syncNightsToCloud = (nights: Night[]): Thunk => async (
  _: Dispatch,
  getState: GetState
) => {
  try {
    const username = getUsername(getState())
    const loggedIn = getAuthState(getState())

    if (loggedIn && username) {
      const promises: Promise<void>[] = []
      nights.forEach((night) => {
        promises.push(syncNight(username, night))
      })

      await Promise.all(promises)
    }
  } catch (err) {
    console.log(err)

    Sentry.captureException(`syncNightsToCloud ${err}`)
  }
}

const syncNight = async (username: string, night: Night) => {
  const {
    id,
    sourceId,
    sourceName,
    totalDuration,
    endDate,
    startDate,
    value
  } = night
  try {
    const input: CreateNightInput = {
      id,
      sourceId,
      sourceName,
      startDate,
      endDate,
      value: convertNightValue(value),
      userId: username,
      totalDuration
    }

    const res = await API.graphql(graphqlOperation(createNight, { input }))
    console.log(res)
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
