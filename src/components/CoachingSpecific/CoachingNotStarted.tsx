import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import TextButton from '@components/Buttons/TextButton'
import { isLoggedIn } from '@helpers/auth'
import {
  useCreateCoaching,
  useGetActiveCoaching
} from '@hooks/coaching/useCoaching'
import { useAppSelector } from '@hooks/redux'
import { useNavigation } from '@react-navigation/core'
import { fonts } from '@styles/themes'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import TranslatedText from '../TranslatedText'

const CoachingNotStarted: FC = () => {
  const hasActiveCoaching = useAppSelector(
    (state) => state.subscription.isActive
  )
  const { navigate } = useNavigation()
  const { data: coaching } = useGetActiveCoaching()
  const { mutate, isLoading } = useCreateCoaching()

  if (!hasActiveCoaching) return null

  const openIntroduction = () => {
    navigate('Introduction')
  }

  const openLogin = () => {
    navigate('Auth', { screen: 'Register' })
  }

  const startCoaching = () => {
    mutate({
      coaching: {
        userId: `${coaching?.userId}`,
        started: new Date().toISOString()
      }
    })
  }

  if (!coaching?.started) {
    return (
      <Container>
        <Title>NOT_STARTED_TITLE</Title>
        <Explainer>NOT_STARTED</Explainer>

        <TextButton onPress={openIntroduction}>COACHING.WATCH_INTRO</TextButton>
        <Spacer />
        {isLoggedIn() ? (
          <PrimaryButton
            loading={isLoading}
            title="COACHING.START"
            onPress={startCoaching}
          />
        ) : (
          <PrimaryButton title="LOGIN" onPress={openLogin} />
        )}
      </Container>
    )
  }

  return null
}

export default CoachingNotStarted

const Container = styled.View`
  margin: 16px;
  padding: 20px 20px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const Title = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 17px;
  text-align: center;
  font-family: ${fonts.bold};
  margin-bottom: 10px;
`

const Explainer = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  text-align: center;
  margin-bottom: 20px;
  font-family: ${fonts.medium};
`

const Spacer = styled.View`
  height: 30px;
`
