import { API, Auth, graphqlOperation } from 'aws-amplify'
import 'react-native-get-random-values'
import { v4 } from 'uuid'
import {
  CreateSleepDataInput,
  CreateSleepDataMutation,
  NightSegmentInput,
  UpdateSleepDataInput,
  UpdateSleepDataMutation
} from '../../API'
import { createSleepData, updateSleepData } from '../../graphql/mutations'
import { GetState } from '../../Types/GetState'
import { Day, Night } from '../../Types/Sleepdata'
import { updateDay } from '../sleep/sleep-data-actions'

export const updateSleepDataInCloud = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const {
    sleepclock: { days }
  } = getState()

  const createPromises: Promise<CreateSleepDataMutation>[] = []
  const updatePromises: Promise<UpdateSleepDataMutation>[] = []
  const updateStatePromises: Promise<Function>[] = []

  const { username } = await Auth.currentUserInfo()
  if (username) {
    try {
      days.forEach((day: Day) => {
        if (day.mutated && day.id) {
          const input: UpdateSleepDataInput = {
            id: day.id,
            date: day.date,
            sleepDataUserId: username,
            rating: day.rating,
            night: formatNightToNightSegmentInput(day.night)
          }

          updatePromises.push(
            API.graphql(
              graphqlOperation(updateSleepData, {
                input
              })
            )
          )
        } else {
          const id = v4()
          const input: CreateSleepDataInput = {
            id,
            date: day.date,
            sleepDataUserId: username,
            rating: day.rating,
            night: formatNightToNightSegmentInput(day.night)
          }

          const updatedDay = { ...day, id, updated: false }

          createPromises.push(
            API.graphql(
              graphqlOperation(createSleepData, {
                input
              })
            )
          )
          updateStatePromises.push(dispatch(updateDay(updatedDay)))
        }
      })

      await Promise.all(createPromises)
      await Promise.all(updatePromises)
      await Promise.all(updateStatePromises)
    } catch (error) {
      console.warn(error)
    }
  }
}

const formatNightToNightSegmentInput = (
  nights: Night[]
): NightSegmentInput[] => {
  const formated: NightSegmentInput[] = nights.map((night) => ({
    value: night.value,
    sourceName: night.sourceName,
    sourceId: night.sourceId,
    startDate: night.startDate,
    endDate: night.endDate
  }))

  return formated
}
