import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import TranslatedText from './TranslatedText'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '../helpers/Dimensions'

const c = StyleSheet.create({
  header: {
    ...ifIphoneX({ paddingTop: getStatusBarHeight() + 20 }, { paddingTop: 20 }),
    paddingBottom: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  }
})

const Header = (props: any) => {
  const headerOpacity = () => ({
    opacity: props.yOffset.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
  })

  return (
    <Animated.View style={[headerOpacity(), c.header]}>
      {/* <BackButton dark /> */}
      <TranslatedText style={c.headerTitle}>{props.title}</TranslatedText>
    </Animated.View>
  )
}

export default Header
