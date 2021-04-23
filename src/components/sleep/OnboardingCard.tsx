import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import { useAppSelector } from '@hooks/redux'
import { useNavigation } from '@react-navigation/core'

import React, { FC } from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'

export const OnboardingCard: FC = () => {
  const { navigate } = useNavigation()
  const onboardingCompleted = useAppSelector(
    ({ onboarding }) => onboarding.introductionCompleted
  )

  if (onboardingCompleted) return null

  const startOnboarding = () => {
    navigate('Onboarding')
  }

  return (
    <Container>
      <TextContainer>
        <Title>ONBOARDING.HELLO</Title>
        <Text>ONBOARDING.PROMPT</Text>
      </TextContainer>
      <Pressable onPress={startOnboarding}>
        <CircleButton>
          <Arrow />
        </CircleButton>
      </Pressable>
    </Container>
  )
}
const Container = styled.View`
  margin: 16px 16px;
  padding: 16px 16px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.SHADOW};
  flex-direction: row;
  align-items: center;
`

const TextContainer = styled.View`
  flex: 1;
  margin-right: 8px;
`

const Title = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.accent};
  font-size: 15px;
  margin-bottom: 8px;
`

const Text = styled(TranslatedText)`
  text-align: left;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 15px;
  line-height: 20px;
`

const CircleButton = styled.View`
  background-color: ${({ theme }) => theme.accent};
  border-radius: 50px;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`

const Arrow = styled(IconBold).attrs(() => ({
  name: 'arrowRight',
  fill: 'white',
  height: '20',
  width: '20'
}))``
