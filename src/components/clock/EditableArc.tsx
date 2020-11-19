import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import colors from '../../styles/colors'
import Cursor from './Cursor'

const { Value, multiply, sub, concat, lessThan, cond, add, call } = Animated

const padding = 12
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface EditableArcProps {
  width: number
  height: number
  inBedRadius: number
}

const EditableArc = (props: EditableArcProps) => {
  const { start, end } = useMemo(
    () => ({
      start: new Value(0), // in radians ?
      end: new Value(0)
    }),
    []
  )

  const radius = props.inBedRadius
  const circumference = radius * 2 * Math.PI
  const delta = sub(
    cond(lessThan(start, end), end, add(end, Math.PI * 2)),
    start
  )
  const strokeDashoffset = multiply(delta, radius)
  const rotateZ = concat(sub(Math.PI * 2, start), 'rad')

  const [startTime, setStartTime] = useState(1)
  const [endTime, setEndTime] = useState(5)

  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        position: 'absolute',
        zIndex: 10
        // ...StyleSheet.absoluteFillObject,
      }}>
      {/* <Text>{bedtime.h}</Text> */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ rotateZ }]
        }}>
        <Svg width={props.width} height={props.height}>
          <AnimatedCircle
            strokeWidth={padding * 2}
            stroke={colors.darkBlue}
            strokeOpacity={0.9}
            strokeLineCap="round"
            fill="none"
            cx={props.width / 2}
            cy={props.width / 2}
            r={radius}
            strokeDasharray={`${circumference}, ${circumference}`}
            {...{ strokeDashoffset }}
          />
        </Svg>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: props.width / 2,
          left: props.width / 2,
          flexDirection: 'row'
        }}>
        <Text>{startTime}</Text>
        <Text>{endTime}</Text>
      </View>
      <Cursor
        startX={0}
        startY={0}
        angle={start}
        radius={radius}
        icon="daySunset"
      />
      <Cursor
        startX={props.width / 2}
        startY={props.width / 2}
        angle={end}
        radius={radius}
        icon="daySunrise"
      />
    </View>
  )
}

export default EditableArc

function calculateTimeFromAngle(angle: number) {
  const minutes = calculateMinutesFromAngle(angle)
  const h = Math.floor(minutes / 60)
  const m = minutes - h * 60

  return { h, m }
}

function calculateMinutesFromAngle(angle: number) {
  return Math.round(angle / ((2 * Math.PI) / (12 * 12))) * 5
}

function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI)
}
