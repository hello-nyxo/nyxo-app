import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import styled from 'styled-components/native'

const componentStyles = StyleSheet.create({
  achievement: {
    height: 120,
    width: 100,
    marginRight: 10,
    marginLeft: 10
  },
  achievementTitle: {
    marginTop: 5,
    textAlign: 'center'
  },
  achievementDesc: {
    fontSize: 12,
    textAlign: 'center'
  }
})

export const Achievement = () => (
  <Container>
    <Image
      source={require('../../assets/reward.png')}
      style={{ flex: 1, width: null, height: null }}
    />
    <Text style={componentStyles.achievementTitle}>Heavy Sleeper</Text>
    <Text style={componentStyles.achievementDesc}>100 nights</Text>
  </Container>
)

const Container = styled.View`
  height: 120;
  width: 100;
  margin: 0px 10px;
`
