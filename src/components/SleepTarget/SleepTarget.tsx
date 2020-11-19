import d3 from 'd3'
import * as _ from 'lodash'
import * as React from 'react'
import {
  Animated,
  Dimensions,
  InteractionManager,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import colors from '../../styles/colors'
import Overlays from './Overlays'
import Scale, { ROW_HEIGHT } from './Scale'
import StartModal from './StartModal'

const { height } = Dimensions.get('window')
const backgroundColor = colors.darkBlue
const PADDING = 100

export default class SleepTarget extends React.PureComponent {
  scroll = React.createRef()

  totalInput = React.createRef()

  relativeInput = React.createRef()

  modalInput = React.createRef()

  line = React.createRef()

  constructor(props) {
    super(props)
    const { weight, height: h } = this.props
    // const BMI = _.round(weight / (h * h));
    // this.from = BMI - 10;
    // this.to = BMI + 10;
    const AvgSleep = 8
    this.from = AvgSleep - 6
    this.to = AvgSleep + 10
    this.scaleSleep = d3
      .scaleLinear()
      .domain([this.to, this.from])
      .range([0, 21 * ROW_HEIGHT - height])

    this.state = {
      y: new Animated.Value(this.scaleSleep(AvgSleep)),
      visibleModal: true,
      visibleHeader: new Animated.Value(1)
    }
  }

  componentDidMount() {
    const { y } = this.state
    this.listener = y.addListener(this.update)
    InteractionManager.runAfterInteractions(this.scrollToDefaultValue)
  }

  componentWillUnmount() {
    const { y } = this.state
    y.removeListener(this.listener)
  }

  makeHeaderVisible = () =>
    Animated.timing(this.state.visibleHeader, {
      duration: 300,
      toValue: 1,
      useNativeDriver: true
    }).start()

  makeHeaderInvisible = () =>
    Animated.timing(this.state.visibleHeader, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true
    }).start()

  scrollToDefaultValue = () => {
    const { weight, height: h } = this.props
    // const BMI = weight / (h * h);
    8
    const y = this.scaleSleep(8)
    this.scroll.current.getNode().scrollTo({ y, animated: false })
    this.update({ value: y }, true)
  }

  update = ({ value }, init) => {
    if (!init) {
      this.setState({ visibleModal: false })
    }
    const { sleepAmount } = this.props
    const change = this.scaleSleep.invert(value)
    // const kg = BMI * h * h;
    if (init) {
      this.modalInput.current.setNativeProps({
        text: `${_.round(sleepAmount, 1).toFixed(1)} h`
      })
    }
    this.totalInput.current.setNativeProps({
      text: `${_.round(change).toFixed(1)} h`
    })
    this.relativeInput.current.setNativeProps({
      text: ` ${_.round(sleepAmount + change).toFixed(1)} h`
    })
  }

  render() {
    const { from, to } = this
    const { y, visibleModal } = this.state
    const inputRange = [0, 21 * ROW_HEIGHT - height]
    const translateY = y.interpolate({
      inputRange,
      outputRange: [-height / 2 + PADDING, height / 2 - PADDING]
    })
    const translateY2 = y.interpolate({
      inputRange,
      outputRange: [height / 2 - PADDING, -height / 2 + PADDING]
    })
    const scale = y.interpolate({
      inputRange: [inputRange[0], inputRange[1] / 2, inputRange[1]],
      outputRange: [0.5, 1, 0.5]
    })
    const scaleY = y.interpolate({
      inputRange: [inputRange[0], inputRange[1] / 2, inputRange[1]],
      outputRange: [height - PADDING - 50, 50, height - PADDING - 50]
    })

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={this.makeHeaderInvisible}
          onScrollEndDrag={this.makeHeaderVisible}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y } } }],
            {
              useNativeDriver: true
            }
          )}>
          <Scale {...{ from, to }} />
        </Animated.ScrollView>
        <Overlays>
          <Animated.View
            ref={this.line}
            style={[styles.line, { transform: [{ scaleY }] }]}
          />
          <Animated.View
            style={[
              styles.oppositeCursor,
              { transform: [{ translateY: translateY2 }] }
            ]}
          />
          <Animated.View style={[styles.cursor, { transform: [{ scale }] }]}>
            <TextInput ref={this.relativeInput} style={styles.minuteLabel} />
          </Animated.View>
          <Animated.View
            style={[styles.mainCursor, { transform: [{ translateY }] }]}>
            <TextInput ref={this.totalInput} style={styles.mainCursorLabel} />
          </Animated.View>
        </Overlays>
        {visibleModal && (
          <StartModal>
            <View style={styles.mainCursor}>
              <TextInput ref={this.modalInput} style={styles.mainCursorLabel} />
            </View>
          </StartModal>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  },
  line: {
    height: 1,
    width: 1,
    backgroundColor: 'white'
  },
  cursor: {
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor
  },
  mainCursor: {
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  oppositeCursor: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white'
  },
  minuteLabel: {
    fontSize: 17,
    color: 'white'
  },
  cursorLabel: {
    color: 'white',
    fontSize: 26
  },
  mainCursorLabel: {
    color: backgroundColor,
    fontSize: 26
  }
})
