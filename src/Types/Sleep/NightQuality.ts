export interface NightQualityState {
  records: Map<string, NightQuality>
  // localRecords: Map<string, NightQuality> // --- CAN DELETE ---
}

export interface NightQuality {
  id: string
  rating: number // 1 - sad, 2 - nothing new, 3 - smirk, 4 - happy
  date: string
}
