export interface TrackingState {
  useChargerTracking: boolean
  isTrackingAutomatically: boolean
  automaticTrackingStarted: string | null
  automaticTrackingEnded: string | null
  isTracking: boolean | null

  showManualButtons: boolean | null
}
