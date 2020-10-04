import moment from 'moment'
import { Night, Value } from '@typings/Sleepdata'
import { getNightDuration } from '@helpers/sleep'
import { PolarSleepObject } from '@typings/Sleep/Polar'
import CONFIG from '@config/Config'

export const formatPolarSample = (
  polarSleepObject: PolarSleepObject
): Night[] => {
  const startDate = moment(polarSleepObject.sleep_start_time).toISOString()
  const endDate = moment(polarSleepObject.sleep_end_time).toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedSample: Night = {
    sourceId: CONFIG.POLAR_CONFIG.bundleId,
    sourceName: 'Polar',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  const asleepSamples: Night[] = []

  const hypnogramEntries = Object.entries(polarSleepObject.hypnogram)

  for (let i = 0; i < hypnogramEntries.length - 1; i++) {
    const startEntry = hypnogramEntries[i]
    const startEntryKey = startEntry[0] as string
    const startEntryValue = startEntry[1] as number

    const endEntry = hypnogramEntries[i + 1]
    const endEntryKey = endEntry[0] as string

    if (startEntryValue !== 0 && startEntryValue !== 5) {
      const startHours = parseInt(
        startEntryKey.substring(0, startEntryKey.indexOf(':'))
      )
      const startMinutes = parseInt(
        startEntryKey.substring(startEntryKey.indexOf(':') + 1)
      )
      const startDurationInMinute = startHours * 60 + startMinutes

      const endHours = parseInt(
        endEntryKey.substring(0, endEntryKey.indexOf(':'))
      )
      const endMinutes = parseInt(
        endEntryKey.substring(endEntryKey.indexOf(':') + 1)
      )
      const endDurationInMinute = endHours * 60 + endMinutes

      const startDurationDate = moment(
        moment(startDate).unix() + startDurationInMinute
      ).toISOString()
      const endDurationDate = moment(
        moment(endDate).unix() + endDurationInMinute
      ).toISOString()

      asleepSamples.push({
        sourceId: CONFIG.POLAR_CONFIG.bundleId,
        sourceName: 'Polar',
        value: Value.Asleep,
        startDate: startDurationDate,
        endDate: endDurationDate,
        totalDuration: endDurationInMinute - startDurationInMinute
      })
    }
  }

  return [inBedSample, ...asleepSamples]
}

export const formatPolarSamples = (samples: PolarSleepObject[]): Night[] => {
  const nights: Night[] = []
  if (samples) {
    samples.forEach((sample) => {
      nights.push(...formatPolarSample(sample))
    })
  }

  return nights
}
