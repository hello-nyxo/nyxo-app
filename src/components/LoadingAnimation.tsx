import React, { Component, Fragment } from 'react'
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import translate from '../config/i18n'
import { getTitle } from @helpers/time'
import colors from '../styles/colors'

const { height } = Dimensions.get('window')
const curtainHeight = height / 2

class LoadingAnimation extends Component {
  static defaultProps = {
    isLoaded: false
  }

  state = {
    title: getTitle(),
    loadingProgress: new Animated.Value(0),
    fadeInProgress: new Animated.Value(0),
    animationDone: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoaded && !this.props.isLoaded) {
      Animated.sequence([
        Animated.timing(this.state.fadeInProgress, {
          toValue: 100,
          easing: Easing.easeInOutBack,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(this.state.loadingProgress, {
          toValue: 100,
          easing: Easing.easeInOutBack,
          duration: 450,
          useNativeDriver: true
        })
      ]).start(() => {
        this.setState({
          animationDone: true
        })
      })
    }
  }

  render() {
    const slideUp = {
      transform: [
        {
          translateY: this.state.loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -curtainHeight]
          })
        }
      ]
    }

    const slideDown = {
      transform: [
        {
          translateY: this.state.loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [0, curtainHeight]
          })
        }
      ]
    }

    const fadeInDown = {
      opacity: this.state.fadeInProgress.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 100]
      }),
      transform: [
        {
          translateY: this.state.fadeInProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [-100, 0]
          })
        }
      ]
    }

    const fadeInUp = {
      opacity: this.state.fadeInProgress.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 100]
      }),
      transform: [
        {
          translateY: this.state.fadeInProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [100, 0]
          })
        }
      ]
    }

    return (
      <>
        <Animated.View style={[c.curtainTop, slideUp]}>
          <Animated.Text style={[c.text, fadeInDown]}>
            {translate(this.state.title)}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[c.curtainBottom, slideDown]}>
          <Animated.Text style={[c.text, fadeInUp]}>
            {this.props.userName}
          </Animated.Text>
        </Animated.View>
      </>
    )
  }
}

const c = StyleSheet.create({
  curtainTop: {
    top: 0,
    left: 0,
    right: 0,
    height: curtainHeight,
    flex: 1,
    zIndex: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    backgroundColor: colors.inBedColor,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  curtainBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: curtainHeight,
    flex: 1,
    zIndex: 20,
    position: 'absolute',
    paddingHorizontal: 20,
    flexDirection: 'column',
    backgroundColor: colors.inBedColor
  },
  text: {
    zIndex: 101,
    fontSize: 40,
    marginVertical: 5,
    color: colors.white
  }
})

const mapStateToProps = (state) => ({
  userName: state.user.fullName
})

export default connect(mapStateToProps)(LoadingAnimation)
