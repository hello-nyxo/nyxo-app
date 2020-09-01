import Moment from 'moment'
import React, { memo, FC } from 'react'
import { G, Text as SVGText } from 'react-native-svg'
import styled from 'styled-components/native'

type Props = {
  date: string
  x: number
  y: number
  hasData: boolean
}

const Date: FC<Props> = ({ x, y, hasData, date }) => {
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
