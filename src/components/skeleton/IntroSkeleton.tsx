import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { AnimatedBone } from './AnimatedBone'

type Props = {
  animatedStyle: ViewStyle
}
export const IntroSkeleton: FC<Props> = ({ animatedStyle }) => (
  <Container>
    <FirstRow animatedStyle={animatedStyle} />
    <SecondRow animatedStyle={animatedStyle} />

    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
    <TextRow animatedStyle={animatedStyle} />
  </Container>
)

const Container = styled.View``

const FirstRow = styled(AnimatedBone)`
  width: 100%;
  height: 10px;
  margin-bottom: 16px;
  border-radius: 8px;
`

const SecondRow = styled(AnimatedBone)`
  width: 150px;
  height: 10px;
  border-radius: 8px;
  margin-bottom: 30px;
`

const TextRow = styled(AnimatedBone)`
  width: 100%;
  height: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`
