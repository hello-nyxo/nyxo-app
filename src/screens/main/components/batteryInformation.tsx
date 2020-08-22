import React, { Component } from 'react'
import { StyleSheet, Text, DeviceEventEmitter, View } from 'react-native'
// import DeviceInfo from '../../../react-native-device-info/deviceinfo.js'

export class BatteryInformation extends Component {
  constructor() {
    super()

    this.state = {
      batteryLevel: null,
      charging: null,
      deviceEventBattery: null
    }
  }

  componentDidMount() {
    this.batteryMonitor = DeviceEventEmitter.addListener(
      'batteryLevelDidChange',
      (level) => {
        this.setState({ deviceEventBatter: level })
      }
    )
  }

  componentWillUnmount() {
    this.batteryMonitor.remove()
  }

  render() {
    DeviceInfo.getPowerState().then((state) => {
      this.setState({
        batteryLevel: state.batteryLevel,
        charging: state.batteryState
      })
    })

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Battery Level:
          {this.state.batteryLevel}
          {'\n'}
          {this.state.charging}
        </Text>
        <Text>{this.state.deviceEventBattery}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
