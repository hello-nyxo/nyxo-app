import React, { FC, memo } from 'react'
import { Defs, G, Path, Text, TextPath, TSpan } from 'react-native-svg'
import styled from 'styled-components/native'
import {
  clockTimeToAngle,
  describeArc,
  describeReverseArc
} from '@helpers/geometry'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
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

        <Text
          fill={colors.fallAsleep}
          fontSize="15"
          fontWeight="bold"
          fontFamily={fonts.bold}>
          <TextPath
            href="#textPath"
            startOffset="50%"
            textAnchor="end"
            midLine="smooth">
            <TSpan dy={5} transform={{ scaleX: 1 }} textAnchor="middle">
              {time}
            </TSpan>
          </TextPath>
        </Text>
      </G>
      <Path
        d={path}
        fill="transparent"
        strokeLinecap="round"
        stroke={colors.bedTimeColor}
        strokeWidth={5}
      />
    </G>
  )
}

export default memo(FallAsleepWindow)

const Backdrop = styled(Path).attrs(({ theme }) => ({
  stroke: theme.SECONDARY_BACKGROUND_COLOR
}))``
