import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  WIDTH
} from @helpers/Dimensions'
import { StyleProps } from '../../styles/themes'
import AnimatedFastImage from '../AnimatedFastImage/AnimatedFastImage'

interface Props {
  yOffset: any
  cover: string
}

const LessonCover = (props: Props) => {
  const { yOffset, cover } = props
  const headerHeight = (yOffset: any) => ({
    transform: [
      {
        scale: yOffset.interpolate({
          inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
          outputRange: [2, 1],
          extrapolateRight: Animated.Extrapolate.CLAMP
        })
      }
    ],
    opacity: yOffset.interpolate({
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
        source={{ uri: `https:${cover}?fm=jpg&fl=progressive&w=${WIDTH * 2}` }}
      />
    </Container>
  )
}

export default LessonCover

const Container = styled.View`
  height: ${HEADER_MAX_HEIGHT};
  width: 100%;
  overflow: hidden;
  position: absolute;
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`

const Gradient = styled(LinearGradient).attrs((props: StyleProps) => ({
  colors: props.theme.GRADIENT
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
