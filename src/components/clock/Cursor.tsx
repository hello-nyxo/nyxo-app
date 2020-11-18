import React, { useMemo } from 'react'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { onGestureEvent } from 'react-native-redash'
import { atan2 } from '@helpers/animated'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'

const {
  Value,
  event,
  divide,
  block,
  cond,
  eq,
  set,
  call,
  add,
  useCode,
  sub,
  multiply,
  sin,
  cos,
  debug,
  round
} = Animated
type Value = typeof Value
const { ACTIVE, END, UNDETERMINED } = State

interface CursorProps {
  radius: number
  angle: Animated.Adaptable<number>
  icon: string
  startX: number
  startY: number
}

const Cursor = ({ radius, angle, icon, startX, startY }: CursorProps) => {
  const {
    a, // alpha in radians
    x,
    y,
    xOffset,
    yOffset,
    translateX,
    translateY,
    translationX,
    translationY,
    state
  } = useMemo(
    () => ({
      a: new Value(0),
      x: new Value(startX),
      y: new Value(startY),
      xOffset: new Value(startX),
      yOffset: new Value(startY),
      translateX: new Value(0),
      translateY: new Value(0),
      translationX: new Value(0),
      translationY: new Value(0),
      state: new Value(UNDETERMINED)
    }),
    []
  )

  const handler = onGestureEvent({ translationX, translationY, state })

  useCode(
    block([
      cond(eq(state, ACTIVE), [
        set(x, add(xOffset, translationX)),
        set(y, add(yOffset, translationY))
      ]),
      cond(eq(state, END), [set(xOffset, x), set(yOffset, y)]),
      set(a, atan2(add(multiply(y, -1), radius), sub(x, radius))),
      set(angle, a),
      set(translateX, add(multiply(radius, cos(a)), radius)),
      set(translateY, add(multiply(-1 * radius, sin(a)), radius))
    ]),
    [angle]
  )

  return (
    <>
      <PanGestureHandler {...handler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }],
            position: 'absolute',
            top: 0,
            backgroundColor: colors.darkBlue,
            width: 40,
            height: 40,
            borderRadius: 25
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Animated.View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}>
            <IconBold height={20} fill="white" width={20} name={icon} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

export default Cursor

function calculateTimeFromAngle(startAngle: number) {
  const minutes = calculateMinutesFromAngle(startAngle)
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
