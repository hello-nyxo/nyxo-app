import React, { memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '../../helpers/Dimensions'
import { fonts, StyleProps } from '../../styles/themes'

interface Props {
  yOffset: Animated.Value<number>
  title?: string
}

const WeekViewHeader = (props: Props) => {
  const { yOffset, title } = props

  const titleSize = (offset: Animated.Value<number>) => ({
    opacity: offset.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [1, 0.2],
      extrapolateRight: Animated.Extrapolate.CLAMP,
      extrapolateLeft: Animated.Extrapolate.CLAMP
    })
  })

  return (
    <Header>
      <GradientContainer>
        <Gradient>
          <WeekTitle style={titleSize(yOffset)}>{title}</WeekTitle>
        </Gradient>
      </GradientContainer>
    </Header>
  )
}

export default memo(WeekViewHeader)

const Header = styled(Animated.View)`
  width: 100%;
  height: ${HEADER_MAX_HEIGHT}px;
  z-index: 1;
  overflow: hidden;
`

const GradientContainer = styled.View`
  position: absolute;
  height: ${HEADER_MAX_HEIGHT}px;
  bottom: 0;
  left: 0;
  right: 0;
`

const Gradient = styled(LinearGradient).attrs((props: StyleProps) => ({
  colors: props.theme.GRADIENT
}))`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0px 20px 20px;
`

const WeekTitle = styled(Animated.Text)`
  font-family: ${fonts.bold};
  z-index: 20;
  font-size: 35px;
  text-align: left;
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`
