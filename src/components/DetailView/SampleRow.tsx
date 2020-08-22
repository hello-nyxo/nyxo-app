import React, { memo } from 'react'
import { Animated, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native'
import { fonts } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

interface Night {
  value: string
  source: string | undefined
  durationString: string
}

const SampleRow = (night: Night) => {
  const close = () => {}

  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1]
    })
    return (
      <Animated.View style={{ flex: 1, width: 10 }}>
        <RectButton
          style={{
            backgroundColor: '#497AFC',
            justifyContent: 'center',
            flex: 1
          }}
          onPress={close}>
          <Animated.Text
            style={{
              color: 'white',
              fontSize: 16,
              backgroundColor: 'transparent',
              padding: 10,
              transform: [{ translateX: trans }]
            }}>
            Archive
          </Animated.Text>
        </RectButton>
      </Animated.View>
    )
  }

  return (
    <Swipeable>
      <Row>
        <View>
          <SourceText>{night.source}</SourceText>
          <ValueText>{night.value}</ValueText>
        </View>
        <DurationText>{night.durationString}</DurationText>
      </Row>
    </Swipeable>
  )
}

export default memo(SampleRow)

const Row = styled.Text`
  flex-direction: row;
  padding: 10px 20px;
  flex: 1;
  height: 80px;
  background-color: white;
  justify-content: space-between;

  /* flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
		flex: 1,
		height: 80,
		backgroundColor: 'white',
		justifyContent: 'space-between', */
`

const DurationText = styled.Text`
  font-size: 17px;
  font-family: ${fonts.medium};
  color: black;
`

const SourceText = styled.Text`
  font-size: 17px;
  font-family: ${fonts.bold};
  color: black;
`

const ValueText = styled(TranslatedText)`
  font-size: 17px;
  font-family: ${fonts.medium};
  color: black;
`
