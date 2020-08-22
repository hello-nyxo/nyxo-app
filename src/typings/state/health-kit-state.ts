export default interface HealthKitState {
  useHealthKit: boolean
  healthKitSource: null | string
  healthKitAvailable: boolean

  loading: boolean
}
