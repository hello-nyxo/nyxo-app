import React, { Component } from 'react'
import { G, Line, Path, Rect, Text } from 'react-native-svg'
import PropTypes from 'prop-types'
import d3 from 'd3'

const Axis = (props) => {
  // static propTypes = {
  // 	width: PropTypes.number.isRequired,
  // 	ticks: PropTypes.number.isRequired,
  // 	x: PropTypes.number,
  // 	y: PropTypes.number,
  // 	startVal: PropTypes.oneOfType([
  // 		React.PropTypes.number,
  // 		React.PropTypes.object
  // 	]),
  // 	endVal: PropTypes.oneOfType([
  // 		React.PropTypes.number,
  // 		React.PropTypes.object
  // 	]),
  // 	vertical: PropTypes.bool,
  // 	scale: PropTypes.func // if scale is specified use that scale
  // }

  let { width, ticks, x, y, startVal, endVal, vertical } = props
  const TICKSIZE = width / 35
  x = x || 0
  y = y || 0
  const endX = vertical ? x : x + width
  const endY = vertical ? y - width : y
  let { scale } = props
  if (!scale) {
    scale = typeof startVal === 'number' ? d3.scaleLinear() : d3.scaleTime()
    scale.domain(vertical ? [y, endY] : [x, endX]).range([startVal, endVal])
  }
  const tickPoints = vertical
    ? getTickPoints(vertical, y, endY, ticks)
    : getTickPoints(vertical, x, endX, ticks)

  return (
    <G fill="none">
      <Line stroke="#000" strokeWidth="3" x1={x} x2={endX} y1={y} y2={endY} />
      {tickPoints.map((pos) => (
        <Line
          key={pos}
          stroke="#000"
          strokeWidth="3"
          x1={vertical ? x : pos}
          y1={vertical ? pos : y}
          x2={vertical ? x - TICKSIZE : pos}
          y2={vertical ? pos : y + TICKSIZE}
        />
      ))}
      {tickPoints.map((pos) => (
        <Text
          key={pos}
          fill="#000"
          stroke="#000"
          fontSize="30"
          textAnchor="middle"
          x={vertical ? x - 2 * TICKSIZE : pos}
          y={vertical ? pos : y + 2 * TICKSIZE}>
          aa
        </Text>
      ))}
    </G>
  )

  function getTickPoints(vertical, start, end, numTicks) {
    const res = []
    const ticksEvery = Math.floor(props.width / (numTicks - 1))
    if (vertical) {
      for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
    } else {
      for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
    }
    return res
  }
}

export default Axis
