export const CALCULATE_INSIGHT_START = 'CALCULATE_INSIGHT_START'
export const CALCULATE_INSIGHT_SUCCESS = 'CALCULATE_INSIGHT_SUCCESS'
export const CALCULATE_INSIGHT_FAILURE = 'CALCULATE_INSIGHT_FAILURE'

export type Insight = {
  bedTimeWindow: BedTimeWindowInsight
}

export type BedTimeWindowInsight = {
  start: string | undefined
  center: string | undefined
  end: string | undefined
}

type InsightAction = {
  type: typeof CALCULATE_INSIGHT_START
}

type InsightSuccessAction = {
  type: typeof CALCULATE_INSIGHT_SUCCESS
  payload: Insight
}

type InsightFailAction = {
  type: typeof CALCULATE_INSIGHT_FAILURE
  payload: string
}

export type InsightActionTypes =
  | InsightAction
  | InsightSuccessAction
  | InsightFailAction
