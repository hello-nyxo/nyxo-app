import { initialState as apiState } from '@reducers/api-reducer/api-reducer'
import { State } from '@typings/State'
import { Calendar } from '@initial-states/calendar-state'
import { manualData } from '@initial-states/manual-data-state'

export const mockState: State = {
  apis: apiState,
  manualData,
  calendar: Calendar
}
