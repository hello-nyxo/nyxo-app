import Animated, {
  block,
  Clock,
  clockRunning,
  Easing,
  set,
  startClock,
  stopClock,
  timing,
  AnimatedNode
} from 'react-native-reanimated'

const {
  Value,
  cond,
  add,
  sub,
  greaterOrEq,
  multiply,
  lessThan,
  divide,
  abs
} = Animated

export const toRad = (
  deg: Animated.Adaptable<number>
): Animated.Adaptable<number> => multiply(deg, Math.PI / 180)

export const toDeg = (
  rad: Animated.Adaptable<number>
): Animated.Adaptable<number> => multiply(rad, 180 / Math.PI)

// https://stackoverflow.com/questions/42537957/fast-accurate-atan-arctan-approximation-algorithm
export const atan = (
  x: Animated.Adaptable<number>
): Animated.Adaptable<number> =>
  sub(
    multiply(Math.PI / 4, x),
    multiply(multiply(x, sub(abs(x), 1)), add(0.2447, multiply(0.0663, abs(x))))
  )

// https://en.wikipedia.org/wiki/Atan2
// https://www.gamedev.net/forums/topic/441464-manually-implementing-atan2-or-atan/
export const atan2 = (
  y: Animated.Adaptable<number>,
  x: Animated.Adaptable<number>
): Animated.Adaptable<number> => {
  const coeff1 = Math.PI / 4
  const coeff2 = 3 * coeff1
  const absY = abs(y)
  const angle = cond(
    greaterOrEq(x, 0),
    [sub(coeff1, multiply(coeff1, divide(sub(x, absY), add(x, absY))))],
    [sub(coeff2, multiply(coeff1, divide(add(x, absY), sub(absY, x))))]
  )
  return cond(lessThan(y, 0), multiply(angle, -1), angle)
}

const { round, interpolate, Extrapolate, color } = Animated

const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

const hexToRgb = (hex: string) => {
  const result = colorRegex.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

const white = { r: 255, g: 255, b: 255 }

export const interpolateColors = (
  animationValue: Animated.Adaptable<number>,
  inputRange: number[],
  hexColors: string[]
): AnimatedNode<number> => {
  const colors = hexColors.map((hexColor) => hexToRgb(hexColor) || white)
  const r = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map((c) => c.r),
      extrapolate: Extrapolate.CLAMP
    })
  )
  const g = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map((c) => c.g),
      extrapolate: Extrapolate.CLAMP
    })
  )
  const b = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map((c) => c.b),
      extrapolate: Extrapolate.CLAMP
    })
  )
  return color(r, g, b)
}

export const runAnimTiming = (clock: Clock, value: number, dest: number) => {
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
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position
  ])
}
