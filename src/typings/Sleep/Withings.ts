/* eslint-disable camelcase */
export interface WithingsSleepObject {
  timezone: string
  model: number
  startdate: number
  enddate: number
  date: string
  modified: number | string
  data: {
    breathing_disturbances_intensity?: number
    deepsleepduration?: number
    durationtosleep?: number
    durationtowakeup?: number
    hr_average?: number
    hr_max?: number
    hr_min?: number
    lightsleepduration?: number
    remsleepduration?: number
    rr_average?: number
    rr_max?: number
    rr_min?: number
    sleep_score?: number
    snoring?: number
    snoringepisodecount?: number
    wakeupcount?: number
    wakeupduration?: number
  }
}
