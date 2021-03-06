export interface PolarSleepObject {
  polar_user: string
  date: string
  sleep_start_time: string
  sleep_end_time: string
  device_id: string
  continuity: number
  continuity_class: number
  light_sleep: number
  deep_sleep: number
  rem_sleep: number
  unrecognized_sleep_stage: number
  sleep_score: number
  total_interruption_duration: number
  sleep_charge: number
  sleep_goal: number
  sleep_rating: number
  short_interrupted_duration: number
  long_interrupted_duration: number
  sleep_cycles: number
  group_duration_score: number
  group_solidity_score: number
  group_regeneration_score: number
  hypnogram: Record<string, number>[]
  heart_rate_samples: Record<string, number>[]
}
