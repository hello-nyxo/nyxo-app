import * as d3 from 'd3'
import range from 'lodash/range'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Svg, { G, Line, Rect } from 'react-native-svg'
import colors from '../../styles/colors'

const { width, height } = Dimensions.get('window')
const chartWidth = width - 40
const chartHeight = 200

const SleepScoreGraph = (props) => {
  const { data } = props

  if (!data) {
    return null
  }

  // X-Axis
  const barWidth = 10
  const xDomain = d3.extent(data, (item) => new Date(item.date))

  const xRange = [20, chartWidth - 20]
  const x = d3.scaleLinear().domain(xDomain).range(xRange)

  // Y-Axis
  const yDomain = [0, 100]
  const yRange = [0, chartHeight]
  const y = d3.scaleLinear().nice().domain(yDomain).range(yRange)

  const reverseY = d3.scaleLinear().domain(yDomain).range([chartHeight, 0])

  // const movingAvgData = movingAvg(data, 2);
  // const dataWithRunningAverage = data.map((item, key) => ({
  // 	...item,
  // 	rAvg: movingAvgData[key],
  // }));

  // const runningAverage = d3
  // 	.line()
  // 	.x(d => x(d.key))
  // 	.y(d => reverseY(d.rAvg ? d.rAvg : 0))(dataWithRunningAverage);

  const yAxisScale = d3.scaleLinear().domain([0, 10]).range(yRange)

  const yAxes = range(11).map((item) => (
    <G key={`bar${item}`}>
      <Line
        y1={yAxisScale(item)}
        y2={yAxisScale(item)}
        x1={20}
        x2={chartWidth - 10}
        stroke={colors.backgroundGray}
      />
    </G>
  ))

  return (
    <View style={c.chartContainer}>
      <Svg width={chartWidth} height={chartHeight + 20}>
        {yAxes}
        {data.map((item) => (
          <Rect
            key={`bar${item.date}`}
            x={x(item.date)}
            y={chartHeight - y(item.value)}
            rx={2.5}
            height={y(item.value)}
            width={barWidth}
            fill={colors.inBedTransparent}
          />
        ))}
        {/* <Path
					d={runningAverage}
					fill='transparent'
					stroke={colors.inBedColor}
					strokeWidth={3}
				/> */}
        {/* {data.map(item => (
					<SvgText
						key={`label${item.key}`}
						x={x(Number(item.key))}
						y={chartHeight + 15}
						stroke='black'>
						{item.key}
					</SvgText>
				))} */}
      </Svg>
    </View>
  )
}

const c = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SleepScoreGraph

/**
 * returns an array with moving average of the input array
 * @param array - the input array
 * @param count - the number of elements to include in the moving average calculation
 * @param qualifier - an optional function that will be called on each
 *  value to determine whether it should be used
 */
function movingAvg(array, count, qualifier) {
  // calculate average for subarray
  const avg = (array, qualifier) => {
    let sum = 0
    let count = 0
    let value
    for (const i in array) {
      value = array[i].value
      if (!qualifier || qualifier(value)) {
        sum += value
        count++
      }
    }

    return sum / count
  }

  const result = []
  let val

  // pad beginning of result with null values

  // calculate average for each subarray and add to result
  for (let i = 0, len = array.length - count; i <= len; i++) {
    val = avg(array.slice(i, i + count), qualifier)

    if (isNaN(val)) {
      result.push(null)
    } else {
      result.push(val)
    }
  }

  return result
}
