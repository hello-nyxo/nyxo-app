import React, { memo, useMemo } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import InfoRow from '../../components/InfoRow'
import { minutesToHoursString } from '../../helpers/time'

import {
  getAsleepNights,
  getAverageSleepTime,
  deviationSleep,
  getShortestSleepTime,
  getLongestSleepTime,
  getNightsWithOver8HoursSleep
} from '../../store/Selectors/SleepDataSelectors'
import { H3, Container, P } from '../../components/Primitives/Primitives'

const BedStatsView = () => {
  const nights = useSelector(getAsleepNights)
  const average = useSelector(getAverageSleepTime)
  const deviation = useSelector(deviationSleep)
  const shortestNight = useSelector(getShortestSleepTime)
  const longestNight = useSelector(getLongestSleepTime)
  const over8 = useSelector(getNightsWithOver8HoursSleep)

  // const {stats } = useMemo(() => ({
  // 	stats: {

  // 	}
  // }), [])

  return (
    <Container style={{ marginVertical: 50 }}>
      <H3>Sleeptime statistics</H3>
      <P>Sleeptime statistics subtitle</P>
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
