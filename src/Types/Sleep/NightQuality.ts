export interface NightQualityGeneral {
  records: Map<string, NightQuality>
}

export interface NightQuality {
  id: string
  rating: number // 1 - sad, 2 - nothing new, 3 - smirk, 4 - happy
  date: string
}
