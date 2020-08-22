import React, { memo } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import InfoRow from '../../components/InfoRow'
import { minutesToHoursString } from '../../helpers/time'
import {
  getBedTimeNights,
  getAverageBedTime,
  deviationBedTime,
  getShortestBedTime,
  getLongestBedTime,
  getNightsWithOver8HoursBedTime
} from '../../store/Selectors/SleepDataSelectors'
import { H3, P, Container } from '../../components/Primitives/Primitives'

const { width } = Dimensions.get('window')

const BedStatsView = () => {
  const nights = useSelector(getBedTimeNights)
  const average = useSelector(getAverageBedTime)
  const deviation = useSelector(deviationBedTime)
  const shortestNight = useSelector(getShortestBedTime)
  const longestNight = useSelector(getLongestBedTime)
  const over8 = useSelector(getNightsWithOver8HoursBedTime)

  return (
    <Container style={{ marginVertical: 50 }}>
      <H3>Bedtime statistics</H3>
      <P>Bedtime statistics subtitle</P>
      <InfoRow title="Tracked nights" figure={nights.length.toString()} />
      <InfoRow
        title="Bedtime average"
        figure={minutesToHoursString(average, true)}
      />
      <InfoRow
        title="Bedtime deviation"
        figure={minutesToHoursString(deviation, true)}
      />
      <InfoRow
        title="Shortest night"
        figure={minutesToHoursString(shortestNight, true)}
      />
      <InfoRow
        title="Longest night"
        figure={minutesToHoursString(longestNight, true)}
      />
      <InfoRow
        title="Nights with over 8 hours"
        figure={over8.length.toString()}
      />
    </Container>
  )
}

export default memo(BedStatsView)
