import { CreateNightInput } from '@API'
import { createNight } from '@graphql/mutations'
import { convertNightValue } from '@helpers/sleep/sleep-data-helper'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { getUsername } from '@selectors/UserSelectors'
import * as Sentry from '@sentry/react-native'
import { GetState } from '@typings/GetState'
import { Dispatch, Thunk } from '@typings/ReduxActions'
import { Night } from '@typings/Sleepdata'
import { API, graphqlOperation } from 'aws-amplify'

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
  } catch (err) {
    Sentry.captureException(`syncNightsToCloud ${err}`)
  }
}
