import {
  useCreateCoaching,
  useGetActiveCoaching
} from '@hooks/coaching/useCoaching'
import { useNavigation } from '@react-navigation/core'
import { getCoachingNotStarted } from '@selectors/coaching-selectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import { PrimaryButton } from 'components/Buttons/PrimaryButton'
import TextButton from 'components/Buttons/TextButton'
import ROUTE from 'config/routes/Routes'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { fonts } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

const CoachingNotStarted: FC = () => {
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const { navigate } = useNavigation()
  const { data: coaching } = useGetActiveCoaching()
  const [mutate, { isLoading }] = useCreateCoaching()

  // if (!hasActiveCoaching) return null

  const openIntroduction = () => {
    navigate(ROUTE.COACHING_INTRODUCTION)
  }

  const startCoaching = () => {
    mutate({
      coaching: {
        userId: `${coaching?.userId}`,
        started: new Date().toISOString()
      }
    })
  }

  if (coaching?.started) {
    return (
      <Container>
        <Title>NOT_STARTED_TITLE</Title>
        <Explainer>NOT_STARTED</Explainer>

        <TextButton onPress={openIntroduction}>COACHING.WATCH_INTRO</TextButton>
        <Spacer />
        <PrimaryButton
          loading={isLoading}
          title="COACHING.START"
          onPress={startCoaching}
        />
      </Container>
    )
  }
  return null
}

export default CoachingNotStarted

const Container = styled.View`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  border-radius: 7px;
  padding: 20px 20px;
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
