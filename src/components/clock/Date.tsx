import Moment from 'moment'
import React, { memo } from 'react'
import { G, Text as SVGText } from 'react-native-svg'
import styled from 'styled-components/native'

interface DateProps {
  date: string
  darkTheme: boolean
  x: number
  y: number
  hasData: boolean
}

const Date = ({ x, y, hasData, date }: DateProps) => {
  if (!hasData) {
    return <G />
  }

  const formattedDate = date
    ? Moment(date).format('DD')
    : Moment().format('dddd Do MMMM')
  const dateMonth = date
    ? Moment(date).format('MM')
    : Moment().format('dddd Do MMMM')
  return (
    <G x={x + 80} y={y - 10}>
      <ThemedText
        x={10}
        y={10}
        textAnchor="middle"
        alignmentBaseline="central"
        fontFamily="Montserrat-Bold"
        fontWeight="bold"
        fontSize="13">
        {`${formattedDate}.${dateMonth}.`}
      </ThemedText>
    </G>
  )
}

export default memo(Date)

const ThemedText = styled(SVGText).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))``
