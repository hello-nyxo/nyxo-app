import * as d3 from 'd3'
import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Svg, { Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg'
import * as path from 'svg-path-properties'
import { minutesToHoursString } from '../../helpers/time'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

const { width } = Dimensions.get('window')
const cardWidth = width - 40
const rightAxis = 40
const linesWidth = cardWidth - rightAxis
const height = 200

const verticalPadding = 5
const cursorRadius = 5

class SleepTimesChart extends Component {
  constructor(props) {
    super(props)

    this.cursor = React.createRef()
    this.label = React.createRef()
    this.scaleX
    this.scaleY
    this.scaleLabel
    this.line
    this.properties

    this.state = {
      x: new Animated.Value(0)
    }
  }

  moveCursor(value) {
    const { x, y } = this.properties.getPointAtLength(this.lineLength - value)
    if (this.cursos) {
      this.cursor.current.setNativeProps({
        top: y - cursorRadius,
        left: x - cursorRadius
      })
    }
    const label = this.scaleLabel(this.scaleY.invert(y))
    this.label.current.setNativeProps({
      text: `${minutesToHoursString(label)} `
    })
  }

  calculateScales() {
    const yDomainBed = d3.extent(this.props.days, (day) => day.inBedDuration)
    const yDomainScore = d3.extent(this.props.sleepScores, (item) => item.score)
    const xDomain = d3.extent(this.props.days, (day) => new Date(day.date))

    this.axisXScale = d3.scaleLinear().domain([0, 6]).range([0, linesWidth])

    this.axisYScale = d3.scaleLinear().domain(yDomainBed).range([0, height])

    this.scaleX = d3.scaleLinear().domain(xDomain).range([0, linesWidth])

    this.scaleY = d3
      .scaleTime()
      .domain(yDomainBed)
      .range([height - verticalPadding, verticalPadding])

    this.scoreScaleY = d3
      .scaleTime()
      .domain(yDomainScore)
      .range([height - verticalPadding, verticalPadding])

    this.scaleLabel = d3.scaleLinear().domain(yDomainBed).range(yDomainBed)

    this.line = d3
      .line()
      .x((d) => this.scaleX(new Date(d.date)))
      .y((d) => this.scaleY(d.inBedDuration ? d.inBedDuration : 0))(
      this.props.days
    )

    this.sleepLine = d3
      .line()
      .x((d) => this.scaleX(new Date(d.date)))
      .y((d) => this.scaleY(d.asleepDuration ? d.asleepDuration : 0))(
      this.props.days
    )

    this.scoreLine = d3
      .line()
      .x((d) => this.scaleX(new Date(d.date)))
      .y((d) => this.scoreScaleY(d.score ? d.score : 0))(this.props.sleepScores)

    this.properties = path.svgPathProperties(this.line)
    this.lineLength = this.properties.getTotalLength()
  }

  componentDidMount() {
    this.calculateScales()
    this.state.x.addListener(({ value }) => this.moveCursor(value))
    this.moveCursor(0)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    if (!this.props.days || this.props.sleepScores) return null
    this.calculateScales()
    const { x } = this.state
    const translateX = x.interpolate({
      inputRange: [0, this.lineLength],
      outputRange: [cardWidth, 0],
      extrapolate: 'clamp'
    })

    const xAxis = this.props.days.map((item, key) => (
      <Line
        key={key}
        x1={this.axisXScale(key)}
        x2={this.axisXScale(key)}
        stroke={colors.textGray}
        y1={0}
        y2={height}
      />
    ))

    const yAxis = this.props.days.map((item, key) => (
      <Line
        key={key}
        x1={0}
        x2={cardWidth}
        y1={this.axisYScale(item.inBedDuration)}
        y2={this.axisYScale(item.inBedDuration)}
        stroke={colors.textGray}
      />
    ))

    return (
      <View style={cStyles.sectionContainer}>
        <TranslatedText style={[styles.titleH2, { marginVertical: 5 }]}>
          Sleep Goal Trend
        </TranslatedText>
        <View style={cStyles.container}>
          <Svg {...{ width: cardWidth, height }}>
            {xAxis}
            {yAxis}
            <Defs>
              <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                <Stop stopColor="#CDE3F8" offset="0%" />
                <Stop stopColor="rgba(255,255,255,0.3)" offset="30%" />
              </LinearGradient>
            </Defs>
            <Path
              d={this.line}
              fill="transparent"
              stroke={colors.inBedColor}
              strokeWidth={3}
            />
            <Path
              d={`${this.line} L ${cardWidth} ${height} L 0 ${height}`}
              fill="transparent"
              // fill='url(#gradient)'
            />

            <Path
              d={this.sleepLine}
              fill="transparent"
              stroke={colors.asleepColor}
              strokeWidth={3}
            />
            <Path
              d={this.scoreLine}
              fill="transparent"
              stroke={colors.blue}
              strokeWidth={3}
            />
          </Svg>
          <View ref={this.cursor} style={cStyles.cursor} />

          <Animated.View
            style={[cStyles.label, { transform: [{ translateX }] }]}>
            <TextInput style={cStyles.labelText} ref={this.label} />
          </Animated.View>
          <Animated.ScrollView
            contentContainerStyle={{ width: this.lineLength * 2 }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
            horizontal
          />
        </View>
        <View style={cStyles.legend}>
          <Text>
            This here is a chart of your time in bed and asleep. In optimal case
            the lines should be the same.
          </Text>
        </View>
      </View>
    )
  }
}

export default SleepTimesChart

const cStyles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    height
  },
  cursor: {
    position: 'absolute',
    zIndex: 4,
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3
  },
  label: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'red'
  },
  labelText: {
    textAlign: 'center'
  },
  sectionContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 50,
    backgroundColor: 'white',
    ...shadowStyle
  },
  chart: {
    height: 200
  },
  subTitle: {
    marginLeft: 20,
    fontSize: 15,
    color: colors.gray2
  },

  dateContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  legend: {
    marginVertical: 20,
    marginHorizontal: 10
  }
})
