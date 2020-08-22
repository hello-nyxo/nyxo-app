import Moment from 'moment'
import React, { memo } from 'react'
import { Defs, G, Path, Text, TextPath } from 'react-native-svg'
import { describeArc, describeReverseArc } from '../../helpers/geometry'
import { momentTimeToPolar } from '../../helpers/time'
import { fonts } from '../../styles/themes'

interface SleepTimesArcProps {
  x: number
  y: number
  radius: number

  bedStart: string | undefined
  bedEnd: string | undefined
  sleepStart: string | undefined
  sleepEnd: string | undefined
}

const SleepTimesArc = (props: SleepTimesArcProps) => {
  const startTimeToUse = props.sleepStart ? props.sleepStart : props.bedStart
  const endTimeToUse = props.sleepEnd ? props.sleepEnd : props.bedEnd

  const startAngle = startTimeToUse ? momentTimeToPolar(startTimeToUse) : 0
  const endAngle = endTimeToUse ? momentTimeToPolar(endTimeToUse) : 0

  const roundedStart = Math.ceil(startAngle / 5) * 5
  const pathStart = describeReverseArc(
    props.x,
    props.y,
    props.radius - 25,
    roundedStart + 15,
    roundedStart + 30
  ).toString()

  const roundedEnd = Math.ceil(endAngle / 5) * 5
  const pathEnd = describeArc(
    props.x,
    props.y,
    props.radius - 15,
    // 185,
    // 215,
    roundedEnd + 15,
    roundedEnd + 30
  ).toString()
  return (
    <G>
      <Defs>
        <Path
          id="pathStart"
          d={pathStart}
          fill="none"
          stroke="none"
          strokeWidth="1"
        />
        <Path
          id="pathEnd"
          d={pathEnd}
          fill="none"
          stroke="none"
          strokeWidth="1"
        />
      </Defs>
      <Text fill="blue" fontWeight="bold" fontFamily={fonts.bold}>
        <Path d={pathStart} fill="none" stroke="none" strokeWidth="10" />
        <Path d={pathEnd} fill="none" stroke="none" strokeWidth="10" />

        <TextPath
          alignmentBaseline="center"
          href="#pathStart"
          startOffset={0}
          spacing="exact"
          midLine="sharp">
          {Moment(startTimeToUse).format('HH:mm')}
        </TextPath>

        <TextPath
          alignmentBaseline="center"
          href="#pathEnd"
          startOffset={0}
          spacing="exact"
          midLine="sharp">
          {Moment(endTimeToUse).format('HH:mm')}
        </TextPath>
      </Text>
    </G>
  )
}

export default memo(SleepTimesArc)
