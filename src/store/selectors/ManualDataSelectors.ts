import { createSelector } from 'reselect'
import { State } from '@typings/State'
import { ManualDataState } from '@typings/state/ManualDataState'

const getState = (state: State) => state.manualData

export const getEditMode = createSelector(
  getState,
  (state: ManualDataState) => state.editMode
)

export const getStartTime = createSelector(
  getState,
  (state: ManualDataState) => state.startTime
)

export const getEndTime = createSelector(
  getState,
  (state: ManualDataState) => state.endTime
)
