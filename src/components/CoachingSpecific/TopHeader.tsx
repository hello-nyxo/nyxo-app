import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import {
  HEADER_HALF,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  SMART_TOP_PADDING
} from '@helpers/Dimensions'
import GoBack from '../Buttons/GoBack'
import { BlurView } from '@react-native-community/blur'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

interface Props {
  yOffset: Animated.Value<number>
  title?: string
}

const TopHeader: FC<Props> = ({ yOffset, title }) => {
  const fadeIn = {
    opacity: yOffset.interpolate({
      inputRange: [HEADER_HALF, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: Animated.Extrapolate.CLAMP
    })
  }

  const fadeColor = {
    opacity: yOffset.interpolate({
      inputRange: [HEADER_HALF, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: Animated.Extrapolate.CLAMP
    })
  }

  return (
    <BackButtonContainer>
      <BlurViewContainer style={fadeColor} blurAmount={100} />
      <BackButton>
        <GoBack />
      </BackButton>
      <TitleContainer>
        <WeekTitleSmall numberOfLines={2} ellipsizeMode="tail" style={fadeIn}>
          {title}
        </WeekTitleSmall>
      </TitleContainer>
      <Placeholder />
    </BackButtonContainer>
  )
}

export default TopHeader

const BackButtonContainer = styled.View`
  position: absolute;
  z-index: 10;
  top: 0;
  padding: ${parseInt(SMART_TOP_PADDING, 0)}px 20px 0px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const BackButton = styled.View`
  flex: 1;
`

const Placeholder = styled.View`
  flex: 1;
`

const TitleContainer = styled.View`
  flex: 1;
`

const WeekTitleSmall = styled(Animated.Text)`
  text-align: center;
  font-size: 14px;
  justify-content: center;
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.textPrimary};
`

const BlurViewContainer = styled(AnimatedBlurView).attrs(({ theme }) => ({
  blurType: theme.mode === 'dark' ? 'dark' : 'light',
  reducedTransparencyFallbackColor: theme.bgSecondary
}))`
  position: absolute;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: ${({ theme }) => theme.shadowPrimary};
`
