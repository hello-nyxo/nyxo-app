import React, { useState, useRef, Component, useEffect, memo } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { Path } from 'react-native-svg'
import { describeArc } from '../helpers/geometry'

const {
  Value,
  set,
  Clock,
  onChange,
  timing,
  concat,
  lessThan,
  cond,
  and,
  clockRunning,
  block,
  debug,
  startClock,
  stopClock,
  add,
  or
} = Animated

class AnimatedPath extends Component {
  setNativeProps = (props) => {
    this._component && this._component.setNativeProps(props)
  }

  render() {
    return (
      <Path
        ref={(component) => (this._component = component)}
        {...this.props}
      />
    )
  }
}
const AnimatedComponentPath = Animated.createAnimatedComponent(AnimatedPath)

interface AnimatedSvgPathProps {
  startAngle: number
  endAngle: number
  index: number
  x: number
  y: number
  radius: number
  color: string
  strokeWidth: number
}

const AnimatedSvgPath = (props: AnimatedSvgPathProps) => {
  // this.intermediate = { startAngle: 0, endAngle: 360 };

  const ref = useRef()
  const clock = new Clock()
  const animatedStartAngle = new Value(1)
  const animatedEndAngle = new Value(1)

  const [startAngle, setStartAngle] = useState(0)
  const [endAngle, setEndAngle] = useState(360)

  Animated.useCode(
    block([
      // set(animatedStartAngle, props.startAngle),
    ]),
    [props.startAngle]
  )

  const animatedPath = runTiming(clock, -120, 120)

  const path = () => {
    return describeArc(
      props.x,
      props.y,
      props.radius,
      startAngle,
      endAngle
    ).toString()
  }

  // ref.current.setNativeProps({ d: path() });

  return (
    <AnimatedComponentPath
      strokeLinecap="round"
      ref={ref}
      d=""
      fill="none"
      stroke={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}

export default memo(AnimatedSvgPath)

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  }

  const config = {
    duration: 5000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  }

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position
  ])
}
