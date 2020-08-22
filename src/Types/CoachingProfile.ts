export default interface CoachingProfile {
  chronotype: Chronotype | null
}

export type Chronotype = {
  EVENING: 'EVENING'
  DAY: 'DAY'
  MORNING: 'MORNING'
}
