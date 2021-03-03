import * as d3 from 'd3'
import { addHours, format, subHours } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import appleHealthKit from 'react-native-healthkit'
import Svg, { G, Path, Rect, Text as SvgText } from 'react-native-svg'
import colors from '../../styles/colors'
import EmptyState from '../EmptyState'

const { width } = Dimensions.get('window')
const PaddingSize = 20

interface HeartRateChartProps {
  startDate: string
  endDate: string
  data: {
    samples: [HeartRateSample?]
  }
}

interface HeartRateSample {
  endDate: string
  sourceId: string
  sourceName: string
  startDate: string
  value: number
}

const HeartRateChart: FC<HeartRateChartProps> = ({ startDate, endDate }) => {
  const [hrData, setHRdata] = useState()

  const timePaddedStart = subHours(new Date(startDate), 1).toISOString()
  const timePaddedEnd = addHours(new Date(endDate), 1).toISOString()

  async function getData(startDate: string, endDate: string) {
    const options = {
      startDate: timePaddedStart,
      endDate: timePaddedEnd
    }

    let avgHeartRate
    let samples

    await appleHealthKit.getHeartRateSamples(
      options,
      (err: any, response: [HeartRateSample]) => {
        if (err) {
        }
        samples = response
        avgHeartRate = d3.mean(
          response,
          (sample: HeartRateSample) => sample.value
        )
        setHRdata(samples)
      }
    )
  }

  useEffect(() => {
    getData(startDate, endDate)
  }, [getData, startDate])

  if (!hrData || hrData.length === 0) {
    return <EmptyState />
  }

  const xAccessor = (d: HeartRateSample) => new Date(d.startDate)
  const yAccessor = (d: HeartRateSample) => d.value

  const chartWidth = width
  const chartHeight = 200
  const scaleX = d3
    .scaleTime()
    .domain([new Date(timePaddedStart), new Date(timePaddedEnd)])
    .range([0, chartWidth])

  const allYValues = hrData.reduce((all, datum) => {
    all.push(yAccessor(datum))
    return all
  }, [])
  const extentY = d3.extent(allYValues)

  const scaleY = d3
    .scaleLinear()
    .domain([25, 125])
    // .nice()
    // We invert our range so it outputs using the axis that React uses.
    .range([chartHeight, 0])

  const data = hrData

  const lineShape = d3
    .line()
    .curve(d3.curveBasis)
    .x((d) => scaleX(xAccessor(d)))
    .y((d) => scaleY(yAccessor(d)))

  const yTicks = scaleY.ticks()
  const xTicks = scaleX.ticks(d3.timeHour.every(1))

  console.table(yTicks)

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Svg width={width} height={chartHeight}>
        {yTicks.map((tick, index) => (
          <SvgText x={0} y={scaleY(tick)} key={index}>
            {tick}
          </SvgText>
        ))}

        <G x={0} y={0}>
          <Path
            d={lineShape(data)}
            stroke={colors.darkBlue}
            strokeWidth={3}
            fill="none"
          />
        </G>
        <Rect
          x={scaleX(new Date(startDate))}
          y={0}
          height={chartHeight}
          width={scaleX(new Date(endDate)) - scaleX(new Date(startDate))}
          fill={colors.inBedTransparent}
        />

        {xTicks.map((tick, index) => {
          return (
            <SvgText x={scaleX(new Date(tick))} y={chartHeight} key={index}>
              {format(new Date(tick), 'H')}
            </SvgText>
          )
        })}
      </Svg>
    </View>
  )
}

export default HeartRateChart

function createScaleX(start: string, end: string, width: number) {
  return d3
    .scaleTime()
    .domain([new Date(start), new Date(end)])
    .range([0, width])
}

function createScaleY(minY: number, maxY: number, height: number) {
  return (
    d3
      .scaleLinear()
      .domain([minY, maxY])
      .nice()
      // We invert our range so it outputs using the axis that React uses.
      .range([height, 0])
  )
}

interface createLineGraphProps {
  data: [HeartRateSample]
  xAccessor: Function
  yAccessor: Function
  width: number
  height: number
}

export function createLineGraph({
  data,
  xAccessor,
  yAccessor,
  width,
  height
}: createLineGraphProps) {
  const lastDatum: HeartRateSample = data[data.length - 1]
  const scaleX = createScaleX(data[0].startDate, lastDatum.startDate, width)

  // Collect all y values.
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum))
    return all
  }, [])

  // Get the min and max y value.
  const extentY = d3.extent(allYValues)
  const scaleY = createScaleY(extentY[0], extentY[1], height)

  const lineShape = d3
    .line()
    // .curve(shape.curveBasis)
    .x((d) => scaleX(xAccessor(d)))
    .y((d) => scaleY(yAccessor(d)))

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY
    },
    path: lineShape(data),
    ticks: {
      x: scaleX.ticks(),
      y: scaleY.ticks()
    }
  }
}

const styles = StyleSheet.create({
  tickLabelX: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    textAlign: 'center'
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent'
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center'
  },

  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'red',
    borderRadius: 100
  }
})
