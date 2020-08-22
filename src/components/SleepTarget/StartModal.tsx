import React, { PureComponent } from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'

import Overlays from './Overlays'

const backgroundColor = '#409aee'
const { width, height } = Dimensions.get('window')

export default class StartModal extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <Overlays>
        <View style={styles.container} pointEvents="none">
          <Text style={styles.title}>What is your target sleep amount?</Text>
          <Text style={styles.subtitle}>
            Drag the bubble to set your target nightly sleep amount
          </Text>
        </View>
        {children}
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            marginRight: 16
          }}
          source={require('../../assets/pinch.png')}
        />
      </Overlays>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor
  },
  title: {
    color: 'white',
    fontSize: 24,
    width: 300,
    textAlign: 'center'
  },
  subtitle: {
    width: 150,
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }
})
