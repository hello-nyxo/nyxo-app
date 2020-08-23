import moment from 'moment'
import React, { memo, useRef, useState } from 'react'
import { Defs, G, Path, Text, TextPath, TSpan } from 'react-native-svg'
import {
  clockTimeToAngle,
  describeArc,
  describeReverseArc
} from '../../helpers/geometry'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'

interface FallAsleepWindowProps {
  goToSleepWindowStart: string
  goToSleepWindowEnd: string

  x: number
  y: number
  radius: number
  selected: boolean
  darkTheme: boolean
}

const FallAsleepWindow = (props: FallAsleepWindowProps) => {
  const startAngle = clockTimeToAngle(props.goToSleepWindowStart)
  const endAngle = clockTimeToAngle(props.goToSleepWindowEnd)
  const [strokeWidth, setStrokeWidth] = useState(5)

  const startTime = moment(props.goToSleepWindowStart).format('HH:mm')
  const endTime = moment(props.goToSleepWindowEnd).format('HH:mm')

  const ref: any = useRef()
  if (
    startAngle === undefined ||
    endAngle === undefined ||
    startAngle === null ||
    endAngle === null
  ) {
    return null
  }

  const path = describeArc(props.x, props.y, props.radius, startAngle, endAngle)
  const textPath = describeReverseArc(
    props.x,
    props.y,
    props.radius - 10,
    startAngle,
    endAngle
  )

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
        <Path
          d={textPath}
          fill="none"
          strokeOpacity={1}
          stroke={props.darkTheme ? 'black' : 'white'}
          strokeWidth="20"
        />

        <Text
          fill={colors.fallAsleep}
          fontSize="15"
          fontWeight="bold"
          fontFamily={fonts.bold}>
          {/* <G
					x={iconCoordinates.x}
					y={iconCoordinates.y}
					transform={{ scale: 0.5 }}>
					<Path d="M22.421,9.763l-1.266-.449a1.374,1.374,0,0,1-.78-1.886h0l.576-1.213A2.376,2.376,0,0,0,17.786,3.05l-1.213.577a1.375,1.375,0,0,1-1.885-.782l-.45-1.265a2.376,2.376,0,0,0-4.476,0l-.45,1.266a1.375,1.375,0,0,1-1.885.781L6.214,3.05A2.376,2.376,0,0,0,3.049,6.215l.576,1.213a1.375,1.375,0,0,1-.78,1.886l-1.266.45a2.375,2.375,0,0,0,0,4.475l1.266.45a1.374,1.374,0,0,1,.78,1.885l-.576,1.213a2.376,2.376,0,0,0,3.165,3.165l1.213-.576a1.373,1.373,0,0,1,1.885.781l.45,1.265a2.376,2.376,0,0,0,4.476,0l.45-1.266a1.374,1.374,0,0,1,1.885-.78l1.213.576a2.376,2.376,0,0,0,3.165-3.165l-.576-1.213a1.374,1.374,0,0,1,.78-1.885l1.266-.451a2.375,2.375,0,0,0,0-4.475ZM12,16.785a4.93,4.93,0,0,1-4.441-2.944,4.813,4.813,0,0,1,2.6-6.281,4.868,4.868,0,0,1,6.281,2.6,4.813,4.813,0,0,1-2.6,6.281A4.589,4.589,0,0,1,12,16.785Z" />
				</G> */}
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
        ref={ref}
        d={path}
        fill="transparent"
        strokeLinecap="round"
        stroke={colors.bedTimeColor}
        strokeWidth={strokeWidth}
      />
    </G>
  )
}

export default memo(FallAsleepWindow)
