import { NightQuality } from 'Types/Sleep/NightQuality'

export const UPDATE_NIGHT_QUALITY = 'UPDATE_NIGHT_QUALITY'
export const DELETE_NIGHT_QUALITY = 'DELETE_NIGHT_QUALITY'

export const updateNightQuality = (nightQuality: NightQuality) => ({
  type: UPDATE_NIGHT_QUALITY,
  payload: nightQuality
})

export const deleteNightQuality = (nightQualityId: string) => ({
  type: DELETE_NIGHT_QUALITY,
  payload: nightQualityId
})
