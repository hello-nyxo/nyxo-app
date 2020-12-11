import Moment from 'moment'
import React, { FC, memo } from 'react'
import { G, Text as SVGText } from 'react-native-svg'
import styled from 'styled-components/native'
import translate from '../../config/i18n'
import colors from '../../styles/colors'

type Props = {
  x: number
  y: number
  timeInBed?: number
  timeAsleep?: number
  sleepStart?: string | null
  sleepEnd?: string | null
  bedStart?: string | null
  bedEnd?: string | null
  hasData: boolean
}

const SleepTime: FC<Props> = ({
  hasData,
  x,
  y,
  timeAsleep = 0,
  timeInBed = 0,
  sleepEnd,
  sleepStart,
  bedStart,
  bedEnd
}) => {
  if (!hasData) {
    return (
      <G>
        <ThemedText
          x={x}
          y={y - 15}
          textAnchor="middle"
          fontFamily="Montserrat-Bold"
          fontWeight="bold"
          alignmentBaseline="central"
          fontSize="28">
          {translate('CLOCK_NO_DATA_TITLE')}
        </ThemedText>
        <ThemedText
          x={x}
          y={y + 15}
          textAnchor="middle"
          fontFamily="Montserrat-Medium"
          fontWeight="bold"
          textLength="30"
          alignmentBaseline="central"
          fontSize="13">
          {translate('CLOCK_NO_DATA_SUBTITLE')}
        </ThemedText>
      </G>
    )
  }

  const inBed = Moment()
    .hours(0)
    .minutes(timeInBed || 0)

  const asleep = Moment()
    .hours(0)
    .minutes(timeAsleep || 0)

  const timeToUseStart = sleepStart || bedStart
  const timeToUseEnd = sleepEnd || bedEnd

  const formattedStart = timeToUseStart
    ? Moment(timeToUseStart).format('HH:mm')
    : ''

  const formattedEnd = timeToUseEnd ? Moment(timeToUseEnd).format('HH:mm') : ''

  const hourValueBed = inBed.format('H')
  const minuteValueBed = inBed.format('mm')

  const hourValueSleep = asleep.format('H')
  const minuteValueSleep = asleep.format('mm')

  const valueToShow = timeAsleep
    ? `${hourValueSleep}:${minuteValueSleep}`
    : `${hourValueBed}:${minuteValueBed}`

  const string = `${formattedStart} - ${formattedEnd}`
  return (
    <G>
      <SVGText
        id="inbed"
        x={x}
        y={y + 30}
        textAnchor="middle"
        fontFamily="Montserrat-Medium"
        fontWeight="bold"
        textLength={100}
        alignmentBaseline="central"
        fontSize="13"
        fill={colors.darkBlue}>
        {string}
      </SVGText>

      <StartText
        id="asleep"
        x={x}
        y={y}
        fontFamily="Montserrat-Bold"
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize="42"
        fontWeight="bold">
        {valueToShow}
      </StartText>
    </G>
  )
}

export default memo(SleepTime)

const ThemedText = styled(SVGText).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))``

const StartText = styled(SVGText).attrs(({ theme }) => ({
  fill: theme.accent
}))``
