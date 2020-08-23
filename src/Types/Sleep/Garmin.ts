export interface GarminSleepObject {
  summaryId: string
  calendarDate: string
  startTimeInSeconds: number
  startTimeOffsetInSeconds: number
  durationInSeconds: number
  unmeasurableSleepInSeconds: number
  deepSleepDurationInSeconds: number
  lightSleepDurationInSeconds: number
  remSleepInSeconds: number
  awakeDurationInSeconds: number
  sleepLevelsMap: {
    deep?: GarminSleepTimeLevel[]
    light?: GarminSleepTimeLevel[]
    rem?: GarminSleepTimeLevel[]
    awake?: GarminSleepTimeLevel[]
  }
  validation: SleepValidation
  timeOffsetSleepRespiration: any
  timeOffsetSleepSpo2: any
}

export interface GarminSleepTimeLevel {
  startTimeInSeconds: number
  endTimeInSeconds: number
}

enum SleepValidation {
  MANUAL = 'MANUAL',
  DEVICE = 'DEVICE',
  AUTO_TENTATIVE = 'AUTO_TENTATIVE',
  AUTO_FINAL = 'AUTO_FINAL',
  AUTO_MANUAL = 'AUTO_MANUAL',
  ENHANCED_TENTATIVE = 'ENHANCED_TENTATIVE',
  ENHANCED_FINAL = 'ENHANCED_FINAL'
}
