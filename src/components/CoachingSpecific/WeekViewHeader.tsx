import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '@helpers/Dimensions'
import { fonts } from '@styles/themes'

type Props = {
  yOffset: Animated.Value<number>
  title?: string
  loading: boolean
}

const WeekViewHeader: FC<Props> = ({ yOffset, title }) => {
  const titleSize = {
    opacity: yOffset.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [1, 0.2]
    }),
    transform: [
      {
        scale: yOffset.interpolate({
          inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
          outputRange: [1, 0.5]
        })
      }
    ]
  }

  return (
    <Header>
      <Gradient>
        <WeekTitle style={titleSize}>{title}</WeekTitle>
      </Gradient>
    </Header>
  )
}

export default WeekViewHeader

const Header = styled(Animated.View)`
  width: 100%;
  height: ${HEADER_MAX_HEIGHT}px;
  z-index: 1;
  overflow: hidden;
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.GRADIENT
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
  font-size: 30px;
  text-align: left;
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
