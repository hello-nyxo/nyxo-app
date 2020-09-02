import React, { Component } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'
import { Path } from 'react-native-svg'

import { describeArc } from '@helpers/geometry'

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
AnimatedPath = Animated.createAnimatedComponent(AnimatedPath)

export default class SCPath extends Component {
  constructor(props) {
    super(props)
    this.intermediate = { startAngle: 0, endAngle: 360 }
    this.state = {
      startAngle: new Animated.Value(1),
      endAngle: new Animated.Value(1)
    }

    this.state.startAngle.addListener((angle) => {
      if (!this._myPath) return
      this.intermediate.startAngle = angle.value
      this._myPath.setNativeProps({ d: this.path() })
    })

    this.state.endAngle.addListener((angle) => {
      if (!this._myPath) return
      this.intermediate.endAngle = angle.value
      this._myPath.setNativeProps({ d: this.path() })
    })

    setTimeout(
      () => this.animateAngles(this.props.startAngle, this.props.endAngle),
      this.props.index * 100 + 250
    )
  }

  animateAngles(startAngle, endAngle) {
    if (endAngle < startAngle) {
      endAngle += 360
    }
    Animated.parallel([
      Animated.timing(this.state.startAngle, {
        toValue: startAngle,
        duration: 300
      }),
      Animated.timing(this.state.endAngle, { toValue: endAngle, duration: 300 })
    ]).start()
  }

  path() {
    return describeArc(
      this.props.x,
      this.props.y,
      this.props.radius,
      this.intermediate.startAngle,
      this.intermediate.endAngle
    ).toString()
  }

  render() {
    return (
      <Path
        strokeLinecap="round"
        ref={(ref) => (this._myPath = ref)}
        d=""
        fill="none"
        stroke={this.props.color}
        strokeWidth={this.props.strokeWidth}
      />
    )
  }
}
