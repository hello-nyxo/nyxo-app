import { getNightDuration } from '@helpers/sleep/sleep'
import { HealthKitSleepResponse, Night, Value } from '@typings/Sleepdata'

export const formatHealthKitResponse = (
  hkSample: HealthKitSleepResponse
): Night => {
  const startDate = new Date(hkSample.startDate).toISOString()
  const endDate = new Date(hkSample.endDate).toISOString()

  const totalDuration = getNightDuration(startDate, endDate)

  return {
    id: hkSample.uuid,
    sourceId: hkSample.sourceId,
    sourceName: hkSample.sourceName,
    value: healthKitSampleToValue(hkSample.value),
    startDate,
    endDate,
    totalDuration
  }
}

export const healthKitSampleToValue = (healthKitSample: string): Value => {
  switch (healthKitSample) {
    case 'INBED':
      return Value.InBed
    case 'ASLEEP':
      return Value.Asleep
    case 'AWAKE':
      return Value.Awake
    default:
      return Value.InBed
  }
}
