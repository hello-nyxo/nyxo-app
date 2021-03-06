import range from 'lodash/range'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { PanResponder, View } from 'react-native'
import Svg, { Circle, G, Path } from 'react-native-svg'
import colors from '../../styles/colors'

function calculateArcCircle(
  index0: number,
  segments: number,
  radius: number,
  startAngle0 = 0,
  angleLength0 = 2 * Math.PI
) {
  // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
  const startAngle = startAngle0 % (2 * Math.PI)
  const angleLength = angleLength0 % (2 * Math.PI)
  const index = index0 + 1
  const fromAngle = (angleLength / segments) * (index - 1) + startAngle
  const toAngle = (angleLength / segments) * index + startAngle
  const fromX = radius * Math.sin(fromAngle)
  const fromY = -radius * Math.cos(fromAngle)
  const realToX = radius * Math.sin(toAngle)
  const realToY = -radius * Math.cos(toAngle)

  // add 0.005 to start drawing a little bit earlier so segments stick together
  const toX = radius * Math.sin(toAngle + 0.005)
  const toY = -radius * Math.cos(toAngle + 0.005)

  return {
    fromX,
    fromY,
    toX,
    toY,
    realToX,
    realToY
  }
}

interface CircularSliderProps {
  onUpdate: ({
    startAngle,
    angleLength
  }: {
    startAngle: number
    angleLength: number
  }) => void
  startAngle: number
  angleLength: number
  segments: number
  strokeWidth: number
  radius: number
  gradientColorFrom: string
  gradientColorTo: string
  clockFaceColor: string
  bgCircleColor: string
  stopIcon: JSX.Element
  startIcon: JSX.Element
}

interface State {
  circleCenterX: number
  circleCenterY: number
}

export default class CircularSlider extends PureComponent<CircularSliderProps> {
  _wakePanResponder: PanResponder
  _circle: Svg
  _sleepPanResponder: PanResponder

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    startAngle: PropTypes.number.isRequired,
    angleLength: PropTypes.number.isRequired,
    segments: PropTypes.number,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    gradientColorFrom: PropTypes.string,
    gradientColorTo: PropTypes.string,
    showClockFace: PropTypes.bool,
    bgCircleColor: PropTypes.string,
    stopIcon: PropTypes.element,
    startIcon: PropTypes.element
  }

  static defaultProps = {
    segments: 5,
    strokeWidth: 40,
    radius: 145,
    gradientColorFrom: 'white',
    gradientColorTo: 'white',
    clockFaceColor: '#9d9d9d',
    bgCircleColor: '#171717'
  }

  state: State = {
    circleCenterX: 0,
    circleCenterY: 0
  }

  constructor(props: CircularSliderProps) {
    super(props)

    this._sleepPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
      onPanResponderGrant: (_evt, _gestureState) => this.setCircleCenter(),
      onPanResponderMove: (_evt, { moveX, moveY }) => {
        const { circleCenterX, circleCenterY } = this.state
        const { angleLength, startAngle, onUpdate } = this.props

        const currentAngleStop = (startAngle + angleLength) % (2 * Math.PI)
        let newAngle =
          Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2

        if (newAngle < 0) {
          newAngle += 2 * Math.PI
        }

        let newAngleLength = currentAngleStop - newAngle

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI
        }

        onUpdate({
          startAngle: newAngle,
          angleLength: newAngleLength % (2 * Math.PI)
        })
      }
    })

    this._wakePanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
      onPanResponderGrant: (_evt, _gestureState) => this.setCircleCenter(),
      onPanResponderMove: (_evt, { moveX, moveY }) => {
        const { circleCenterX, circleCenterY } = this.state
        const { angleLength, startAngle, onUpdate } = this.props

        const newAngle =
          Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2
        let newAngleLength = (newAngle - startAngle) % (2 * Math.PI)

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI
        }

        onUpdate({ startAngle, angleLength: newAngleLength })
      }
    })
  }

  onLayout = (): void => {
    this.setCircleCenter()
  }

  setCircleCenter = (): void => {
    this._circle.measure((_x, _y, _w, _h, px, py) => {
      const halfOfContainer = this.getContainerWidth() / 2
      this.setState({
        circleCenterX: px + halfOfContainer,
        circleCenterY: py + halfOfContainer
      })
    })
  }

  getContainerWidth(): number {
    const { strokeWidth, radius } = this.props
    return strokeWidth + radius * 2 + 2
  }

  render(): JSX.Element {
    const {
      startAngle,
      angleLength,
      segments,
      strokeWidth,
      radius,
      gradientColorFrom,
      gradientColorTo
    } = this.props

    const containerWidth = this.getContainerWidth()

    const start = calculateArcCircle(
      0,
      segments,
      radius,
      startAngle,
      angleLength
    )
    const stop = calculateArcCircle(
      segments - 1,
      segments,
      radius,
      startAngle,
      angleLength
    )

    return (
      <View
        style={{ width: containerWidth, height: containerWidth }}
        onLayout={this.onLayout}>
        <Svg
          height={containerWidth}
          width={containerWidth}
          ref={(circle) => (this._circle = circle)}>
          {/*
            ##### Circle
          */}

          <G
            transform={{
              translate: `${strokeWidth / 2 + radius + 1}, ${
                strokeWidth / 2 + radius + 1
              }`
            }}>
            {range(segments).map((i) => {
              const { fromX, fromY, toX, toY } = calculateArcCircle(
                i,
                segments,
                radius,
                startAngle,
                angleLength
              )
              const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(
                2
              )} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(
                2
              )}`

              return (
                <Path
                  d={d}
                  key={i}
                  strokeWidth={strokeWidth}
                  strokeOpacity={0.75}
                  stroke={colors.darkBlue}
                  fill="transparent"
                />
              )
            })}

            <G
              fill={gradientColorTo}
              transform={{ translate: `${stop.toX}, ${stop.toY}` }}
              onPressIn={() =>
                this.setState({ angleLength: angleLength + Math.PI / 2 })
              }
              {...this._wakePanResponder.panHandlers}>
              <Circle
                r={(strokeWidth - 1) / 2}
                fill={colors.white}
                fillOpacity={1}
                stroke={colors.darkBlue}
                strokeWidth="4"
              />
              {/* {stopIcon} */}
            </G>

            <G
              fill={gradientColorFrom}
              transform={{ translate: `${start.fromX}, ${start.fromY}` }}
              onPressIn={() =>
                this.setState({
                  startAngle: startAngle - Math.PI / 2,
                  angleLength: angleLength + Math.PI / 2
                })
              }
              {...this._sleepPanResponder.panHandlers}>
              <Circle
                r={(strokeWidth - 1) / 2}
                fill={colors.white}
                fillOpacity={1}
                stroke={colors.darkBlue}
                strokeWidth="4"
              />
              {/* {startIcon} */}
            </G>
          </G>
        </Svg>
      </View>
    )
  }
}
