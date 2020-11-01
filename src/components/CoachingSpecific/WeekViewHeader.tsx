import React, { FC, memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '@helpers/Dimensions'
import { fonts, StyleProps } from '@styles/themes'

type Props = {
  yOffset: Animated.Value<number>
  title?: string
}

const WeekViewHeader: FC<Props> = ({ yOffset, title }) => {
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
      <Gradient>
        <WeekTitle style={titleSize(yOffset)}>{title}</WeekTitle>
      </Gradient>
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
