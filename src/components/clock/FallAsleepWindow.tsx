import React, { FC } from 'react'
import { Defs, G, Path, Text, TextPath, TSpan } from 'react-native-svg'
import styled from 'styled-components/native'
import {
  clockTimeToAngle,
  describeArc,
  describeReverseArc
} from '@helpers/geometry'
import { format } from 'date-fns'

type FallAsleepWindowProps = {
  goToSleepWindowStart?: string
  goToSleepWindowEnd?: string
  x: number
  y: number
  radius: number
}

const FallAsleepWindow: FC<FallAsleepWindowProps> = ({
  goToSleepWindowStart,
  goToSleepWindowEnd,
  x,
  y,
  radius
}) => {
  const startAngle = clockTimeToAngle(goToSleepWindowStart)
  const endAngle = clockTimeToAngle(goToSleepWindowEnd)

  const startTime = format(
    new Date(goToSleepWindowStart ?? new Date()),
    'HH:mm'
  )
  const endTime = format(new Date(goToSleepWindowEnd ?? new Date()), 'HH:mm')

  if (
    startAngle === undefined ||
    endAngle === undefined ||
    startAngle === null ||
    endAngle === null
  ) {
    return null
  }

  const path = describeArc(x, y, radius, startAngle, endAngle)
  const textPath = describeReverseArc(x, y, radius - 10, startAngle, endAngle)

  const time = `${startTime} - ${endTime}`
  return (
    <G>
      <G>
        <Defs>
          <Path
            id="textPath"
            d={textPath}
            fill="none"
            stroke="none"
            strokeWidth="1"
          />
        </Defs>
        <Backdrop d={textPath} fill="none" strokeOpacity={1} strokeWidth="20" />

        <Time fontSize="15" fontWeight="bold">
          <TextPath
            href="#textPath"
            startOffset="50%"
            textAnchor="end"
            midLine="smooth">
            <TSpan dy={5} transform={{ scaleX: 1 }} textAnchor="middle">
              {time}
            </TSpan>
          </TextPath>
        </Time>
      </G>
      <BedTimePath
        d={path}
        fill="transparent"
        strokeLinecap="round"
        strokeWidth={5}
      />
    </G>
  )
}

export default FallAsleepWindow

const Backdrop = styled(Path).attrs(({ theme }) => ({
  stroke: theme.bgSecondary,
  fill: theme.accentSecondary
}))``

const Time = styled(Text).attrs(({ theme }) => ({
  fontFamily: theme.bold
}))``

const BedTimePath = styled(Path).attrs(({ theme }) => ({
  stroke: theme.accentSecondary
}))``
