import AnimatedFastImage from '@components/AnimatedFastImage/AnimatedFastImage'
import { HEADER_DELTA, HEADER_MAX_HEIGHT, WIDTH } from '@helpers/Dimensions'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

type Props = {
  yOffset: Animated.Value<number>
  cover?: string
  title?: string
}

const { interpolate, Extrapolate } = Animated

const LessonCover: FC<Props> = ({ yOffset, cover }) => {
  const headerStyle = {
    transform: [
      {
        scale: interpolate(yOffset, {
          inputRange: [-HEADER_MAX_HEIGHT, 0],
          outputRange: [4, 1],
          extrapolate: Extrapolate.CLAMP
        })
      }
    ]
  }

  const overlayStyle = {
    opacity: interpolate(yOffset, {
      inputRange: [-64, 0, HEADER_DELTA],
      outputRange: [0, 0, 1],
      extrapolate: Extrapolate.CLAMP
    })
  }

  return (
    <Container style={headerStyle}>
      <CoverPhoto
        style={{ height: undefined, width: undefined }}
        source={{
          uri: `${cover}?fm=jpg&fl=progressive&w=${WIDTH * 2}`
        }}
      />

      <Gradient />
      <Overlay style={overlayStyle} />
    </Container>
  )
}

export default LessonCover

const Container = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: ${HEADER_MAX_HEIGHT}px;
  background-color: ${({ theme }) => theme.bgSecondary};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.gradient
}))`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  bottom: 0;
`

const Overlay = styled(Animated.View)`
  background-color: ${({ theme }) => theme.bgSecondary};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`

const CoverPhoto = styled(AnimatedFastImage)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const WeekTitle = styled(Animated.Text)`
  font-family: ${({ theme }) => theme.medium};
  z-index: 20;
  font-size: 30px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: ${({ theme }) => theme.textPrimary};
`
