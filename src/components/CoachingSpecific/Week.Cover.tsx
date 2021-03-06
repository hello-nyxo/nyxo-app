import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  WIDTH
} from '@helpers/Dimensions'
import AnimatedFastImage from '../AnimatedFastImage/AnimatedFastImage'

type Props = {
  cover: string
  yOffset: Animated.Value<number>
}

const Cover: FC<Props> = ({ cover, yOffset }) => {
  const headerHeight = (offset: Animated.Value<number>) => ({
    opacity: offset.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolateRight: Animated.Extrapolate.CLAMP,
      extrapolateLeft: Animated.Extrapolate.CLAMP
    })
  })

  return (
    <Container>
      <Gradient />
      <CoverPhoto
        style={headerHeight(yOffset)}
        source={{
          uri: `${cover}?fm=jpg&fl=progressive&w=${WIDTH * 2}`,
          priority: FastImage.priority.normal
        }}
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

const CoverPhoto = styled(AnimatedFastImage)`
  z-index: 0;
  width: 100%;
  height: 100%;
`
