import React, { FC } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import { Image } from 'expo-image'
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  WIDTH
} from '@helpers/Dimensions'

type Props = {
  cover: string
  yOffset: SharedValue<number>
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

const Cover: FC<Props> = ({ cover, yOffset }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      yOffset.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [1, 0],
      Extrapolation.CLAMP
    )
    return { opacity }
  })

  return (
    <Container>
      <Gradient />
      <CoverPhoto
        style={animatedStyle}
        source={{
          uri: `${cover}?fm=jpg&fl=progressive&w=${WIDTH * 2}`
        }}
        priority="normal"
      />
    </Container>
  )
}

export default Cover

const Container = styled.View`
  height: ${HEADER_MAX_HEIGHT}px;
  width: 100%;
  overflow: hidden;
  position: absolute;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.GRADIENT
}))`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  bottom: 0;
`

const CoverPhoto = styled(AnimatedImage)`
  z-index: 0;
  width: 100%;
  height: 100%;
`
