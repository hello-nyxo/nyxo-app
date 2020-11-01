export type InsightState = {
  loading?: boolean
  bedTimeWindow: {
    start: string | undefined
    center: string | undefined
    end: string | undefined
  }
}
